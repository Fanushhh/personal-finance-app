import { useState } from "react";
import { ModalComponent } from "../Modals/ModalComponent";
import { EditBudgetForm } from "../Forms/EditBudgetForm";
import { DeleteBudget } from "../Forms/DeleteBudget";
import { deleteBudget } from "@/app/actions/bugets";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { EditActions } from "../EditActions/EditActions";
import { useModal } from "@/app/hooks/useModal";

export const Budget = ({ id, category, maxSpend, colorPref, transactions }) => {
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
  const transactionsTotal = Math.abs(
    transactions.reduce((acc, nextVal) => acc + nextVal.amount, 0)
  );
  const progressWidth = (transactionsTotal / maxSpend) * 100;
  console.log(category)
  return (
    <div
      key={id}
      className="p-6 max-w-[600px] w-full relative bg-white rounded-xl hover:drop-shadow-xl transition-all duration-300"
    >
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
        <div className="bg-(--beige-100) h-[20px] rounded-sm mt-2 relative">
          <div
            className="h-[15px] rounded-sm absolute top-[2.5px] left-[2.5px]"
            style={{
              backgroundColor: `var(--${colorPref})`,
              width: `${progressWidth > 100 ? 98 : progressWidth}%`,
            }}
          ></div>
        </div>
        <div className="flex justify-between *:flex *:flex-col *:gap-2 my-4">
          <p className="preset-4 text-[var(--beige-500)]">
            Spent:{" "}
            <span className=" preset-4-bold text-black">
              ${transactionsTotal}
            </span>
          </p>
          <p className="preset-4 text-[var(--beige-500)]">
            Remaining:{" "}
            <span className="preset-4-bold text-black">
              ${maxSpend - transactionsTotal}
            </span>
          </p>
        </div>
      </div>
      <div
        className={`flex flex-col justify-between items-center w-full bg-(--beige-100) p-5 my-2 rounded-md`}
      >
        <div className="flex justify-between w-full">
          <h2 className="preset-3">Latest spending</h2>
          <Link href={`/transactions?category=${category}`} className="custom-after-bg mr-2">
            See all
          </Link>
        </div>
        <div className="w-full ">
          {transactions.map(
            ({ name, amount, date, category, avatar: src }, index) => {
              if (index > 2) {
                return;
              }
              const adjustedDate = new Date(date).toLocaleDateString();
              const updatedAmount =
                amount > 0
                  ? `+$${String(amount)}`
                  : `${String(amount).replace("-", "-$")}`;
              const id = `${name}-${index}`;
              return (
                <div
                  key={id}
                  className=" items-center py-4 justify-items-normal grid grid-cols-4 gap-2 border-b-1 border-(--gray-500-border)"
                >
                  <div className="flex items-center place-self-start gap-4 col-span-3">
                    <Image
                      className="rounded-full"
                      src={src.substr(1)}
                      alt={name}
                      width={32}
                      height={32}
                    />
                    <div>
                      <p className="preset-5-bold">{name}</p>
                      
                    </div>
                  </div>

                  <div className="flex items-end flex-col">
                    <p
                      className="preset-5-bold"
                      style={{ color: amount > 0 ? "var(--green)" : "black" }}
                    >
                      {updatedAmount}
                    </p>
                    <p className="preset-5 text-(--gray-500)">{adjustedDate}</p>
                  </div>
                </div>
              );
            }
          )}
        </div>
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
