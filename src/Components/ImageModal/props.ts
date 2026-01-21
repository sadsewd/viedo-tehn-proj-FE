import { Dispatch, SetStateAction } from 'react';

export type ImageModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  img: string;
};
