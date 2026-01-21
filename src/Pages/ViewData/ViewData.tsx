import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import PageContent from '../../Components/PageContent';
import PageTitle from '../../Components/PageTitle';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useToaster } from '../../Context/ToasterContext';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { columns_sensor } from './columns';
import ImageModal from '../../Components/ImageModal';

type View = 'Sensori' | 'Notikumi' | 'Attēli';
const views: View[] = ['Sensori', 'Notikumi', 'Attēli'];

const ViewData = () => {
  const { dispatchToast } = useToaster();
  const [selectedView, setSelectedView] = useState<View>('Sensori');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [viewImage, setViewImage] = useState<string>('');

  const handleOpenModal = (bufferObj: any) => {
    const byteArray = new Uint8Array(bufferObj.data);
    const decoder = new TextDecoder('utf-8');
    const originalBase64 = decoder.decode(byteArray);
    setViewImage(originalBase64);
    setModalOpen(true);
  };

  const columns_events: GridColDef[] = [
    { field: 'id', headerName: 'ID', type: 'number', width: 70 },
    { field: 'teksts', headerName: 'Ziņa', type: 'string', width: 150 },
    {
      field: 'tips',
      headerName: 'Ziņas tips',
      type: 'string',
      width: 150,
      valueFormatter: (val) => {
        switch (Number(val)) {
          case 1:
            return 'Svarīgs brīdinajums';
          case 2:
            return 'Brīdinajums';
          case 3:
            return 'Informatīva ziņa';
          default:
            return '-';
        }
      },
    },
    {
      field: 'datums',
      headerName: 'Datums',
      type: 'string',
      width: 200,
    },
    {
      field: 'attels',
      headerName: 'Attēls',
      type: 'string',
      width: 200,
      renderCell: (params) =>
        params.value == null ? (
          <>-</>
        ) : (
          <Button onClick={() => handleOpenModal(params.value)}>
            Apskatīt attēlu
          </Button>
        ),
    },
  ];

  const columns_images: GridColDef[] = [
    { field: 'id', headerName: 'ID', type: 'number', width: 70 },
    {
      field: 'attels',
      headerName: 'Attēls',
      type: 'string',
      width: 200,
      renderCell: (params) =>
        params.value == null ? (
          <>-</>
        ) : (
          <Button onClick={() => handleOpenModal(params.value)}>
            Apskatīt attēlu
          </Button>
        ),
    },
    {
      field: 'analizetais_attels',
      headerName: 'Analizetais attēls',
      type: 'string',
      width: 200,
      renderCell: (params) =>
        params.value == null ? (
          <>-</>
        ) : (
          <Button onClick={() => handleOpenModal(params.value)}>
            Apskatīt attēlu
          </Button>
        ),
    },
    {
      field: 'analizes_dati',
      headerName: 'Analīzes dati',
      type: 'string',
      width: 200,
      valueFormatter: (val) => {
        return JSON.stringify(val);
      },
    },
    {
      field: 'datums',
      headerName: 'Datums',
      type: 'string',
      width: 200,
    },
  ];

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${selectedView == 'Attēli' ? 'Atteli' : selectedView}`)
      .then((res) => {
        setData(res.data);
        dispatchToast({
          message: 'Veiksmīgi iegūti dati',
        });
      })
      .catch(() => {
        dispatchToast({
          message: 'Neizdevās iegūt datus',
          severity: 'error',
        });
      })
      .finally(() => setLoading(false));
  }, [selectedView]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        height: '75%',
      }}
    >
      <PageTitle title='Datu apskate' />
      <FormControl fullWidth>
        <InputLabel>Skats</InputLabel>
        <Select
          label='Skats'
          value={selectedView}
          onChange={(e) => setSelectedView(e.target.value)}
        >
          {views.map((el) => (
            <MenuItem value={el}>{el}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <PageContent>
        <DataGrid
          rows={data}
          columns={
            selectedView == 'Sensori'
              ? columns_sensor
              : selectedView == 'Notikumi'
                ? columns_events
                : columns_images
          }
          pageSizeOptions={[5, 10]}
          sx={{ border: 0, minHeight: 511 }}
          loading={loading}
        />
      </PageContent>
      <ImageModal
        img={viewImage}
        open={modalOpen}
        setOpen={setModalOpen}
      />
    </div>
  );
};

export default ViewData;
