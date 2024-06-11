import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const [workouts, setWorkouts] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState(" ");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`http://localhost:8081/api/v1/Meal/getAll`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setWorkouts(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchItems();
  }, []);

  const handleDeleteUser = async (id) => {
    console.log(id);
    try {
      const res = await fetch(
        `http://localhost:8081/api/v1/Meal/deleteM/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setWorkouts((prev) => prev.filter((workout) => workout.id !== id));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleShare = (postId) => {
    const postLink = window.location.origin + `/share/${postId}`;
    navigator.clipboard
      .writeText(postLink)
      .then(() => {
        setNotification("Link copied!");
        navigate(`/share/${postId}`);
      })
      .catch((error) => {
        console.error("Failed to copy: ", error);
        setNotification("Failed to copy link.");
      });
  };

  return (
    <div className="bg-[#f3f4f6]">
      <div className="flex justify-center items-center">
        <h1 className="text-5xl font-serif text-slate-600 text-opacity-70 mt-6">
          Meal Plans
        </h1>
      </div>
      <Link to="/addmeal">
        <button className=" ml-[980px]  w-32 h-10 rounded-xl  whitespace-nowrap font-medium  text-white bg-gradient-to-r from-blue-400 border shadow-sm to-blue-800">
          Add New Meal
        </button>
      </Link>

      <div className="flex justify-center mt-4">
        <div className="flex flex-wrap justify-center gap-8">
          {workouts.map((workout, index) => (
            <div
              key={index}
              className="w-[300px] h-[625px] bg-white mt-10 mb-5 border border-black  shadow-2xl"
            >
              <div className="px-6 py-4">
                <div className="flex justify-center items-center  font-serif ">
                  <h2 className="font-extralight text-xl text-green-800 mb-2 truncate">
                    {workout.title}
                  </h2>
                </div>

                <div>
                  <div className="font-semibold text-gray-700 ">
                    Description
                  </div>
                  <div className="font-extralight text-gray-700 text-base  w-20px break-words">
                    {workout.desc}
                  </div>
                </div>

                <div>
                  <div className="font-semibold text-gray-700 ">
                    Ingredients
                  </div>
                  <div className="font-extralight text-gray-700 text-base  w-20px break-words">
                    {workout.ingredients}
                  </div>
                </div>

                <div>
                  <div className="font-semibold text-gray-700 ">Nutrition</div>
                  <div className="font-extralight text-gray-700 text-base  w-20px break-words">
                    {workout.nutrition}
                  </div>

                  <div>
                    <div className="font-semibold text-gray-700 ">
                      Dietary Preference
                    </div>
                    <div className="font-extralight text-gray-700 text-base  w-20px break-words">
                      {workout.dietaryPreference}
                    </div>
                  </div>

                  <div className="flex justify-center items-center  mt-2">
                    <img
                      src={workout.image}
                      className=" h-44 rounded-xl"
                      alt=""
                    />
                  </div>
                </div>

                <ul>
                  <div className="flex justify-center mt-14 gap-8">
                    <Link to={`/mealplan/${workout._id}`}>
                      <img
                        className="w-5 h-5 "
                        src="https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png"
                      />
                    </Link>

                    <button
                      className="mt-[-3px]"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this meal plan?"
                          )
                        ) {
                          handleDeleteUser(workout._id);
                        }
                      }}
                    >
                      <img
                        className="w-5 h-5"
                        src="https://cdn.icon-icons.com/icons2/1157/PNG/512/1487086345-cross_81577.png"
                      />
                    </button>

                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSRxA34bc9afVlpRRAEXhaHkX-KBdT9gn3CUaqJDXftA&s"
                      onClick={() => handleShare(workout._id)}
                      alt=""
                      className="w-5 h-5 cursor-pointer object-cover mt-[-1px] rounded-full"
                    />
                  </div>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      {notification && (
        <div className="fixed bottom-4 right-4 z-50 bg-gray-200 border border-gray-300 rounded-md p-4 shadow-md">
          <p className="text-sm">{notification}</p>
        </div>
      )}
    </div>
  );
}
