import { Box } from '@mui/material';
import { MouseEventHandler, ReactNode } from 'react';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
const SmallCard = ({
  children,
  customColor,
  center,
  onClick,
  ignoreHeight = false,
}: {
  children?: ReactNode;
  customColor?: string;
  center?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
  ignoreHeight?: boolean;
}) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        height: ignoreHeight ? 'initial' : '48px',
        borderRadius: 2,
        padding: 1,
        alignItems: 'center',
        backgroundColor: customColor ? customColor : 'secondary.main',
        boxShadow:
          ' rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
        justifyContent: center ? 'center' : onClick ? 'space-between' : 'start',
        ':hover': { cursor: onClick ? 'pointer' : 'initial' },
      }}
    >
      {children}
      {onClick && <ImageOutlinedIcon />}
    </Box>
  );
};

export default SmallCard;
