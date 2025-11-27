import React, { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";

const EditModuleModal = ({ isOpen, onClose, moduleData, onSave }) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (moduleData) setTitle(moduleData.title);
  }, [moduleData]);

  const handleSave = () => {
    onSave({ ...moduleData, title });
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Edit Module</h2>

      <label className="text-sm font-medium">Module Title</label>
      <input
        type="text"
        className="w-full border rounded px-3 py-2 mt-1 mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        onClick={handleSave}
      >
        Save Changes
      </button>
    </ModalWrapper>
  );
};

export default EditModuleModal;
