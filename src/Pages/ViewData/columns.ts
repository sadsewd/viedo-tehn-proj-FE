import { GridColDef } from '@mui/x-data-grid';

export const columns_sensor: GridColDef[] = [
  { field: 'id', headerName: 'ID', type: 'number', width: 100 },
  {
    field: 'temperatura',
    headerName: 'Temperatūra',
    type: 'number',
    width: 150,
  },
  {
    field: 'apgaismojums',
    headerName: 'Apgaismojuma līmenis',
    type: 'number',
    width: 250,
  },

  {
    field: 'attalums',
    headerName: 'Attālums',
    type: 'number',
    width: 150,
  },
  {
    field: 'durvis',
    headerName: 'Durvis',
    width: 100,
    valueGetter: (value) =>
      `${value == null ? '-' : value == true ? 'Atvērtas' : 'Aizvērtas'}`,
  },
  {
    field: 'datums',
    headerName: 'Datums',
    type: 'string',
    width: 200,
  },
];

export const columns_images: GridColDef[] = [
  { field: 'id', headerName: 'ID', type: 'number', width: 100 },
];
