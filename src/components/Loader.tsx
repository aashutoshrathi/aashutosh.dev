import React from "react"

const Loader = () => (
  <div className="flex justify-center items-center mt-24">
    <div className="w-16 text-center">
      <div className="w-4 h-4 bg-white rounded-full inline-block animate-bounce mr-1"
           style={{ animationDelay: '-0.32s' }}></div>
      <div className="w-4 h-4 bg-white rounded-full inline-block animate-bounce mr-1"
           style={{ animationDelay: '-0.16s' }}></div>
      <div className="w-4 h-4 bg-white rounded-full inline-block animate-bounce"></div>
    </div>
  </div>
)

export default Loader