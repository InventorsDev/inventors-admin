import Layout from "@/layouts/main";
import dynamic from "next/dynamic";
import { LuUploadCloud } from "react-icons/lu";
import "react-quill/dist/quill.snow.css";
import { useRef, useState } from "react";
import { MdOutlineDone } from "react-icons/md";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    coverPhoto: null,
  });
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(false);

  const fileInputRef = useRef(null); // Create a ref for the file input

  const handlePublish = (event) => {
    event.preventDefault();
    console.log(formData); // This should now display the form data in the console

    if (!formData.title.trim() || !formData.content.trim()) {
      setTimeout(() => setError(null), 3000);
      return setError("all fields are required");
    } else {
      setSuccessMsg("successfully submitted");
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({ ...formData, coverPhoto: file });
    }
  };

  return (
    <Layout title="Blog">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="md:font-bold font-semibold md:text-3xl text-2xl text-gray-600">
            Create Blog
          </h1>
          <span className="flex items-center gap-8">
            <h1 className="font-semibold text-gray-600">Preview</h1>
            <button
              onClick={handlePublish}
              className="flex items-center gap-2 bg-primaryGreen py-3 px-6 rounded-md text-white"
            >
              <LuUploadCloud />
              Publish
            </button>
          </span>
        </div>
        <form onSubmit={handlePublish}>
          <div className="mt-6">
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef} // Attach the ref to the file input
              style={{ display: "none" }} // Hide the file input
              onChange={handleFileChange} // Handle file selection
            />

            {/* Button to trigger file input click */}
            <button
              type="button"
              onClick={() => fileInputRef.current.click()} // Trigger the file input click
              className="text-center mb-3 rounded-md bg-[#eceaeab9] text-primaryGreen p-3 font-semibold w-full"
            >
              Add cover photo
            </button>

            <input
              type="text"
              placeholder="Enter title"
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="border p-2 mb-2 w-full rounded-md focus:outline-none"
            />

            <ReactQuill
              theme="snow"
              value={formData.content}
              onChange={(value) => {
                setFormData({ ...formData, content: value });
              }}
              id="content"
              placeholder="Write here..."
              className="react-quill-container h-72 mb-2 rounded-md"
            />
          </div>
        </form>
        {error && (
          <p className="text-red-600 bg-red-100 absolute top-52 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md p-3 capitalize">
            {error}
          </p>
        )}
        {successMsg && (
          <div className=" absolute top-52 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            <p className="flex items-center gap-4 rounded-md p-3 capitalize text-white bg-green-600">
              <span>
                <MdOutlineDone className="bg-white rounded-full p-1 text-3xl text-green-600" />
              </span>
              <span> {successMsg}</span>
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CreateBlog;
