import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useGlobalContext } from '../../Context/GlobalProvider';

const AlertModal = () => {
  const { RPIConfig, updateConfig } = useGlobalContext();
  return (
    <Dialog open={RPIConfig?.alarmOn ?? false}>
      <DialogTitle>Tika izsaukta signalizācija</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Sistēmā tika noteikta signalizācijas izsaukšanas situācija
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => updateConfig('alarmOn', false)}>
          Izslēgt signalizāciju
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertModal;
