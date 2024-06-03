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
      <ListItemButton component={Link} to={urlAdress}>
        <ListItemIcon>
          <IconElement color="primary" />
        </ListItemIcon>
        <ListItemText
          primary={name}
          primaryTypographyProps={{ color: 'primary' }}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default ListItemCustom;
