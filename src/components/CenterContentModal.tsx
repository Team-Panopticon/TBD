import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import { PropsWithChildren } from 'react';

export const Container = styled('div')({
  width: '100%',
  height: '100%',
});

export const Content = styled('div')<{ width: number; height: number }>((props) => ({
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  backgroundColor: 'white',
  width: `${props.width}px`,
  height: `${props.height}px`,

  display: 'flex',
  flexDirection: 'column',
  justifyContents: 'space-between',
}));

interface Props {
  open: boolean;
  width: number;
  height: number;
}

export function CenterContentModal(props: PropsWithChildren<Props>) {
  const { open, width, height, children } = props;

  return (
    <Modal open={open}>
      <Container>
        <Content width={width} height={height}>
          {children}
        </Content>
      </Container>
    </Modal>
  );
}
