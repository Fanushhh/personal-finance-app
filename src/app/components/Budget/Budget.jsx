import { useRef } from "react";
import { ModalComponent } from "../Modals/ModalComponent";
import { EditBudgetForm } from "../Forms/EditBudgetForm";
import { DeleteBudget } from "../Forms/DeleteBudget";
import { deleteBudget } from "@/app/actions/bugets";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const Budget = ({ id, category, maxSpend, colorPref }) => {
    
  const queryClient = useQueryClient();
  const editModalRef = useRef(null);
  const deleteModalRef = useRef(null);
  
  const closeModal = (modal) => {
    modal.current?.close();
  };
  const deleteMutation = useMutation({
    mutationFn: deleteBudget,
    onSuccess: () => {
      queryClient.invalidateQueries(["budgets"]); // Refresh budgets list
    },
  });
  
  return (
    <div key={id} className="bg-white p-6 rounded-xl shadow-lg">
      <h1 className="preset-1">{category}</h1>
      <p className="preset-4 text-[var(--beige-500)]">
        Maximum Spend: ${maxSpend}
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => editModalRef.current?.showModal()}
          className="bg-[var(--gray-900)] text-white py-2 px-4 rounded-xl"
        >
          Edit
        </button>
        <button
            type="button"
          onClick={() => deleteModalRef.current?.showModal()}
          className="bg-red-600 text-white py-2 px-4 rounded-xl"
        >
          {deleteMutation.isLoading ? "Deleting..." : "Delete"}
        </button>
      </div>
      <ModalComponent
        ref={editModalRef}
        closeModal={() => closeModal(editModalRef)}
      >
        <EditBudgetForm
          category={category}
          id={id}
          maxSpend={maxSpend}
          colorPref={colorPref}
          closeModal={() => closeModal(editModalRef)}
        />
      </ModalComponent>
      <ModalComponent
        ref={deleteModalRef}
        closeModal={() => closeModal(deleteModalRef)}
      >
        <DeleteBudget
          category={category}
          handleDelete={(e) => handleDelete(e,id)}
          closeModal={() => closeModal(deleteModalRef)}
        />
      </ModalComponent>
    </div>
  );
};
