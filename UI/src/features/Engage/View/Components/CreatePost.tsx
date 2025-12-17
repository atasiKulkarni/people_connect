import { CiEdit } from "react-icons/ci";
import { createPostData } from "../Components/EnageData";
import { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { UploadPictureDiv } from "./UploadPictureDiv";

const CreatePost = () => {
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState<string>(""); // State for the description box
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCloseModal = () => {
    setShow(false);
    // setSelectedEmployee(null); // Reset selected employee on close
    // setSearchTerm("");
    // setAppreciationMessage("");
  };

  return (
    <div>
      <div className="px-3 pt-5">
        <div className="w-full rounded-lg content-center items-center bg-white [box-shadow:0_0_12px_0px_rgba(0,0,0,0.1)] p-5">
          <div className="col-span-3 text-black flex items-center bg-white/10 w-full rounded-full p-2 h-9 content-center border border-gray-400">
            <CiEdit className="w-7 h-7 " color="gray" />
            <input
              type="text"
              onClick={() => setShow(true)}
              placeholder="Create a post!"
              className="w-full ml-3 placeholder-gray-500 focus:outline-none text-sm text-gray-400 font-medium font-[Rubik] cursor-pointer"
            />
          </div>
          <div className="flex mt-5">
            {createPostData?.map((post, index, array) => (
              <div
                key={index}
                className={`flex  items-center w-full px-3 ${
                  index !== array.length - 1 ? "border-r border-gray-300" : ""
                }`}
              >
                {" "}
                {typeof post.icon === "string" ? (
                  <img
                    src={post.icon}
                    alt={post.name}
                    className="w-6 h-6 object-contain"
                  />
                ) : (
                  <div>{post.icon}</div>
                )}
                <p className="text-black font-[Rubik] font-medium text-xs items-center ml-2">
                  {post.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {show && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-end z-50 h-full">
          <div className="bg-white p-6 shadow-lg relative max-w-lg w-full h-full overflow-y-auto">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 cursor-pointer"
            >
              <IoMdClose className="w-5 h-5 object-contain" />
            </button>
            <div className="border-b border-gray-300 pb-4">
              <p className="text-[#005DAC] font-[Rubik] text-lg font-medium">
                New Post !
              </p>
            </div>

            <div className="w-full mt-4">
              <p className="text-gray-500 font-[Rubik] text-xs font-normal">
                Share a picture and brighten everyone's day
              </p>
              <UploadPictureDiv />
            </div>

            <div className="w-full mt-5">
              <p className="text-gray-500 font-[Rubik] text-xs font-normal">
                Share your thoughts
              </p>

              <div className="mt-2">
                <textarea
                  id="description"
                  rows={4} // Sets the initial visible height of the textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add a description for your post..."
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none resize-none text-gray-700 font-[Rubik] text-xs font-normal" // resize-none prevents manual resizing by user
                />
              </div>

              <div className="flex flex-col md:flex-row md:space-x-4">
                <button
                  className="mt-4 w-full bg-white  text-blue-500 font-medium py-1 px-4 rounded-sm border border-blue-500 cursor-pointer"
                  onClick={() => setShow(false)}
                >
                  Discard
                </button>
                <button
                  className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-4 rounded-sm disabled:bg-gray-400 cursor-pointer"
                  disabled={!description.trim()}
                  onClick={() => {
                    console.log("Submitting:", {
                    //   image: imageSrc ? "present" : "none",
                      description,
                    });
                    alert("Post submitted!");
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
