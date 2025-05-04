
import React from "react";

export function FloatingShapes() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Animated circles */}
      <div className="absolute top-10 left-[10%] h-40 w-40 rounded-full bg-teal/10 backdrop-blur-xl animate-float"></div>
      <div className="absolute top-40 right-[10%] h-60 w-60 rounded-full bg-sand/20 backdrop-blur-xl animate-float" style={{ animationDelay: "-2s" }}></div>
      <div className="absolute bottom-20 left-[30%] h-32 w-32 rounded-full bg-teal/5 backdrop-blur-xl animate-float" style={{ animationDelay: "-1s" }}></div>
      <div className="absolute top-[30%] left-[60%] h-24 w-24 rounded-full bg-sand/15 backdrop-blur-xl animate-float" style={{ animationDelay: "-3s" }}></div>
      <div className="absolute bottom-40 right-[20%] h-52 w-52 rounded-full bg-teal/10 backdrop-blur-xl animate-float" style={{ animationDelay: "-4s" }}></div>
      
      {/* Abstract shapes */}
      <div className="absolute -top-10 left-[40%] h-60 w-60 rotate-12 rounded-3xl bg-gradient-to-br from-teal/5 to-sand/10 backdrop-blur-xl"></div>
      <div className="absolute -bottom-20 right-[5%] h-80 w-80 -rotate-12 rounded-3xl bg-gradient-to-br from-sand/5 to-teal/10 backdrop-blur-xl"></div>
    </div>
  );
}
