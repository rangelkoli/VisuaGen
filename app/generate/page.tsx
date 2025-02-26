"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { saveGeneratedImage } from "@/lib/supabase";
import { Download } from "lucide-react";
import { downloadImage } from "@/utils/downloadImage";
import { removeBackground } from "@imgly/background-removal";
import Image from "next/image";

export default function GeneratePage() {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState("An illustration of ");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [processing, setProcessing] = useState(false);

  const processImage = async (imageUrl: string): Promise<string> => {
    setProcessing(true);
    try {
      // Convert base64 to blob
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // Remove background
      const processedBlob = await removeBackground(blob);

      if (!processedBlob) throw new Error("Failed to remove background");
      setImage(URL.createObjectURL(processedBlob));
      setProcessing(false);
      // Return processed image as base64
      const processedImageUrl = URL.createObjectURL(processedBlob);
      const processedResponse = await fetch(processedImageUrl);
      const processedBlobData = await processedResponse.blob();
      const reader = new FileReader();
      reader.readAsDataURL(processedBlobData);
      return new Promise((resolve, reject) => {
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.onerror = (error) => {
          reject(error);
        };
      });
    } catch (error) {
      console.error("Error processing image:", error);
      setError("Failed to process image");
      throw error;
    } finally {
      setProcessing(false);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          userId: user?.id,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      // Process the image to remove background
      const processedImageUrl = await processImage(data.imageUrl);
      setImage(processedImageUrl);

      // Save the processed image to Supabase
      await saveGeneratedImage(user!.id, processedImageUrl, prompt);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate image");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!image || downloading) return;
    setDownloading(true);
    try {
      await downloadImage(image, prompt);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to download image");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className='min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-900'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='max-w-4xl mx-auto'
        >
          <h1 className='text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white'>
            AI Image Generator
          </h1>
          <p className='text-gray-600 dark:text-gray-300 mb-8'>
            Transform your ideas into stunning visuals using our AI-powered
            image generator.
          </p>

          <form onSubmit={handleGenerate} className='space-y-6'>
            <div>
              <motion.textarea
                whileFocus={{ scale: 1.01 }}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder='Describe the image you want to generate...'
                className='w-full p-4 rounded-lg border border-gray-200 dark:border-gray-700 
                       bg-white dark:bg-gray-800 text-gray-800 dark:text-white
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-200 min-h-[120px]'
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className='w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700
                     text-white rounded-lg font-medium disabled:bg-gray-400
                     disabled:cursor-not-allowed transition-colors duration-200'
              type='submit'
            >
              {loading ? (
                <span className='flex items-center justify-center'>
                  <svg
                    className='animate-spin h-5 w-5 mr-3'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                      fill='none'
                    />
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    />
                  </svg>
                  Generating...
                </span>
              ) : (
                "Generate Image"
              )}
            </motion.button>
          </form>

          {loading && (
            <div className='text-center mt-4'>
              <p className='text-gray-600 dark:text-gray-300'>
                {processing ? "Removing background..." : "Generating image..."}
              </p>
            </div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='mt-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg'
            >
              {error}
            </motion.div>
          )}

          {image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='mt-8'
            >
              <div className='rounded-lg overflow-hidden shadow-xl relative group'>
                <Image
                  src={image}
                  alt='Generated'
                  width={1024}
                  height={1024}
                  className='w-full'
                  unoptimized // Since we're dealing with dynamically generated images
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  disabled={downloading}
                  className='absolute bottom-4 right-4 p-3 bg-blue-600 hover:bg-blue-700 
                       text-white rounded-full shadow-lg opacity-90 group-hover:opacity-100
                       transition-all duration-200 disabled:bg-gray-400'
                >
                  <Download
                    className={`w-5 h-5 ${downloading ? "animate-bounce" : ""}`}
                  />
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </ProtectedRoute>
  );
}
