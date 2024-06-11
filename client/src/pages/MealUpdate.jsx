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

export default function MealUpdate() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  console.log(formData);
  const { mealId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchworkout = async () => {
        const res = await fetch(
          `http://localhost:8081/api/v1/Meal/getAll?itemId=${mealId}`
        );
        const data = await res.json();
        console.log("data", data);

        if (!res.ok) {
          console.log(data.message);
        }
        if (res.ok) {
          const selected = data.find((workout) => workout._id === mealId);

          if (selected) {
            setFormData(selected);
          }
        }
      };
      fetchworkout();
    } catch (error) {
      console.log(error.message);
    }
  }, [mealId]);

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL }); // Note the array brackets
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:8081/api/v1/Meal/editMeal/${formData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        alert("succesfull");
        navigate("/meallist");
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="">
      <h1 className="text-center text-3xl my-7 ml-10 font-medium">
        Update Meal Plan
      </h1>
      <div className="flex justify-center items-center">
        <form
          className="flex flex-col gap-4 w-[600px]  rounded-lg border  shadow-xl  bg-gray-50  mb-10 mt-5"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4 ">
            <div className="flex gap-4 items-center justify-between border-none p-3">
              <label
                htmlFor="uploadInput"
                className="bg-white w-96 h-20 cursor-pointer"
              >
                <div className="mt-5">
                  <span className="text-2xl  ml-36 text-gray-700 font-medium text-opacity-50 ">
                    {" "}
                    Image
                  </span>
                </div>

                <input
                  id="uploadInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
              <button
                type="button"
                className="w-28 h-8 font-medium text-sm hover:opacity-80 rounded-lg bg-gradient-to-r from-blue-200 border shadow-sm to-blue-800  text-white"
                size="sm"
                onClick={handleUpdloadImage}
                disabled={imageUploadProgress}
              >
                {imageUploadProgress ? (
                  <div className="w-16 h-16">
                    <CircularProgressbar
                      value={imageUploadProgress}
                      text={`${imageUploadProgress || 0}%`}
                    />
                  </div>
                ) : (
                  "Upload Image"
                )}
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <input
              className=" bg-white border-none  h-10 rounded-md w-[450px] text-slate-800"
              type="text"
              placeholder=" Title"
              id="title"
              required
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              value={formData.title}
            />
          </div>

          {imageUploadError && (
            <p className="mt-5 text-red-600   h-7 rounded-lg text-center ">
              {imageUploadError}
            </p>
          )}
          {formData.image && (
            <img
              src={formData.image}
              alt="upload"
              className="w-full h-72 object-cover"
            />
          )}

          <div className="flex gap-4">
            <textarea
              type="text"
              placeholder="Description"
              required
              id="desc"
              maxLength={100}
              className="bg-white border-none rounded-md w-[450px] ml-[80px] text-slate-800 h-20"
              onChange={(e) =>
                setFormData({ ...formData, desc: e.target.value })
              }
              value={formData.desc}
            />
          </div>
          <div className="flex gap-4">
            <textarea
              type="text"
              placeholder="Ingredients"
              required
              id="ingredients"
              maxLength={100}
              className="bg-white border-none rounded-md w-[450px] ml-[80px] text-slate-800 h-20"
              onChange={(e) =>
                setFormData({ ...formData, ingredients: e.target.value })
              }
              value={formData.ingredients}
            />
          </div>
          <div className="flex gap-4">
            <textarea
              type="text"
              placeholder="Nutrition"
              required
              id="nutrition"
              value={formData.nutrition}
              maxLength={100}
              className="bg-white border-none rounded-md w-[450px] ml-[80px] text-slate-800 h-20"
              onChange={(e) =>
                setFormData({ ...formData, nutrition: e.target.value })
              }
            />
          </div>
          <div className="flex gap-4">
            <select
              id="dietaryPreference"
              className="border rounded-md w-[450px] ml-[80px] text-slate-800 h-10"
              onChange={(e) =>
                setFormData({ ...formData, dietaryPreference: e.target.value })
              }
              value={formData.dietaryPreference}
            >
              <option value="">Select Dietary Preference</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Keto">Keto</option>
              <option value="Balanced">Balanced</option>
              <option value="Pescatarian">Pescatarian</option>
            </select>
          </div>
          <div className="flex justify-center items-center mb-11">
            <button
              type="submit"
              className=" w-[200px] font-medium text-white  h-10 bg-gradient-to-r from-blue-200 border shadow-sm to-blue-800  hover:opacity-80 hover:text-white rounded-lg"
            >
              Update meal plan
            </button>
          </div>
          {publishError && (
            <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center ">
              {publishError}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
