import { useRef } from "react";




export const useModal = () => {
     const modalRef = useRef(null);
        const openModal = (modal) => {
            modal.current?.showModal();
        }
        const closeModal = (modal) => {
            modal.current?.close();
        }
        return { modalRef, openModal, closeModal }
}