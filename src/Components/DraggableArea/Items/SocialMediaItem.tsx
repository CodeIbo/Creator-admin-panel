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
import { SocialMediaAttributes } from '../../../Models/Api/socialMedia.model';

interface SocialMediaProps {
  item: SocialMediaAttributes;
  deleteHandler: (id: string) => void;
}

function SocialMediaItem({ item, deleteHandler }: SocialMediaProps) {
  return (
    <ListItem component={Paper}>
      <ListItemText primary={_.startCase(item.name)} />
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

export default SocialMediaItem;
