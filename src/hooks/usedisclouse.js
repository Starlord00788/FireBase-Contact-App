
import { useState } from "react";
const useDisclouse = () => {
    const onOpen = () => {
        setOpen(true);
      };
     const onClose = () => {
        setOpen(false);
      };
      const [isOpen, setOpen] = useState(false);
  return {onClose,onOpen,isOpen}
   
  
}

export default useDisclouse;
