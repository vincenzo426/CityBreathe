import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import sfondoLogin from "../icons/green-city.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      console.log("Logged in:", username);
      navigate("/statistiche"); // Reindirizza al componente Statistiche
    } else {
      alert("Inserisci username e password!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-login-gradient animate-gradient">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-11/12 max-w-sm">
        {/* Header con logo e titolo */}
        <div className="bg-black text-white py-6 px-4">
          <div className="flex flex-col items-center">
            <img
              src={sfondoLogin} // Sostituisci con il percorso del logo
              alt="CityBreathe Logo"
              className="w-28 mb-2"
            />
            <hr className="border-t border-black w-full mb-2" />
            <h1 className="text-4xl font-bold text-center">
              City<span className="text-green-500">Breathe</span>
            </h1>
          </div>
          <hr className="border-t border-black w-full mb-2" />
          <h3 className="text-sm text-center">
              Breathe <span className="text-green-500">Clean</span>  Run <span className="text-green-500">Better</span>
            </h3>
        </div>

        {/* Form di login */}
        <div className="p-6">
          <p className="text-gray-500 text-center text-sm mb-6">
            Sign in to continue.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:outline-none text-sm"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:outline-none text-sm"
            />
            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition text-sm"
            >
              Log in
            </button>
          </form>
          <div className="mt-6 text-sm text-gray-500 text-center">
            <a href="#" className="hover:underline mr-4">
              Forgot Password?
            </a>
            <a href="#" className="hover:underline">
              Signup!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
