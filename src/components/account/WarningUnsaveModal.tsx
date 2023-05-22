import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

import { Modal } from "../common";

interface WarningUnsaveModalProps {
  isChange: boolean;
}

const WarningUnsaveModal = ({ isChange }: WarningUnsaveModalProps) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [nextRouterPath, setNextRouterPath] = useState<string>();
  const [isConfirm, setIsConfirm] = useState(false);

  // function
  const onRouteChangeStart = useCallback(
    (nextPath: string) => {
      if (isChange) return;
      if (!isConfirm) {
        setIsOpen(true);
        setNextRouterPath(nextPath);

        throw "cancelRouteChange";
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isChange]
  );

  const removeListener = () => {
    router.events.off("routeChangeStart", onRouteChangeStart);
  };

  const onConfirmRouteChange = () => {
    setIsOpen(false);

    if (!nextRouterPath) {
      window.location.reload();
    }

    setIsConfirm(true);
    removeListener();
  };

  useEffect(() => {
    router.events.on("routeChangeStart", onRouteChangeStart);

    return removeListener;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onRouteChangeStart]);

  useEffect(() => {
    if (nextRouterPath) {
      router.push(nextRouterPath);
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfirm]);

  useEffect(() => {
    if (isChange) return;

    const handleKeyBoard = (e: KeyboardEvent) => {
      if (e.keyCode === 116) {
        setIsOpen(true);
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyBoard);

    return () => {
      window.removeEventListener("keydown", handleKeyBoard);
    };
  }, [isChange]);

  const body = (
    <div>
      <h2 className="text-center text-secondary-color font-medium text-2xl mb-4">
        Thông tin tài khoản của bạn chưa được lưu?
      </h2>
      <div className="flex flex-row justify-center items-center gap-3">
        <button
          className="px-10 py-3 rounded font-medium text-base"
          onClick={onConfirmRouteChange}
        >
          Không lưu thông tin
        </button>
        <button
          className="px-10 py-3 rounded bg-primary-color text-white font-medium text-base"
          onClick={() => setIsOpen(false)}
        >
          Ở lại trang
        </button>
      </div>
    </div>
  );

  return <Modal isOpen={isOpen} body={body} />;
};

export default WarningUnsaveModal;
