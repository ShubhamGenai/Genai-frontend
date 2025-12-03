import React from "react";

const PlaceholderPage = ({ title, description }) => {
  return (
    <div className="w-full min-h-full pb-8">
      <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-3">
          {title}
        </h1>
        {description && (
          <p className="text-slate-400 text-base max-w-2xl">{description}</p>
        )}
        {!description && (
          <p className="text-slate-400 text-base">
            This page is under construction for the Content Manager. You can
            extend it with the required functionality later.
          </p>
        )}
      </div>
    </div>
  );
};

export default PlaceholderPage;


