import { useEffect, useRef, useState } from "react";
import { ModalComponent } from "../Modals/ModalComponent";
import { EditBudgetForm } from "../Forms/EditBudgetForm";
import { DeleteBudget } from "../Forms/DeleteBudget";
import { deleteBudget } from "@/app/actions/bugets";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { EditActions } from "../EditActions/EditActions";
import { useModal } from "@/app/hooks/useModal";

export const Budget = ({ id, category, maxSpend, colorPref }) => {
  const queryClient = useQueryClient();
  const [showOptions, setShowOptions] = useState(false);
  const {
    modalRef: editModalRef,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();
  const {
    modalRef: deleteModalRef,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();
  const spent = 25;
  const handleDelete = (e, id) => {
    e.preventDefault();
    deleteMutation.mutate(id);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteBudget,
    onSuccess: () => {
      queryClient.invalidateQueries(["budgets"]); // Refresh budgets list
    },
  });
  const progressWidth = (spent / maxSpend) * 100;

  return (
    <div key={id} className="p-6 max-w-[600px] w-full relative bg-white rounded-xl hover:drop-shadow-xl transition-all duration-300">
      <div>
        <Image
          width={20}
          height={20}
          onClick={() => setShowOptions(!showOptions)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              setShowOptions(!showOptions); // Toggle options on Enter or Space
            }
          }}
          tabIndex={0} // Makes it keyboard-focusable
          role="button" // Announces it as a button for screen readers
          aria-label="Open options menu"
          className="cursor-pointer absolute top-8 right-6 focus:ring-2 focus:ring-blue-500"
          src="./assets/images/icon-ellipsis.svg"
          alt="Options menu"
        />
      </div>
      <EditActions
        showOptions={showOptions}
        closeActions={setShowOptions}
        isLoading={deleteMutation.isLoading}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
        editModalRef={editModalRef}
        deleteModalRef={deleteModalRef}
      />
      <div>
        <h2 className="preset-2 flex items-center">
          <span
            style={{ backgroundColor: `var(--${colorPref})` }}
            className={`inline-block mr-2 w-3 h-3 rounded-full`}
          ></span>
          {category}
        </h2>
        <p className="preset-4 my-4 text-[var(--beige-500)]">
          Maximum of: ${maxSpend}
        </p>
        <div className="bg-gray-100 h-[20px] rounded-sm mt-2 relative">
          <div
            className="h-[15px] rounded-sm absolute top-[2.5px] left-[2.5px]"
            style={{
              backgroundColor: `var(--${colorPref})`,
              width: `${progressWidth}%`,
            }}
          ></div>
        </div>
        <div className="flex justify-between *:flex *:flex-col *:gap-2 my-4">
          <p className="preset-4 text-[var(--beige-500)]">
            Spent: <span className=" preset-4-bold text-black">${spent}</span>
          </p>
          <p className="preset-4 text-[var(--beige-500)]">
            Remaining:{" "}
            <span className="preset-4-bold text-black">
              ${maxSpend - spent}
            </span>
          </p>
        </div>
      </div>
      <div className={`flex justify-between items-center w-full`}>
        <h2 className="preset-3">Latest spending</h2>
        <Link href="/transactions" className="custom-after-bg mr-2">
          See all
        </Link>
      </div>

      <ModalComponent
        ref={editModalRef}
        closeModal={() => closeEditModal(editModalRef)}
      >
        <EditBudgetForm
          category={category}
          id={id}
          maxSpend={maxSpend}
          colorPref={colorPref}
          closeModal={() => closeEditModal(editModalRef)}
        />
      </ModalComponent>
      <ModalComponent
        ref={deleteModalRef}
        closeModal={() => closeDeleteModal(deleteModalRef)}
      >
        <DeleteBudget
          category={category}
          handleDelete={(e) => handleDelete(e, id)}
          closeModal={() => closeDeleteModal(deleteModalRef)}
        />
      </ModalComponent>
    </div>
  );
};
