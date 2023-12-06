import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import { Contents, Footer, Header, Page } from '../../components/pageLayout';
import { FullHeightButtonGroup } from '../../components/styled';

function Welcome() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/meetings/new');
  };

  return (
    <Page>
      <Header>Header</Header>
      <Contents>Contents</Contents>
      <Footer>
        <FullHeightButtonGroup fullWidth disableElevation variant="contained">
          <Button onClick={handleClick}>{'모임 만들기'}</Button>
        </FullHeightButtonGroup>
      </Footer>
    </Page>
  );
}

export default Welcome;
