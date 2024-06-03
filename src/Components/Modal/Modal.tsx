import { Fade, Box, Typography } from '@mui/material';
import ModalMUI from '@mui/material/Modal';
import { Dispatch, ReactNode, SetStateAction } from 'react';

interface ModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

export default function Modal({ open, setOpen, children }: ModalProps) {
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <ModalMUI open={open} onClose={handleClose}>
      <Fade in={open}>
        <Box sx={style}>{children}</Box>
      </Fade>
    </ModalMUI>
  );
}
