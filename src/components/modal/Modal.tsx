"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/form/Button";
import styles from "./Modal.module.css";

interface ModalProps {
  message: string;
  isVisible: boolean;
  onClose?: () => void;
}

const modalStyles = {
  error: {
    container: "bg-red-50 border-l-4 border-red-500 text-red-700",
    icon: "text-red-500",
  },
  info: {
    container: "bg-blue-50 border-l-4 border-blue-500",
    icon: "text-blue-500",
  },
} as const;

const ErrorModal = ({ message, isVisible, onClose = () => {} }: ModalProps): React.ReactNode => {
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsHiding(false);
      const timer = setTimeout(() => {
        setIsHiding(true);
        setTimeout(onClose, 500); // 애니메이션 완료 후 onClose 호출
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-4">
      <div
        className={`${modalStyles.error.container} p-4 rounded shadow-lg mx-auto max-w-4xl ${styles.modalContainer} ${
          isHiding ? styles.hiding : ""
        }`}
      >
        <div className="flex items-center">
          <div className="py-1">
            <svg
              className={`h-6 w-6 ${modalStyles.error.icon} mr-4`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-bold">오류</p>
            <p className="text-sm">{message}</p>
          </div>
          <div>
            <Button.Secondary
              onClick={() => {
                setIsHiding(true);
                setTimeout(onClose, 500);
              }}
              size="sm"
            >
              닫기
            </Button.Secondary>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoModal = ({ message, isVisible, onClose = () => {} }: ModalProps): React.ReactNode => {
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsHiding(false);
      const timer = setTimeout(() => {
        setIsHiding(true);
        setTimeout(onClose, 500); // 애니메이션 완료 후 onClose 호출
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-4">
      <div
        className={`${modalStyles.info.container} p-4 rounded shadow-lg mx-auto max-w-4xl ${styles.modalContainer} ${
          isHiding ? styles.hiding : ""
        }`}
      >
        <div className="flex items-center">
          <div className="py-1">
            <svg
              className={`h-6 w-6 ${modalStyles.info.icon} mr-4`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-bold">알림</p>
            <p className="text-sm">{message}</p>
          </div>
          <div>
            <Button.Secondary
              onClick={() => {
                setIsHiding(true);
                setTimeout(onClose, 500);
              }}
              size="sm"
            >
              닫기
            </Button.Secondary>
          </div>
        </div>
      </div>
    </div>
  );
};

const Modal = {
  Error: ErrorModal,
  Info: InfoModal,
};

export default Modal;
