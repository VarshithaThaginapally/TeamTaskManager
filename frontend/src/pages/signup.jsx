import { useState } from "react";
import client from "../api/client";

function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {

    try {

      const res = await client.post(
        "/auth/signup",
        {
          name,
          email,
          password
        }
      );

      alert(res.data.message);

    } catch (error) {

      alert("Signup failed");

    }
  };

  return (

    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">

      <div className="bg-white w-[800px] h-[500px] rounded-3xl shadow-2xl flex overflow-hidden">

        <div className="w-1/2 bg-gradient-to-b from-purple-500 to-pink-500 flex items-center justify-center">

          <h1 className="text-white text-5xl font-bold">
            Create Account
          </h1>

        </div>


        <div className="w-1/2 flex flex-col items-center justify-center px-10">

          <h2 className="text-3xl font-bold mb-8">
            Signup
          </h2>

          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 mb-4 rounded-lg bg-gray-100 outline-none"
            onChange={(e) =>
              setName(e.target.value)
            }
          />

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
            onClick={handleSignup}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full font-bold"
          >
            CREATE ACCOUNT
          </button>

        </div>

      </div>

    </div>
  );
}

export default Signup;