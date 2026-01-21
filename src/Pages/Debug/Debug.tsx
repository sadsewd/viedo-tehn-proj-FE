import {
  Badge,
  Button,
  FormControlLabel,
  Switch,
  Typography,
} from '@mui/material';
import PageContent from '../../Components/PageContent';
import PageTitle from '../../Components/PageTitle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useGlobalContext } from '../../Context/GlobalProvider';
import { useState } from 'react';
import axios from 'axios';
import NumberField from '../../Components/NumberField';
import { useToaster } from '../../Context/ToasterContext';

type LoadingFields = {
  calibrate: boolean;
};

const Debug = () => {
  const { connectionStatus, readyState, RPIConfig, updateConfig } =
    useGlobalContext();
  const { dispatchToast } = useToaster();
  const [loading, setLoading] = useState<LoadingFields>({ calibrate: false });

  const handleLoadingChange = (field: keyof LoadingFields, value: boolean) => {
    setLoading((prev) => ({ ...prev, [field]: value }));
  };

  const handleCalibrate = () => {
    handleLoadingChange('calibrate', true);
    axios
      .post('custom/calibrate')
      .then(() => {
        dispatchToast({ message: 'Veismīgi izsaukta rekalibrācija' });
      })
      .catch(() => {
        dispatchToast({
          message: 'Neizdevās izsaukt rekalibrāciju',
          severity: 'error',
        });
      })
      .finally(() => {
        handleLoadingChange('calibrate', false);
      });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <PageTitle title='Kontroles panelis' />

      <PageContent>
        <Typography sx={{ fontSize: 20 }}>Novērošanas iestatījumi</Typography>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <FormControlLabel
            control={<Switch />}
            label='Sensoru novērošana'
            checked={RPIConfig?.sensorObserve}
            onChange={(_, checked) => updateConfig('sensorObserve', checked)}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <FormControlLabel
            control={<Switch />}
            label='Kameras novērošana'
            checked={RPIConfig?.cameraObserve}
            onChange={(_, checked) => updateConfig('cameraObserve', checked)}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <FormControlLabel
            control={<Switch />}
            label='Objektu atpazīšana'
            checked={RPIConfig?.objectDetectObserve}
            onChange={(_, checked) =>
              updateConfig('objectDetectObserve', checked)
            }
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <NumberField
            label='Minimālā ticamība cilvēka noteikšanai (signalizācijas aktivizēšanai)'
            min={1}
            max={100}
            value={
              RPIConfig?.conf_threshold ? RPIConfig.conf_threshold * 100 : null
            }
            onValueChange={(value) => {
              if (typeof value == 'number')
                updateConfig('conf_threshold', value / 100);
            }}
          />
        </div>
        <Button
          loading={loading.calibrate}
          onClick={() => handleCalibrate()}
          variant='contained'
          startIcon={<RestartAltIcon />}
        >
          Attāluma rekalibrācija
        </Button>
      </PageContent>
      <PageContent>
        <Typography sx={{ fontSize: 20 }}>Websocket status</Typography>
        <div style={{ display: 'flex', gap: 8 }}>
          <Typography>{connectionStatus}</Typography>
          <div>
            <Badge
              badgeContent={''}
              color={
                [-1, 2, 3].includes(readyState)
                  ? 'error'
                  : readyState == 1
                    ? 'success'
                    : 'warning'
              }
            >
              <PowerSettingsNewIcon />
            </Badge>
          </div>
        </div>
      </PageContent>
    </div>
  );
};

export default Debug;
