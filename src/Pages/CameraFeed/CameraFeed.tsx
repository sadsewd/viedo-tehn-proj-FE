import { useEffect } from 'react';
import PageContent from '../../Components/PageContent';
import PageTitle from '../../Components/PageTitle';
import { useGlobalContext } from '../../Context/GlobalProvider';
import axios from 'axios';
import { Checkbox, CircularProgress, FormControlLabel } from '@mui/material';

const CameraFeed = () => {
  const { currentFeedImg, RPIConfig, updateConfig } = useGlobalContext();

  useEffect(() => {
    if (!currentFeedImg) axios.post('custom/start_camera_feed');
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <PageTitle title='Kameras tiešraide' />
      <PageContent>
        {RPIConfig?.objectDetectFeed !== undefined && (
          <FormControlLabel
            control={<Checkbox />}
            label='Pāraidīt analizētus attēlus'
            checked={RPIConfig.objectDetectFeed}
            onChange={(_, checked) => {
              updateConfig('objectDetectFeed', checked);
            }}
          />
        )}
      </PageContent>

      <PageContent>
        {!currentFeedImg ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 480,
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={
                currentFeedImg ? `data:image/png;base64, ${currentFeedImg}` : ''
              }
            />
          </div>
        )}
      </PageContent>
    </div>
  );
};

export default CameraFeed;
