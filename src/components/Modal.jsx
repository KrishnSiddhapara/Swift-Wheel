import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const Modal = ({ isOpen, title, message, type, onConfirm, onCancel }) => {
    // Keyboard support for ESC
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onCancel && onCancel();
            }
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onCancel]);

    if (!isOpen) return null;

    const iconMap = {
        success: <CheckCircle2 className="text-emerald-500 w-12 h-12" />,
        error: <XCircle className="text-red-500 w-12 h-12" />,
        warning: <AlertTriangle className="text-yellow-500 w-12 h-12" />,
        info: <Info className="text-blue-500 w-12 h-12" />
    };

    const isConfirm = type === 'warning' || type === 'confirm'; // 'confirm' as fallback

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                {/* Dark Overlay Background */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onCancel}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 10 }}
                    transition={{ type: "spring", duration: 0.3 }}
                    className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden"
                >
                    {/* Close Button */}
                    <button
                        onClick={onCancel}
                        className="cursor-pointer absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Close"
                    >
                        <X size={20} />
                    </button>

                    <div className="p-6 text-center">
                        {/* Icon */}
                        <div className="flex justify-center mb-4">
                            {iconMap[type] || iconMap.info}
                        </div>

                        {/* Title & Message */}
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                        <p className="text-gray-600 text-sm mb-6 whitespace-pre-line">{message}</p>

                        {/* Buttons */}
                        <div className={`flex gap-3 ${isConfirm ? 'justify-between' : 'justify-center'}`}>
                            {isConfirm && (
                                <button
                                    onClick={onCancel}
                                    className="cursor-pointer flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                            )}
                            <button
                                onClick={onConfirm}
                                className={`cursor-pointer flex-1 px-4 py-2.5 text-white font-medium rounded-xl transition-colors ${
                                    type === 'error' ? 'bg-red-600 hover:bg-red-700' :
                                    type === 'warning' || type === 'confirm' ? 'bg-yellow-600 hover:bg-yellow-700' :
                                    type === 'info' ? 'bg-blue-600 hover:bg-blue-700' :
                                    'bg-emerald-600 hover:bg-emerald-700'
                                }`}
                            >
                                {isConfirm ? (type === 'warning' ? 'Yes, Proceed' : 'Confirm') : 'Okay'}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default Modal;
