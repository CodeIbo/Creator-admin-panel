import {
  Button,
  ButtonGroup,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { ReactNode } from 'react';
import LinkButton from '../../LinkButton/LinkButton';
import { MenuAttributes } from '../../../Models/Api/menu.model';

interface MenuItemsProps {
  collapseIcon: ReactNode;
  item: MenuAttributes;
  deleteHandler: (id: string) => void;
}

function MenuItem({ item, collapseIcon, deleteHandler }: MenuItemsProps) {
  return (
    <ListItem component={Paper}>
      {collapseIcon}
      <ListItemText primary={_.startCase(item.label)} />
      <ButtonGroup sx={{ gap: 1 }}>
        <LinkButton
          to={`edit/${item.id}`}
          component={Link}
          buttonText="edit"
          color="primary"
          variant="contained"
        />

        <Button
          color="error"
          variant="contained"
          onClick={() => {
            deleteHandler(item.id);
          }}
        >
          Delete
        </Button>
      </ButtonGroup>
    </ListItem>
  );
}

export default MenuItem;
