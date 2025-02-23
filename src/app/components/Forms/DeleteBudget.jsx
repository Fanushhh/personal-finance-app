

export const DeleteBudget = ({ closeModal, category, handleDelete }) => {
  // close modal on successful deletion
  
  return (
    <div className="relative flex-col rounded-xl gap-4 bg-white p-6  shadow-lg">
      <div className="flex justify-between items-start mb-3">
        <form className="max-w-[500px]">
          <h1 className="preset-1 mb-4">Delete {category}</h1>
          <p className="preset-4 text-[var(--beige-500)] mb-4">
            Are you sure you want to delete this budget? This action cannot be
            reversed, and all the data inside it will be removed forever.
          </p>
          <div className="flex flex-col gap-4 preset-4 font-bold">
          <button type="submit" onClick={handleDelete} className="delete-button">Yes, Confirm Deletion</button>
          <button type="button" onClick={closeModal}>No, Go Back</button>
          
        </div>
        </form>
        
      </div>
    </div>
  );
};
