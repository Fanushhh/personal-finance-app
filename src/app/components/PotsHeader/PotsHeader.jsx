'use client';

import { useModal } from "@/app/hooks/useModal";
import { ModalComponent } from "../Modals/ModalComponent";
import { PotForm } from "../Forms/PotForm";
export const PotsHeader = () => {
   const { modalRef, openModal, closeModal } = useModal();
    
    
    return(
        <div className="flex w-full justify-between items-center mb-8">
            <h1 className="preset-1">Pots</h1>   
            <div className="flex gap-4">
                <button className="bg-black text-white py-4 px-6 rounded-md font-bold" onClick={() => openModal(modalRef)}>+ Add New Pot</button>
            </div>
            <ModalComponent ref={modalRef} closeModal={() => closeModal(modalRef)}>
                <PotForm closeModal={() => closeModal(modalRef)}/>
            </ModalComponent>
            
        </div>
    )
}