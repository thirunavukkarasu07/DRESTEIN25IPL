import React from "react";

export default function HeroSection() {
  return (
    <section 
      className="flex items-center justify-center bg-blue-700 bg-cover bg-center h-[85vh] text-center text-white px-4"
    >
      <div>
        <h1 className="text-6xl font-bold font-montserrat text-iplGold drop-shadow-lg">
          Hammer Time: IPL Edition
        </h1>
        <p className="mt-4 text-lg">Live Auction Experience Powered by IPL Magic</p>
        <button className="mt-8 bg-iplGold text-iplDarkBlue font-semibold py-3 px-10 rounded-full hover:brightness-90 transition">
          Spin The Wheel
        </button>
      </div>
    </section>
  );
}
