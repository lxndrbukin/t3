import { ReactNode, useEffect, useRef, useState } from 'react';

type PopupProps = {
  children: ReactNode;
  setIsVisible: (isVisible: boolean) => void;
};

export default function Popup({ children, setIsVisible }: PopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIsVisible(false);
    }
  };

  return (
    <div className='popup-bg'>
      <div ref={popupRef} className='popup'>
        {children}
      </div>
    </div>
  );
}
