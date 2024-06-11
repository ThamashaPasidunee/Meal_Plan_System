import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { BiArrowBack, BiShareAlt } from "react-icons/bi";

export default function MealUpdate() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  console.log(formData);
  const { ShareId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchworkout = async () => {
        const res = await fetch(
          `http://localhost:8081/api/v1/Meal/getAll?itemId=${ShareId}`
        );
        const data = await res.json();
        console.log("data", data);

        if (!res.ok) {
          console.log(data.message);
        }
        if (res.ok) {
          const selected = data.find((workout) => workout._id === ShareId);
          console.log(selected);
          if (selected) {
            setFormData(selected);
          }
        }
      };
      fetchworkout();
    } catch (error) {
      console.log(error.message);
    }
  }, [ShareId]);

  const handleBack = () => {
    // Go back to the previous page
    navigate(-1);
  };

  const handleShare = () => {
    // Copy page URL to clipboard
    const pageURL = window.location.href;
    navigator.clipboard.writeText(pageURL)
      .then(() => {
        // Show success message
        alert("Link copied!");
      })
      .catch((error) => {
        // Show error message if copying failed
        console.error("Failed to copy link:", error);
      });
  };
  

  return (
    <div className="mb-52 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-center text-3xl mb-7 font-medium">Meal Plan</h1>

        <div className="flex justify-center items-center mb-8">
          <h1 className="text-gray-700 font-medium text-lg">
            {formData.title}
          </h1>
        </div>
        {/* Display Image */}
        <div className="flex justify-center mb-8">
          <img
            src={formData.image}
            alt=""
            className="w-[400px] h-72 rounded-xl"
          />
        </div>
        {/* Display Description */}
        <div className="flex justify-center mb-4">
          <h1 className="text-gray-700 font-medium text-lg">Description</h1>
        </div>
        <div className="mt-4 flex justify-center mb-8">
          <p className="text-gray-600 font-light max-w-xl text-center">
            {formData.desc}
          </p>
        </div>
        {/* Display Ingredients */}
        <div className="flex justify-center mb-4">
          <h1 className="text-gray-700 font-medium text-lg">Ingredients</h1>
        </div>
        <div className="mt-4 flex justify-center mb-8">
          <p className="text-gray-600 font-light max-w-xl text-center">
            {formData.ingredients}
          </p>
        </div>
        {/* Display Nutrition */}
        <div className="flex justify-center mb-4">
          <h1 className="text-gray-700 font-medium text-lg">Nutrition</h1>
        </div>
        <div className="mt-4 flex justify-center mb-8">
          <p className="text-gray-600 font-light max-w-xl text-center">
            {formData.nutrition}
          </p>
        </div>
        {/* Display Dietary Preference */}
        <div className="flex justify-center mb-4">
          <h1 className="text-gray-700 font-medium text-lg">
            Dietary Preference
          </h1>
        </div>
        <div className="mt-4 flex justify-center mb-8">
          <p className="text-gray-600 font-light max-w-xl text-center">
            {formData.dietaryPreference}
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 w-full flex justify-center py-4 bg-white shadow-md">
        <div className="flex space-x-4">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            <BiArrowBack className="mr-2" />
            Back
          </button>
          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center justify-center bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none"
          >
            <BiShareAlt className="mr-2" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
