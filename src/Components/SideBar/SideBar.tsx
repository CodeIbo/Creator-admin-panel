import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';

import BookTwoToneIcon from '@mui/icons-material/BookTwoTone';
import HomeIcon from '@mui/icons-material/Home';
import SideBarHandlerType from '../../Models/SideBarHandlerType';
import ListItemCustom from './ListItem/ListItem';

function SideBar({ sideBarState, sideBarHandler }: SideBarHandlerType) {
  return (
    <div>
      <Drawer
        open={sideBarState}
        onClose={() => {
          sideBarHandler(false);
        }}
      >
        <Box
          onClick={() => {
            sideBarHandler(false);
          }}
        >
          <List>
            <ListItemCustom
              IconElement={HomeIcon}
              name="Home"
              urlAdress="/dashboard/"
            />

            <ListItemCustom
              IconElement={BookTwoToneIcon}
              name="Blog"
              urlAdress="/dashboard/blog"
            />
          </List>
        </Box>
      </Drawer>
    </div>
  );
}

export default SideBar;
