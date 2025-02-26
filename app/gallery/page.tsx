"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { downloadImage } from "@/utils/downloadImage";

interface ImageItem {
  id: string;
  imageData: string;
  prompt?: string;
  createdAt: string;
  user?: {
    id: string;
    name: string;
  };
}

interface PaginationInfo {
  limit: number;
  offset: number;
  total: number;
}

export default function GalleryPage() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    limit: 20,
    offset: 0,
    total: 0,
  });
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const fetchImages = async (offset = 0) => {
    try {
      const isInitialLoad = offset === 0;
      if (isInitialLoad) setLoading(true);
      else setLoadingMore(true);

      const response = await fetch(
        `/api/gallery?limit=${pagination.limit}&offset=${offset}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const data = await response.json();

      if (isInitialLoad) {
        setImages(data.images);
      } else {
        setImages((prev) => [...prev, ...data.images]);
      }

      setPagination(data.pagination);
    } catch (err) {
      console.error("Error fetching images:", err);
      setError("Failed to load images. Please try again later.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleDownload = async (image: ImageItem, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      await downloadImage(image.imageData, `${"image"}-${image.id}`);
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };

  const loadMoreImages = () => {
    if (images.length < pagination.total) {
      fetchImages(pagination.offset + pagination.limit);
    }
  };

  if (loading) {
    return (
      <div className='container mx-auto py-12 flex justify-center items-center min-h-[60vh]'>
        <div className='space-y-4 w-full max-w-6xl'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className='space-y-2'>
                <Skeleton className='h-[250px] w-full rounded-lg' />
                <Skeleton className='h-4 w-3/4' />
                <Skeleton className='h-3 w-1/2' />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='container mx-auto py-12 px-4 text-center'>
        <h1 className='text-3xl font-bold text-center mb-4'>Gallery</h1>
        <div className='p-8 bg-muted rounded-lg'>
          <p className='text-destructive mb-4'>{error}</p>
          <Button onClick={() => fetchImages()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto py-12 px-4'>
      <h1 className='text-3xl font-bold text-center mb-8'>Image Gallery</h1>

      {images.length === 0 ? (
        <div className='text-center p-12 border border-dashed rounded-lg'>
          <p className='text-muted-foreground mb-4'>
            No images found. Generate some images to populate your gallery!
          </p>
          <Button asChild>
            <Link href='/generate'>Create New Image</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {images.map((image) => (
              <Card key={image.id} className='overflow-hidden group relative'>
                <Link href={`/gallery/${image.id}`} className='block'>
                  <div className='relative h-[250px] w-full transition-transform duration-300 group-hover:scale-105'>
                    <Image
                      src={image.imageData}
                      alt={image.prompt || "Generated image"}
                      fill
                      className='object-cover'
                      sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
                    />
                  </div>
                  <div className='absolute bottom-0 w-full bg-black/60 p-3 text-white'>
                    <p className='font-medium line-clamp-1'>
                      {image.prompt || "Untitled"}
                    </p>
                    <div className='flex justify-between items-center'>
                      <p className='text-xs opacity-90'>
                        {new Date(image.createdAt).toLocaleDateString()}
                      </p>
                      {image.user && (
                        <p className='text-xs opacity-90'>
                          by {image.user.name}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>

                <Button
                  variant='secondary'
                  size='icon'
                  className='absolute top-2 right-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 z-10 opacity-0 group-hover:opacity-100 transition-opacity'
                  onClick={(e) => handleDownload(image, e)}
                  title='Download image'
                >
                  <Download className='h-4 w-4 text-white' />
                </Button>
              </Card>
            ))}
          </div>

          {images.length < pagination.total && (
            <div className='flex justify-center mt-12'>
              <Button
                onClick={loadMoreImages}
                disabled={loadingMore}
                className='min-w-[120px]'
              >
                {loadingMore ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Loading
                  </>
                ) : (
                  "Load More"
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
