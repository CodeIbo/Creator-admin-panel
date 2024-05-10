import { DropResult } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { isArray } from 'lodash';

import useFetch from '../../Services/Hooks/useFetch';
import { MenuAttributes } from '../../Models/Api/menu.model';
import LinkButton from '../../Components/LinkButton/LinkButton';
import DraggableArea from '../../Components/DraggableArea/DraggableArea';

function Menu() {
  const { apiHandler, response, isLoading, error } = useFetch();
  const [items, setItems] = useState<MenuAttributes[] | []>([]);
  useEffect(() => {
    apiHandler({
      method: 'get',
      url: 'menu',
    });
  }, []);
  useEffect(() => {
    if (response && isArray(response.data)) {
      setItems(response.data);
    }
  }, [response]);

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
      <DraggableArea
        objectNames={{
          id: 'id',
          label: 'label',
        }}
        items={items}
        onDragEnd={onDragEnd}
        configButtons={{
          edit: true,
          delete: true,
        }}
        deleteHandler={deleteHandler}
        isLoading={isLoading}
        error={error}
        textWhenEmptyArray="Add New Menu Items"
      />
    </Container>
  );
}

export default Menu;
