import styled from '@mui/material/styles/styled';
import Typography from '@mui/material/Typography';

interface HowToStepProps {
  image: string;
  text: string;
  textUnderline?: boolean;
}

export default function HowToStep({ image, text, textUnderline }: HowToStepProps) {
  return (
    <Container>
      <Typography
        variant="h6"
        fontWeight={500}
        align="center"
        marginTop={'24px'}
        marginBottom={'12px'}
        paddingBottom={'12px'}
        width={'80%'}
        style={{ wordBreak: 'keep-all', borderBottom: textUnderline ? `2px solid #e0e0e0` : `` }}
      >
        {text}
      </Typography>
      <img src={image} style={{ width: '100%', borderRadius: '0px 0px 16px 16px' }} />
    </Container>
  );
}

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 80%;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin-top: 48px;
  padding-bottom: 16px;
`;
