import { createContext, useContext, useState, ReactNode } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

type ToastOptions = {
  message: string;
  severity?: AlertColor;
};

type ToasterContextType = {
  dispatchToast: (options: ToastOptions) => void;
};

const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

export const ToasterProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('success');

  const dispatchToast = ({ message, severity = 'success' }: ToastOptions) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ToasterContext.Provider value={{ dispatchToast }}>
      {children}

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </ToasterContext.Provider>
  );
};

export const useToaster = () => {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error('useToaster must be used within a ToasterProvider');
  }
  return context;
};
