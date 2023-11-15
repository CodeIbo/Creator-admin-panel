import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

function AlertDialog({
  actionHandler,
  open,
  setOpen,
  title,
  text,
  buttonNames,
  buttonPosition,
}: {
  actionHandler: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  text?: string;
  buttonNames?: {
    agree: string;
    disagree: string;
  };
  buttonPosition?: string | 'end';
}) {
  const handleClose = (action: boolean) => {
    setOpen(false);
    actionHandler(action);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose(false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      {text && (
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
      )}

      <DialogActions sx={{ justifyContent: buttonPosition || 'end' }}>
        <Button
          onClick={() => {
            handleClose(true);
          }}
        >
          {buttonNames?.agree || 'Agree'}
        </Button>
        <Button
          onClick={() => {
            handleClose(false);
          }}
          autoFocus
        >
          {buttonNames?.disagree || 'Disagree'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlertDialog;
