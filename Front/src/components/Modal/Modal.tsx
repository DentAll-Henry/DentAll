import { FC, ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-darkD-400 opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-[#1A2228]  min-w-[40%]  rounded-lg p-6 z-10 relative">
        <button className="absolute top-2 right-4" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
