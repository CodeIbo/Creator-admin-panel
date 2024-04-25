import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import { useAlert } from '../../Services/Context/Alert/AlertProvider';
import { SeverityTypes } from '../../Models/AlertType';

function AlertDialog() {
  const { alert, triggerAlert } = useAlert();

  const handleClose = (
    _event?: React.SyntheticEvent<Element, Event> | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    triggerAlert('', 'info');
  };

  return (
    <Snackbar
      open={alert.message !== ''}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <MuiAlert
        onClose={handleClose}
        severity={(alert.type as SeverityTypes) || 'info'}
        elevation={6}
        variant="filled"
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
}

export default AlertDialog;
