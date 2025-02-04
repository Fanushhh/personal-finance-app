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
        <div className="">
            <h1 className="preset-1">Budgets</h1>   
            <div className="flex gap-4">
                <button onClick={() => openModal(modalRef)}>Add New Budget</button>
                
            </div>
            <ModalComponent ref={modalRef} closeModal={() => closeModal(modalRef)}>
                <BudgetForm closeModal={() => closeModal(modalRef)}/>
            </ModalComponent>
            
        </div>
    )
}