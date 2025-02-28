'use client';

import { useModal } from "@/app/hooks/useModal";
import { ModalComponent } from "../Modals/ModalComponent";
import { BudgetForm } from "../Forms/BudgetForm";
export const BudgetHeader = () => {
   const { modalRef, openModal, closeModal } = useModal();
    
    
    return(
        <div className="flex w-full justify-between items-center">
            <h1 className="preset-1">Budgets</h1>   
            <div className="flex gap-4">
                <button className="bg-black  p-4 rounded-md font-bold text-white" onClick={() => openModal(modalRef)}>+ Add New Budget</button>
                
            </div>
            <ModalComponent ref={modalRef} closeModal={() => closeModal(modalRef)}>
                <BudgetForm closeModal={() => closeModal(modalRef)}/>
            </ModalComponent>
            
        </div>
    )
}