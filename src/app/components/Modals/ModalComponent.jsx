export const ModalComponent = ({ ref, closeModal, children }) => {
  return (
    <dialog
      ref={ref}
      className="relative w-full rounded-xl max-w-[540px] transition-scale origin-center animate-dropdown overflow-visible top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <button autoFocus className="absolute top-6 right-6 z-10" onClick={closeModal}>
        <img
          alt="close button"
          className="w-6 h-6"
          src="./assets/images/icon-close-modal.svg"
        />
        </button>
     
      {children}
    </dialog>
  );
};
