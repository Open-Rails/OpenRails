import { useEffect } from "react";

const useOutsideClick = (ref, callback) => {
  const handleClickOutside = event => {
    if (ref && !ref?.current?.contains(event.target)) {
      callback();
    }
  };

  useEffect(() => {
    if (ref) {
      document.addEventListener("click", handleClickOutside, false);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);
};

export default useOutsideClick;