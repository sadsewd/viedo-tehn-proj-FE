import { Box } from '@mui/material';
import { ReactNode } from 'react';

const PageContent = ({ children }: { children?: ReactNode }) => {
  return (
    <Box
      sx={{
        width: '100%',
        padding: 3,
        borderRadius: 1,
        border: 'solid 1px ',
        borderColor: 'primary.main',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: '100%',
      }}
    >
      {children}
    </Box>
  );
};

export default PageContent;
