import Button from '@mui/material/Button';

import { Contents, Footer, Header, Page } from '../../components/pageLayout';
import { FullHeightButtonGroup } from '../../components/styled';

function Welcome() {
  return (
    <Page>
      <Header>Header</Header>
      <Contents>Contents</Contents>
      <Footer>
        <FullHeightButtonGroup fullWidth disableElevation variant="contained">
          <Button>{'모임 만들기'}</Button>
        </FullHeightButtonGroup>
      </Footer>
    </Page>
  );
}

export default Welcome;
