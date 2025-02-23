import { useEffect, useRef } from "react";

export const EditActions = ({ showOptions, openEditModal, openDeleteModal, isLoading, editModalRef, deleteModalRef, closeActions }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    if (showOptions) {
      menuRef.current?.focus();
    }
  }, [showOptions]);

  useEffect(() => {
    const handleClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeActions();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  })

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      closeActions(); // Close the menu when Escape is pressed
    }
  };

  return (
    <div
      ref={menuRef}
      tabIndex={-1} // Makes it focusable
      onKeyDown={handleKeyDown}
      className={`absolute z-2 shadow-md p-2 rounded-md flex flex-col top-10 right-6 bg-white text-gray-900 ${
        showOptions ? "flex" : "hidden"
      }`}
    >
      <button
        onClick={() => openEditModal(editModalRef)}
        className="py-2 px-4 rounded-xl focus:ring-2 focus:ring-blue-500"
      >
        Edit
      </button>
      <button
        type="button"
        onClick={() => openDeleteModal(deleteModalRef)}
        className="py-2 px-4 rounded-xl focus:ring-2 focus:ring-red-500 text-(--red)"
      >
        {isLoading ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};
