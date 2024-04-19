import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableProvided,
  DraggableProvided,
  DraggableStateSnapshot,
  DropResult,
} from 'react-beautiful-dnd';
import { memo, useEffect, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { isArray } from 'lodash';
import { blue } from '@mui/material/colors';
import useFetch from '../../Services/Hooks/useFetch';
import { AxiosResponseTypedData } from '../../Models/AxiosResponse';
import { MenuAttributes } from '../../Models/Api/menu.model';
import LinkButton from '../../Components/LinkButton/LinkButton';

function Menu() {
  const { apiHandler, response, isLoading, error } = useFetch();
  const [fetchedData, setFetchedData] = useState<
    AxiosResponseTypedData<MenuAttributes> | object
  >({});
  const [items, setItems] = useState<MenuAttributes[] | []>([]);

  useEffect(() => {
    apiHandler({
      method: 'get',
      url: 'menu',
    });
  }, []);
  useEffect(() => {
    if (response) {
      setFetchedData(response);
      if (isArray(response.data)) {
        setItems(response.data);
      }
    }
  }, [response, fetchedData]);

  useEffect(() => {
    if (items.length > 0) {
      apiHandler({
        method: 'put',
        url: 'menu/sort',
        data: { menuItems: items },
      });
    }
  }, [items]);

  const deleteHandler = (id: string) => {
    apiHandler({
      method: 'delete',
      url: `menu/${id}`,
    }).then(() => {
      setItems((prev) =>
        prev.filter((obj) => {
          return obj.id !== id;
        })
      );
    });
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (destination.index === source.index) {
      return;
    }

    const newItems = Array.from(items);
    const [removed] = newItems.splice(source.index, 1);
    newItems.splice(destination.index, 0, removed);
    const updatedMenuIndexArray = newItems.map((menuItem, index) => {
      if (menuItem.menu_order === index) {
        return menuItem;
      }
      const copyMenuItem = menuItem;
      copyMenuItem.menu_order = index;
      return copyMenuItem;
    });
    setItems(updatedMenuIndexArray);
  };
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (items.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Typography>Add New Menu Items</Typography>
        <LinkButton
          to="new"
          buttonText="New Menu Item"
          color="primary"
          variant="contained"
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
      <LinkButton
        to="new"
        buttonText="New Menu Item"
        color="primary"
        variant="contained"
        sx={{
          margin: '0 0 1rem auto',
          display: 'block',
          maxWidth: '10rem',
          textAlign: 'center',
        }}
      />
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
                          <LinkButton
                            to={item.id}
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
                      }
                    >
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1">
                            {item.label}
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

export default memo(Menu);
