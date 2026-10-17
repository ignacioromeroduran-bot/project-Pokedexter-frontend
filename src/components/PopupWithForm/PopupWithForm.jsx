import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./PopupWithForm.css";

function PopupWithForm({
  isOpen,
  title,
  onClose,
  onSubmit,
  submitLabel,
  children,
}) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="popup"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="popup__container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
      >
        <button
          ref={closeButtonRef}
          className="popup__close"
          type="button"
          onClick={onClose}
          aria-label="Cerrar ventana"
        >
          ×
        </button>
        <h2 className="popup__title" id="popup-title">
          {title}
        </h2>
        <form
          className="popup__form"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          {children}
          <button className="popup__submit" type="submit">
            {submitLabel}
          </button>
        </form>
      </section>
    </div>,
    document.body,
  );
}

export default PopupWithForm;
