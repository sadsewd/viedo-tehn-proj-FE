import { Typography } from '@mui/material';
import PageContent from '../../Components/PageContent';
import PageTitle from '../../Components/PageTitle';
import { useGlobalContext } from '../../Context/GlobalProvider';
import SmallCard from '../../Components/SmallCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useToaster } from '../../Context/ToasterContext';
import SensorsChart from '../../Components/SensortChart';
import ImageModal from '../../Components/ImageModal';

const Dashboard = () => {
  const { sensorData } = useGlobalContext();
  const { dispatchToast } = useToaster();
  const [eventData, setEventData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewImage, setViewImage] = useState<string>('');

  const handleOpenModal = (img: string) => {
    setViewImage(img);
    setModalOpen(true);
  };

  useEffect(() => {
    axios
      .get('custom/SensorData')
      .then((res) => setData(res.data))
      .catch(() =>
        dispatchToast({
          message: 'Neizdevās iegūt datus no datu bāzes',
          severity: 'error',
        }),
      );

    axios
      .get('custom/NewEvents')
      .then((res) => setEventData(res.data))
      .catch(() =>
        dispatchToast({
          message: 'Neizdevās iegūt datus no datu bāzes',
          severity: 'error',
        }),
      );
  }, []);

  useEffect(() => {
    if (sensorData != null) {
      setData((prev) =>
        prev
          ? [
              ...prev,
              {
                id: null,
                apgaismojums: sensorData.apgaismojums,
                attalums: sensorData.attalums,
                datums: new Date().toISOString(),
                durvis: null,
                temperatura: sensorData.temperatura,
              },
            ]
          : [
              {
                id: null,
                apgaismojums: sensorData.apgaismojums,
                attalums: sensorData.attalums,
                datums: new Date().toISOString(),
                durvis: null,
                temperatura: sensorData.temperatura,
              },
            ],
      );
    }
  }, [sensorData]);

  const getColor = (type: number) => {
    switch (type) {
      case 1:
        return '#ff7575';
      case 2:
        return '#ffc569';
      case 3:
        return 'secondary.main';

      default:
        return 'secondary.main';
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <PageTitle title='Info panelis' />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          gap: 20,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 20,
            flexDirection: 'column',
            width: '60%',
          }}
        >
          <PageContent>
            <Typography sx={{ fontSize: 20 }}>
              Sensoru nolasījumi pēdējās 24 stundās
            </Typography>
            <SensorsChart data={data} />
          </PageContent>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 20,
            flexDirection: 'column',
            width: '40%',
          }}
        >
          <PageContent>
            <Typography sx={{ fontSize: 20 }}>Pašreizējie dati</Typography>
            {sensorData ? (
              <>
                <SmallCard>
                  <Typography>
                    Apgaismojums: {sensorData?.apgaismojums} %
                  </Typography>
                </SmallCard>
                <SmallCard>
                  <Typography>Attālums: {sensorData?.attalums} cm</Typography>
                </SmallCard>
                <SmallCard>
                  <Typography>
                    Temperatūra: {sensorData?.temperatura} °C
                  </Typography>
                </SmallCard>
              </>
            ) : (
              <SmallCard>
                <Typography>Nav datu</Typography>
              </SmallCard>
            )}
          </PageContent>
          <PageContent>
            <Typography sx={{ fontSize: 20 }}>Jaunākie notikumi</Typography>
            {eventData.length > 0 ? (
              eventData.map((el) => (
                <SmallCard
                  onClick={
                    el.attels != null
                      ? () => handleOpenModal(el.attels)
                      : undefined
                  }
                  customColor={getColor(Number(el.tips))}
                >
                  <div>
                    <Typography>{el.teksts}</Typography>
                    <Typography style={{ display: 'flex' }}>
                      {new Date(el.datums).toLocaleTimeString('lv-lv')}{' '}
                      {new Date(el.datums).toLocaleDateString('lv-lv')}
                    </Typography>
                  </div>
                </SmallCard>
              ))
            ) : (
              <SmallCard center>
                <Typography>Nav datu</Typography>
              </SmallCard>
            )}
          </PageContent>
        </div>
      </div>
      <ImageModal
        open={modalOpen}
        setOpen={setModalOpen}
        img={viewImage}
      />
    </div>
  );
};

export default Dashboard;
