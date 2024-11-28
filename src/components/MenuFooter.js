import React from "react";
import { FaHome, FaMapMarkedAlt, FaChartBar } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { NavLink } from "react-router-dom";

const MenuFooter = () => {
  return (
    <>
      {/* Menu Footer Fisso */}
      <div className="fixed bottom-0 left-0 w-full bg-green-500 shadow-lg border-t border-gray-300 z-50">
        <div className="flex justify-around items-center py-3">
          {/* Home */}
          <NavLink
            to="/statistiche"
            className={({ isActive }) =>
              `flex flex-col items-center text-sm ${
                isActive ? "text-white" : "text-white-500"
              }`
            }
          >
            <FaHome className="text-2xl" />
            <span>Home</span>
          </NavLink>

          {/* Mappe */}
          <NavLink
            to="/mappe"
            className={({ isActive }) =>
              `flex flex-col items-center text-sm ${
                isActive ? "text-white" : "text-white-500"
              }`
            }
          >
            <FaMapMarkedAlt className="text-2xl" />
            <span>Mappe</span>
          </NavLink>
          
           {/* Progressi */}
           <NavLink
            to="/progressi"
            className={({ isActive }) =>
              `flex flex-col items-center text-sm ${
                isActive ? "text-white" : "text-white-500"
              }`
            }
          >
            <GiProgression className="text-2xl" />
            <span>Progressi</span>
          </NavLink>
        </div>
      </div>

      {/* Spazio per il Footer */}
      <div className="h-16"></div>
    </>
  );
};

export default MenuFooter;
