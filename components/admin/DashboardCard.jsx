import React, { useEffect } from "react";



const DashboardCard = ({ label, value, }) => {

  return (
    <div
      className="rounded-2xl px-2 py-6 md:py-10 md:px-4 text-center bg-[#111111]/90 text-white shadow-md font-['Cormorant_Garamond'] border border-gray-100 hover:translate-y-1 transition duration-300 border-b-2 border-b-[#111111]"
    >
      <p className="text-xs md:text-sm text-gray-200 font-bold relative z-10 tracking-[2px] uppercase">{label}</p>
        <p className="text-xl md:text-3xl font-bold mt-3">{value}</p>
    </div>
  );
};

export default DashboardCard;
