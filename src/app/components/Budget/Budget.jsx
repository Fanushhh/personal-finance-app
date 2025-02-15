import { useRef, useState } from "react";
import { ModalComponent } from "../Modals/ModalComponent";
import { EditBudgetForm } from "../Forms/EditBudgetForm";
import { DeleteBudget } from "../Forms/DeleteBudget";
import { deleteBudget } from "@/app/actions/bugets";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";

export const Budget = ({ id, category, maxSpend, colorPref }) => {
  const queryClient = useQueryClient();
  const editModalRef = useRef(null);
  const deleteModalRef = useRef(null);
  const [showOptions, setShowOptions] = useState(false);
  const spent = 25;
  const handleDelete = (e, id) => {
    e.preventDefault();
    deleteMutation.mutate(id);
  };
  const closeModal = (modal) => {
    modal.current?.close();
  };
  const deleteMutation = useMutation({
    mutationFn: deleteBudget,
    onSuccess: () => {
      queryClient.invalidateQueries(["budgets"]); // Refresh budgets list
    },
  });
  const progressWidth = (spent / maxSpend) * 100;
  

  return (
    <div key={id} className="p-6 max-w-[600px] w-full relative">
      <div>
        <Image width={20} height={20} onClick={() => setShowOptions(!showOptions)} className="cursor-pointer absolute top-8 right-6" src="./assets/images/icon-ellipsis.svg" alt="ellipsis" />
      </div>
      <div className={` absolute z-2 shadow-md p-2 rounded-md flex flex-col top-10 right-6 bg-white text-gray-900 ${showOptions === true ? 'flex' : 'hidden'} *:hover:bg-gray-100`}>
      <button
          onClick={() => editModalRef.current?.showModal()}
          className="  py-2 px-4 rounded-xl"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => deleteModalRef.current?.showModal()}
          className="  py-2 px-4 rounded-xl"
        >
          {deleteMutation.isLoading ? "Deleting..." : "Delete"}
        </button>
      </div>
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
            <span className="preset-4-bold text-black">${maxSpend - spent}</span>
          </p>
        </div>
      </div>
      <div className={`flex justify-between items-center w-full`}>
        <h2 className="preset-3">Latest spending</h2>
        <Link href="/transactions" className="custom-after-bg mr-2">See all</Link>
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
          handleDelete={(e) => handleDelete(e, id)}
          closeModal={() => closeModal(deleteModalRef)}
        />
      </ModalComponent>
    </div>
  );
};
