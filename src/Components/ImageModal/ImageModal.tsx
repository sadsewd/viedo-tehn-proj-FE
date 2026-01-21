import { Dialog, IconButton, Box, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { ImageModalProps } from './props';

const ImageModal = ({ img, open, setOpen }: ImageModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullScreen
      PaperProps={{
        sx: {
          backgroundColor: 'black',
        },
      }}
    >
      <IconButton
        onClick={() => setOpen(false)}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 10,
          color: 'white',
        }}
      >
        <CloseIcon />
      </IconButton>

      <TransformWrapper
        minScale={0.5}
        maxScale={6}
        initialScale={1}
        wheel={{ step: 0.15 }}
        doubleClick={{ mode: 'zoomIn' }}
        panning={{ velocityDisabled: true }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <Stack
              direction='row'
              spacing={1}
              sx={{
                position: 'absolute',
                bottom: 24,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10,
                backgroundColor: 'rgba(0,0,0,0.6)',
                borderRadius: 2,
                p: 1,
              }}
            >
              <IconButton
                onClick={() => zoomIn()}
                sx={{ color: 'white' }}
              >
                <ZoomInIcon />
              </IconButton>
              <IconButton
                onClick={() => zoomOut()}
                sx={{ color: 'white' }}
              >
                <ZoomOutIcon />
              </IconButton>
              <IconButton
                onClick={() => resetTransform()}
                sx={{ color: 'white' }}
              >
                <RestartAltIcon />
              </IconButton>
            </Stack>

            <TransformComponent
              wrapperStyle={{
                width: '100%',
                height: '100%',
              }}
              contentStyle={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                component='img'
                src={`data:image/png;base64,${img}`}
                alt='Zoomable'
                draggable={false}
                sx={{
                  maxWidth: 'none',
                  maxHeight: 'none',
                  userSelect: 'none',
                }}
              />
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </Dialog>
  );
};

export default ImageModal;
