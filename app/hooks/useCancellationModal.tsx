import React from 'react'
import { create } from 'zustand'

interface CancellationModalStore {
    isOpen: boolean,
    onOpen: () => void;
    onClose: () => void;
}

const useCancellationModal = create<CancellationModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
})); 

export default useCancellationModal