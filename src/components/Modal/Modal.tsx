import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  // Закриття по Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={css.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* зупиняємо спливання події, щоб клік по самому вікну його не закривав */}
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body // Рендеримо в body
  );
}
