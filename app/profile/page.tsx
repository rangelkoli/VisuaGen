"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { getUserImages } from "@/lib/supabase";
import { Download } from "lucide-react";
import { downloadImage } from "@/utils/downloadImage";

interface GeneratedImage {
  id: string;
  image_data: string;
  prompt: string;
  created_at: string;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    async function loadUserImages() {
      if (!user?.id) return;
      try {
        const userImages = await getUserImages(user.id);
        setImages(userImages);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load images");
      } finally {
        setLoading(false);
      }
    }

    loadUserImages();
  }, [user?.id]);

  const handleDownload = async (image: GeneratedImage) => {
    if (downloadingId) return;
    setDownloadingId(image.id);
    try {
      await downloadImage(image.image_data, image.prompt);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to download image");
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <ProtectedRoute>
      <div className='min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-900'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='max-w-7xl mx-auto'
        >
          <h1 className='text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white'>
            Your Generated Images
          </h1>

          {loading && (
            <div className='flex justify-center items-center h-64'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500'></div>
            </div>
          )}

          {error && (
            <div className='p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg'>
              {error}
            </div>
          )}

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
            {images.map((image) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg group'
              >
                <div className='aspect-square relative'>
                  <img
                    src={image.image_data}
                    alt={image.prompt}
                    className='object-cover w-full h-full'
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDownload(image)}
                    disabled={!!downloadingId}
                    className='absolute bottom-4 right-4 p-3 bg-blue-600 hover:bg-blue-700 
                             text-white rounded-full shadow-lg opacity-0 group-hover:opacity-90
                             transition-all duration-200 disabled:bg-gray-400'
                  >
                    <Download
                      className={`w-5 h-5 ${
                        downloadingId === image.id ? "animate-bounce" : ""
                      }`}
                    />
                  </motion.button>
                </div>
                <div className='p-4'>
                  <p className='text-gray-600 dark:text-gray-300 text-sm line-clamp-2'>
                    {image.prompt}
                  </p>
                  <p className='text-gray-400 dark:text-gray-500 text-xs mt-2'>
                    {new Date(image.created_at).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {!loading && images.length === 0 && (
            <div className='text-center py-12'>
              <p className='text-gray-600 dark:text-gray-400'>
                You haven't generated any images yet.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </ProtectedRoute>
  );
}
