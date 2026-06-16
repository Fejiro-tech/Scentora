import React from "react";

const AnnouncementBar = ({ items }) => {
  return (
    <>
      <div className="w-full overflow-hidden border-y border-[rgba(184,134,11,0.25)] bg-[rgba(200,160,100,0.65)] backdrop-blur-xl py-2">

        <div className="animate-marquee whitespace-nowrap">
          
          {[...items, ...items, ...items, ...items].map((item, index) => (
            <span key={index} className="inline-flex items-center mx-12">
              
              <span className="text-[12px] font-bold uppercase tracking-[3px] text-[#F7F3EE]">
                {item}
              </span>

              <span className="ml-12 text-[rgba(247,243,238,0.6)]">
                &bull;
              </span>

            </span>
          ))}

        </div>
      </div>
    </>
  );
};

export default AnnouncementBar;