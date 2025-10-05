import React, { useRef, useState } from 'react';

interface ImageUploaderProps {
  avatarUrl: string;
  onUpload: (newUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ avatarUrl, onUpload }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Basic validation
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert("File is too large. Maximum size is 5MB.");
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        alert("Invalid file type. Please upload a JPG, PNG, or WEBP image.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        // In a real app, you would now show a cropping UI.
        // For this demo, we'll use the preview directly.
        setPreviewUrl(result);
        // In a real implementation, you'd upload the cropped file and get a new URL.
        // Here we just simulate it by setting the base64 data URL.
        onUpload(result);
        setPreviewUrl(null); // Clear preview after "upload"
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = async () => {
      alert("Camera capture would be implemented here, allowing users on mobile devices to take a new photo.");
  }


  return (
    <div className="w-32 h-32 relative">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
      />
      <img src={previewUrl || avatarUrl} alt="User avatar" className="w-full h-full object-cover rounded-full" />
      <div className="absolute bottom-0 right-0 grid grid-cols-2 gap-1">
        <button 
            onClick={() => fileInputRef.current?.click()} 
            title="Upload from device"
            className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center text-slate-600 hover:bg-slate-100 transition"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
        </button>
         <button 
            onClick={handleCameraCapture} 
            title="Capture from camera"
            className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center text-slate-600 hover:bg-slate-100 transition"
        >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;
