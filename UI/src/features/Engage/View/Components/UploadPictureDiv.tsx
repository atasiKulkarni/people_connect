import { useRef } from "react";
import { HiOutlinePhoto } from "react-icons/hi2";

interface UploadProps {
  imageSrc: Blob | MediaSource | null ;
  setImageSrc: (val: Blob | MediaSource | null) => void;
}

export const UploadPictureDiv = ({ imageSrc, setImageSrc }: UploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const previewUrl = imageSrc ? URL.createObjectURL(imageSrc) : null;


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      setImageSrc(file); 
    } else {
      setImageSrc(null);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-lg mx-auto mt-3">
      <div
        className="border-1 border-dashed border-blue-600 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition duration-300 h-100"
        onClick={handleClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden" 
          accept="image/*"
          onChange={handleImageChange}
        />

        {previewUrl ? (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Uploaded preview"
              className="max-h-64 rounded-lg object-contain"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setImageSrc(null);
              }}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs shadow-md"
            >
              ✕
            </button>
          </div>
        ) : (
          <>
            <HiOutlinePhoto className="w-12 h-12 text-gray-500 mb-2" />
            <p className="text-blue-500 font-[Rubik] text-sm font-medium">
              Upload a file
            </p>
            <p className="text-gray-500 font-[Rubik] text-xs font-normal">
              Supported file type: JPG, PNG, GIF, jpeg
            </p>
          </>
        )}
      </div>
    </div>
  );
};
