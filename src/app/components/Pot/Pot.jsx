import { useState } from "react";
import { ModalComponent } from "../Modals/ModalComponent";
import { DeletePot } from "../Forms/DeletePot";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { deletePot } from "@/app/actions/pots";
import { useModal } from "@/app/hooks/useModal";
import { EditPotForm } from "../Forms/EditPot";
import { EditActions } from "../EditActions/EditActions";
import { AddPotMoney } from "../Forms/AddPotMoney";
export const Pot = ({ id, potName, target, colorPref, currentAmount }) => {
  const queryClient = useQueryClient();
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
  const {
    modalRef: addMoneyModalRef,
    openModal: openAddMoneyModal,
    closeModal: closeAddMoneyModal,
  } = useModal();
  const {
    modalRef: withdrawModalRef,
    openModal: openWithdrawModal,
    closeModal: closeWithdrawModal,
  } = useModal();

  const [showOptions, setShowOptions] = useState(false);
  
  const handleDelete = (e, id) => {
    e.preventDefault();
    deleteMutation.mutate(id);
  };
  const deleteMutation = useMutation({
    mutationFn: deletePot,
    onSuccess: () => {
      queryClient.invalidateQueries(["pots"]); // Refresh pots list
    },
  });
  const progressWidth = (currentAmount / target) * 100;

  return (
    <div
      key={id}
      className="p-6 max-w-[520px] w-full relative rounded-xl bg-white hover:drop-shadow-xl transition-all duration-300"
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
        <h2 className="preset-2 flex items-center mb-8">
          <span
            style={{ backgroundColor: `var(--${colorPref})` }}
            className={`inline-block mr-2 w-3 h-3 rounded-full`}
          ></span>
          {potName}
        </h2>
        <div className="flex justify-between items-center mb-4">
          <p className="preset-4 my-4 text-[var(--beige-500)]">Total saved</p>
          <p className="preset-1">${currentAmount}</p>
        </div>
        <div className="bg-[var(--beige-100)] h-[10px] rounded-sm mt-2 relative">
          <div
            className="h-[10px] rounded-2xl absolute top-0 left-0"
            style={{
              backgroundColor: `var(--${colorPref})`,
              width: `${progressWidth}%`,
            }}
          ></div>
        </div>
        <div className="flex justify-between text-[var(--gray-500)] *:flex *:flex-col *:gap-2 my-4">
          <p className="preset-5-bold ">{progressWidth}%</p>
          <p className="preset-5">Target of ${target}</p>
        </div>
        <div className="flex *:rounded-[8px] gap-4 *:bg-(--beige-100) *:p-4 *:text-(--gray-900) *:w-1/2">
          <button type="button" onClick={() => openAddMoneyModal(addMoneyModalRef)} className="preset-4-bold">+ Add money</button>
          <button className="preset-4-bold">Withdraw</button>
        </div>
      </div>
      <ModalComponent ref={addMoneyModalRef} closeModal={() => closeAddMoneyModal(addMoneyModalRef)}>
          <AddPotMoney potName={potName} potId={id} closeModal={() => closeAddMoneyModal(addMoneyModalRef)} />
      </ModalComponent>
      <ModalComponent
        ref={editModalRef}
        closeModal={() => closeEditModal(editModalRef)}
      >
        <EditPotForm
          potName={potName}
          id={id}
          target={target}
          colorPref={colorPref}
          closeModal={() => closeEditModal(editModalRef)}
        />
      </ModalComponent>
      <ModalComponent
        ref={deleteModalRef}
        closeModal={() => closeDeleteModal(deleteModalRef)}
      >
        <DeletePot
          potName={potName}
          handleDelete={(e) => handleDelete(e, id)}
          closeModal={() => closeDeleteModal(deleteModalRef)}
        />
      </ModalComponent>
    </div>
  );
};
