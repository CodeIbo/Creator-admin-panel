import { DropResult } from 'react-beautiful-dnd';
import { useState } from 'react';
import { Container } from '@mui/material';

import { useMutation, useQuery } from 'react-query';

import { MenuAttributes } from '../../Models/Api/menu.model';
import LinkButton from '../../Components/LinkButton/LinkButton';
import DraggableArea from '../../Components/DraggableArea/DraggableArea';
import {
  AxiosErrorData,
  AxiosResponseBase,
  AxiosResponseTypedArray,
} from '../../Models/AxiosResponse';
import useAxiosPrivate from '../../Services/Hooks/useAxiosPrivate';
import { useAlert } from '../../Services/Context/Alert/AlertProvider';
import fetchAxios from '../../Services/Api/fetchAxios';

function Menu() {
  const [items, setItems] = useState<MenuAttributes[] | []>([]);
  const axiosPrivate = useAxiosPrivate();
  const { triggerAlert } = useAlert();

  const { isLoading, error } = useQuery<
    AxiosResponseTypedArray<MenuAttributes>,
    AxiosErrorData
  >({
    queryKey: ['menu'],
    queryFn: async () =>
      fetchAxios({
        axios: axiosPrivate,
        url: 'menu',
        method: 'get',
      }),
    onSuccess(response) {
      setItems(response.data);
    },
  });
  const postMenu = useMutation(
    async (menuItems: MenuAttributes[]) =>
      fetchAxios({
        axios: axiosPrivate,
        url: 'menu/sort',
        method: 'put',
        data: { menuItems },
      }),
    {
      onSuccess: (response: AxiosResponseBase) =>
        triggerAlert(response.message, 'success'),
    }
  );

  const deletetMenu = useMutation(
    async (id: string) =>
      fetchAxios({
        axios: axiosPrivate,
        url: `menu/${id}`,
        method: 'delete',
      }),
    {
      onMutate(id) {
        setItems((prev) =>
          prev.filter((obj) => {
            return obj.id !== id;
          })
        );
      },
      onSuccess: (response: AxiosResponseBase) =>
        triggerAlert(response.message, 'success'),
      onError: (err: AxiosErrorData) => triggerAlert(err.message, 'error'),
    }
  );

  const deleteHandler = (id: string) => {
    deletetMenu.mutate(id);
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
    postMenu.mutate(updatedMenuIndexArray);
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
