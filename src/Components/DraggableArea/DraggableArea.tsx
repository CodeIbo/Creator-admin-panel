import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableProvided,
  DraggableProvided,
  DraggableStateSnapshot,
  DropResult,
} from 'react-beautiful-dnd';
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { blue } from '@mui/material/colors';

import LinkButton from '../LinkButton/LinkButton';
import { AxiosErrorData } from '../../Models/AxiosResponse';

function DraggableArea({
  objectNames,
  items,
  onDragEnd,
  deleteHandler,
  configButtons,
  error,
  isLoading,
  textWhenEmptyArray,
}: {
  objectNames: {
    id: string;
    label: string;
  };
  items: any[];
  onDragEnd: (result: DropResult) => void;
  configButtons: {
    edit?: boolean;
    delete?: boolean;
    switch?: boolean;
  };
  isLoading: boolean;
  error: AxiosErrorData | null;
  deleteHandler?: (id: string) => void;
  textWhenEmptyArray: string;
}) {
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (items.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 2,
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant="h4" textAlign="center">
          {textWhenEmptyArray}
        </Typography>
        <LinkButton
          to="new"
          buttonText="New Menu Item"
          color="primary"
          variant="contained"
          sx={{
            maxWidth: '10rem',
          }}
        />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error">Error loading data: {error.message}</Typography>
    );
  }
  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(droppableProvided: DroppableProvided) => (
            <List
              component={Paper}
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(
                    draggableProvided: DraggableProvided,
                    snapshot: DraggableStateSnapshot
                  ) => (
                    <ListItem
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      style={{
                        ...draggableProvided.draggableProps.style,
                        backgroundColor: snapshot.isDragging
                          ? blue[200]
                          : '#fff',
                        boxShadow: snapshot.isDragging
                          ? '0 3px 5px rgba(0,0,0,0.2)'
                          : 'none',
                        transition: !snapshot.isDropAnimating
                          ? 'background-color 500ms ease'
                          : undefined,
                        transitionDelay: !snapshot.isDropAnimating
                          ? '0.2s'
                          : undefined,
                      }}
                      secondaryAction={
                        <ButtonGroup sx={{ gap: 1 }}>
                          {configButtons.edit && (
                            <LinkButton
                              to={`edit/${item.id}`}
                              component={Link}
                              buttonText="edit"
                              color="primary"
                              variant="contained"
                            />
                          )}
                          {configButtons.delete && deleteHandler && (
                            <Button
                              color="error"
                              variant="contained"
                              onClick={() => {
                                deleteHandler(item[objectNames.id]);
                              }}
                            >
                              Delete
                            </Button>
                          )}
                        </ButtonGroup>
                      }
                    >
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1">
                            {item[objectNames.label]}
                          </Typography>
                        }
                      />
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
}

export default DraggableArea;
