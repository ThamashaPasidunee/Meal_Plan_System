import React from "react";
import { Link, useAsyncError } from "react-router-dom";
import { useSelector } from "react-redux";

export default function () {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="bg-white">
      <div className=" flex justify-between items-center max-w-6xl mx-auto p-5">
        <Link to="/">
          <h1 className="font-serif text-blue-400 text-3xl rounded-lg  ">
            Gym Net
          </h1>
        </Link>
        <ul className="flex gap-4">
          <Link to={""}>
            <div className="flex gap-3 ml-4  ">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdvbWFuJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
                alt=""
                className="w-10 h-10 object-cover mt-2 rounded-full"
              />

              <div>
                <h1 className="text-gray-700 font-medium mt-2">Smith123</h1>
                <h1 className="text-slate-600 font-medium text-sm">
                  Smith@gmail.com
                </h1>
              </div>
            </div>
          </Link>
        </ul>
      </div>
    </div>
  );
}
