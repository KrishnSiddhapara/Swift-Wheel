import React, { createContext, useContext, useState, useCallback } from 'react';
import Modal from '../components/Modal';

const ModalContext = createContext(null);

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [modalState, setModalState] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'info', // success, error, warning, info
    });

    const [resolver, setResolver] = useState(null);

    // General purpose alert
    const showAlert = useCallback((message, type = 'info', title = null) => {
        return new Promise((resolve) => {
            const defaultTitles = {
                success: 'Success',
                error: 'Error',
                warning: 'Warning',
                info: 'Information'
            };
            
            setModalState({
                isOpen: true,
                title: title || defaultTitles[type] || 'Alert',
                message,
                type
            });

            // Automatically close success alerts after 3.5 seconds
            if (type === 'success') {
                setTimeout(() => {
                    handleConfirm(resolve);
                }, 3500);
            }

            setResolver(() => resolve);
        });
    }, []);

    // Confirmation dialog
    const showConfirm = useCallback((message, title = 'Confirm Action', type = 'warning') => {
        return new Promise((resolve) => {
            setModalState({
                isOpen: true,
                title,
                message,
                type: 'warning' // force warning styling for confirm
            });

            setResolver(() => resolve);
        });
    }, []);

    const handleConfirm = (resolveParam) => {
        if (resolveParam) resolveParam(true);
        else if (resolver) resolver(true);
        closeModal();
    };

    const handleCancel = () => {
        if (resolver) resolver(false);
        closeModal();
    };

    const closeModal = () => {
        setModalState((prev) => ({ ...prev, isOpen: false }));
        // Delay clearing content so animation finishes smoothly
        setTimeout(() => {
            setModalState({ isOpen: false, title: '', message: '', type: 'info' });
            setResolver(null);
        }, 300);
    };

    return (
        <ModalContext.Provider value={{ showAlert, showConfirm }}>
            {children}
            {modalState.isOpen && (
                <Modal
                    isOpen={modalState.isOpen}
                    title={modalState.title}
                    message={modalState.message}
                    type={modalState.type}
                    onConfirm={() => handleConfirm()}
                    onCancel={handleCancel}
                />
            )}
        </ModalContext.Provider>
    );
};
