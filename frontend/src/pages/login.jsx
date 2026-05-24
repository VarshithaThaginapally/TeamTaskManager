import { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import client from "../api/client";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");


  const handleLogin = async () => {

    try {

      const res = await client.post(
        "/auth/login",
        {
          email,
          password
        }
      );

      alert(res.data.message);

      // GO TO DASHBOARD
      navigate("/dashboard");

    } catch (error) {

      alert("Login failed");

    }
  };


  return (

    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-pink-400 to-purple-500">

      <div className="bg-white w-[800px] h-[450px] rounded-3xl shadow-2xl flex overflow-hidden">


        {/* LEFT */}

        <div className="w-1/2 bg-gradient-to-b from-pink-500 to-purple-500 flex items-center justify-center">

          <h1 className="text-white text-5xl font-bold">
            Task Manager
          </h1>

        </div>


        {/* RIGHT */}

        <div className="w-1/2 flex flex-col items-center justify-center px-10">

          <h2 className="text-3xl font-bold mb-8">
            User Login
          </h2>


          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 rounded-lg bg-gray-100 outline-none"
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />


          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-6 rounded-lg bg-gray-100 outline-none"
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />


          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white p-3 rounded-full font-bold hover:scale-105 duration-300"
          >
            LOGIN
          </button>


          <Link
            to="/signup"
            className="mt-6 text-purple-600 font-semibold hover:underline"
          >
            Create Your Account →
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;