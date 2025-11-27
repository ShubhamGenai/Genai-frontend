const ModalWrapper = ({ isOpen, onClose, children }) => { 
  if (!isOpen) return null; 
 
  return ( 
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"> 
      <div className="bg-slate-800/95 backdrop-blur-md w-full max-w-lg p-8 rounded-xl shadow-2xl border border-slate-600/50 relative"> 
         
        <button 
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors duration-200 text-2xl font-bold" 
          onClick={onClose} 
        > 
          ✕ 
        </button> 
 
        {children} 
      </div> 
    </div> 
  ); 
}; 

export default ModalWrapper;