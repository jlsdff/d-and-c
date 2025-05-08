import { useCallback, useState } from "react";

type UseDisclosureProps = {
  defaultIsOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onToggle?: (isOpen: boolean) => void;
};

export type UseDisclosureReturn = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
};

export function useDisclosure({
  defaultIsOpen = false,
  onOpen,
  onClose,
  onToggle,
}: UseDisclosureProps = {}): UseDisclosureReturn {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const open = useCallback(() => {
    setIsOpen(true);
    onOpen?.();
    onToggle?.(true);
  }, [onOpen, onToggle]);

  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
    onToggle?.(false);
  }, [onClose, onToggle]);

  const toggle = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        onOpen?.();
      } else {
        onClose?.();
      }
      onToggle?.(next);
      return next;
    });
  }, [onOpen, onClose, onToggle]);

  return {
    isOpen,
    onOpen: open,
    onClose: close,
    onToggle: toggle,
  };
}
