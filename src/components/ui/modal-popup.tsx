"use client";
import React from "react";
import { motion } from "framer-motion";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 bg-black backdrop-blur-lg bg-opacity-70 flex items-center justify-center">
            <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="bg-gray-800  rounded-lg w-full max-w-6xl relative text-white overflow-y-scroll h-3/4">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white text-xl font-bold hover:text-red-500"
                >
                    &times;
                </button>
                {children}
            </motion.div>
        </motion.div>
    );
}
