/**
 * Downloads an image from a URL
 * @param imageUrl URL of the image to download
 * @param filename Name to save the file as (without extension)
 */
export async function downloadImage(imageUrl: string, filename: string): Promise<void> {
  try {
    // For images on the same domain or with proper CORS headers
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    
    // Determine file extension (default to jpg if cannot be determined)
    let extension = 'jpg';
    if (blob.type) {
      const match = blob.type.match(/^image\/(.+)$/);
      if (match && match[1]) {
        extension = match[1].replace('jpeg', 'jpg');
      }
    }

    // Create a temporary anchor element to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = `${safeFilename(filename)}.${extension}`;
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading image:', error);
    throw new Error('Failed to download image');
  }
}

/**
 * Safely encodes a string for use in filenames
 * @param str String to encode
 * @returns Encoded string safe for filenames
 */
export function safeFilename(str: string): string {
  return str
    .replace(/[^a-z0-9]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}
