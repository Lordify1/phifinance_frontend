import { OffCanvasContext } from "@/context/OffCanvasContext";
import React, { useContext } from "react";
import { IoClose } from "react-icons/io5";

export default function Offcanvas({
  isOpen,
  onClose,
  title,
  children,
  width = "w-full md:w-[400px]",
}) {
  const {showOffCanvas, setShowOffCanvas} = useContext(OffCanvasContext) 
  return (
    <div
      className={`fixed inset-0 z-[9999] transition-all duration-300 ${
        isOpen || showOffCanvas ? "visible" : "invisible"
      }`}
    >
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 transition-opacity ${
          isOpen || showOffCanvas ? "opacity-50" : "opacity-0"
        }`}
        onClick={() => {
          if(onClose) onClose();
          setShowOffCanvas(false)
        }}
      ></div>

      {/* Slide in panel */}
      <div
        className={`fixed right-0 top-0 h-full bg-[#0f0f0f] shadow-xl transition-transform duration-300 ${
          isOpen || showOffCanvas ? "translate-x-0" : "translate-x-full"
        } ${width} overflow-y-auto p-6`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button
            onClick={() => setShowOffCanvas(false)}
            className="text-white hover:text-red-500 transition"
          >
            <IoClose size={24} />
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}
