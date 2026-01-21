import { createTheme, ThemeProvider } from '@mui/material';
import GlobalProvider from './Context/GlobalProvider';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import { ToasterProvider } from './Context/ToasterContext';
import axios from 'axios';

function App() {
  const materialTheme = createTheme({
    palette: {
      primary: {
        main: '#05204A',
      },
      secondary: {
        main: '#E1E2EF',
      },
    },
  });

  axios.defaults.baseURL = 'https://viedo-tehn-proj-be.onrender.com/';

  return (
    <ThemeProvider theme={materialTheme}>
      <GlobalProvider>
        <ToasterProvider>
          <RouterProvider router={router} />
        </ToasterProvider>
      </GlobalProvider>
    </ThemeProvider>
  );
}

export default App;
