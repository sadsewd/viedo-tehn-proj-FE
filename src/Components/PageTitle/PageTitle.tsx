import { Box, Typography } from '@mui/material';

const PageTitle = ({ title }: { title?: string }) => {
  return (
    <Box
      sx={{
        width: '100%',
        padding: 3,
        borderRadius: 1,
        bgcolor: 'primary.main',
      }}
    >
      <Typography
        sx={{
          color: 'secondary.main',
          fontSize: 24,
          textTransform: 'uppercase',
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default PageTitle;
