import { Container, Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import EditSettings from './EditSettings';
import UISettings from './UISettings';

function Settings() {
  const lastTab = localStorage.getItem('last_tab');
  const [tabIndex, setTabIndex] = useState(lastTab ? Number(lastTab) : 0);
  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    localStorage.setItem('last_tab', newValue.toString());
  };
  return (
    <Container>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="inherit"
        sx={{ mb: 5, background: '#131312', borderRadius: 1 }}
      >
        <Tab label="Global" value={0} />
        <Tab label="UI" value={1} />
      </Tabs>
      {tabIndex === 0 && <EditSettings />}
      {tabIndex === 1 && <UISettings />}
    </Container>
  );
}

export default Settings;
