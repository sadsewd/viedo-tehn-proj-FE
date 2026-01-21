import { Outlet, useNavigate } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import {
  AppBar,
  Button,
  CircularProgress,
  CssBaseline,
  Toolbar,
  Typography,
} from '@mui/material';
import { Settings, BarChart, LinkedCamera } from '@mui/icons-material';
import Debug from './Pages/Debug';
import CameraFeed from './Pages/CameraFeed';
import ViewData from './Pages/ViewData';
import Dashboard from './Pages/Dashboard';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useGlobalContext } from './Context/GlobalProvider';
export default function Layout() {
  const navigate = useNavigate();
  const { RPIConfig } = useGlobalContext();
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <CssBaseline />
      {RPIConfig == null ? (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 24,
            }}
          >
            <CircularProgress />
            <Typography>Gaida konfigurāciju...</Typography>
          </div>
        </div>
      ) : (
        <>
          <AppBar position='static'>
            <Toolbar>
              <Typography
                sx={{ flexGrow: 1, fontWeight: 'bold', fontSize: 20 }}
              >
                Novērošanas sistēma
              </Typography>

              <Button
                color='inherit'
                onClick={() => navigate('/')}
                startIcon={<DashboardIcon />}
              >
                Info panelis
              </Button>
              <Button
                color='inherit'
                onClick={() => navigate('/camera')}
                startIcon={<LinkedCamera />}
              >
                Kameras tiešraide
              </Button>
              <Button
                color='inherit'
                onClick={() => navigate('/viewData')}
                startIcon={<BarChart />}
              >
                Datu apskate
              </Button>
              <Button
                color='inherit'
                onClick={() => navigate('/controls')}
                startIcon={<Settings />}
              >
                Kontroles panelis
              </Button>
            </Toolbar>
          </AppBar>

          <main
            style={{
              flex: 1,
              padding: 24,
              overflow: 'hidden',
            }}
          >
            <Outlet />
          </main>
        </>
      )}
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'controls',
        element: <Debug />,
      },
      {
        path: 'camera',
        element: <CameraFeed />,
      },
      {
        path: 'viewData',
        element: <ViewData />,
      },
    ],
  },
]);
