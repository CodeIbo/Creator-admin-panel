import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem,
} from '@mui/material';
import { Link } from 'react-router-dom';
import LinkItemType from '../../../Models/linkItemType';

function ListItemCustom({ IconElement, name, urlAdress }: LinkItemType) {
  return (
    <ListItem>
      <Link to={urlAdress} style={{ all: 'inherit' }}>
        <ListItemButton>
          <ListItemIcon>
            <IconElement />
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItemButton>
      </Link>
    </ListItem>
  );
}

export default ListItemCustom;
