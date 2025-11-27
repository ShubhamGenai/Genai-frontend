import ModalWrapper from "./ModalWrapper";

const ViewModuleModal = ({ isOpen, onClose, moduleData }) => {
  if (!moduleData) return null;

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Module Details</h2>

      <p className="text-lg font-semibold">{moduleData.title}</p>

      <h3 className="mt-4 font-medium text-gray-700">Lessons:</h3>
      <ul className="list-disc ml-5 text-gray-600">
        {moduleData.lessons.length > 0 ? (
          moduleData.lessons.map((lesson, i) => (
            <li key={i}>{lesson.title}</li>
          ))
        ) : (
          <p>No lessons added.</p>
        )}
      </ul>
    </ModalWrapper>
  );
};

export default ViewModuleModal;
