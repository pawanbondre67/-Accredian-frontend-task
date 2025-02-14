import React from "react";

const Loader : React.FC = () => {
  return (
    <div className="flex-col gap-4 w-full flex items-center justify-center">
      <div className="w-6 h-6 border-4 border-transparent text-slate-100 text-4xl animate-spin flex items-center justify-center border-t-slate-100 rounded-full">
        <div className="w-6 h-6 border-4 border-transparent text-red-400 text-4xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
      </div>
    </div>
  );
};

export default Loader;
