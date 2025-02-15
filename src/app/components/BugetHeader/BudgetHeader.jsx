'use client';

import { useRef } from "react";
import { ModalComponent } from "../Modals/ModalComponent";
import { BudgetForm } from "../Forms/BudgetForm";
export const BudgetHeader = () => {
    const modalRef = useRef(null);
    const openModal = (modal) => {
        modal.current?.showModal();
    }
    const closeModal = (modal) => {
        modal.current?.close();
    }
    
    
    return(
        <div className="flex w-full justify-between items-center">
            <h1 className="preset-1">Budgets</h1>   
            <div className="flex gap-4">
                <button className="bg-black text-white py-4 px-6 rounded-md preset-4-bold" onClick={() => openModal(modalRef)}>+ Add New Budget</button>
                
            </div>
            <ModalComponent ref={modalRef} closeModal={() => closeModal(modalRef)}>
                <BudgetForm closeModal={() => closeModal(modalRef)}/>
            </ModalComponent>
            
        </div>
    )
}