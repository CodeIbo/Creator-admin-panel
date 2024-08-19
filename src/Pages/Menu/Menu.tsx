/* eslint-disable no-param-reassign */
import { DropResult } from 'react-beautiful-dnd';
import { useState } from 'react';
import { Box, CircularProgress, Container } from '@mui/material';

import { useMutation, useQuery } from 'react-query';
import _ from 'lodash';

import { MenuAttributes } from '../../Models/Api/menu.model';
import LinkButton from '../../Components/LinkButton/LinkButton';
import {
  AxiosErrorData,
  AxiosResponseBase,
  AxiosResponseTypedArray,
} from '../../Models/AxiosResponse';
import useAxiosPrivate from '../../Services/Hooks/useAxiosPrivate';
import { useAlert } from '../../Services/Context/Alert/AlertProvider';
import fetchAxios from '../../Services/Api/fetchAxios';
import DraggableArea from '../../Components/DraggableArea/DraggableArea';
import MenuItems from '../../Components/DraggableArea/Items/MenuItem';

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
      onMutate(menuItems: MenuAttributes[]) {
        setItems(menuItems);
      },
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

  const sortData = (
    itemsSort: MenuAttributes[],
    parentId: string | null = null
  ): MenuAttributes[] => {
    return itemsSort.map((item, index): MenuAttributes => {
      const updatedItem: MenuAttributes = {
        ...item,
        menu_order: index,
        parent_id: parentId,
        children:
          item.children.length > 0 ? sortData(item.children, item.id) : [],
      };

      return updatedItem;
    });
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
      <DraggableArea<MenuAttributes>
        initialItems={items}
        renderItem={({ item, collapseIcon }) => (
          <MenuItems
            item={item as MenuAttributes}
            collapseIcon={collapseIcon}
            deleteHandler={deleteHandler}
          />
        )}
        onChange={(updatedItems) => {
          const sortedData = sortData(updatedItems, null);
          postMenu.mutate(sortedData);
        }}
        idProp="id"
        isLoading={isLoading}
        error={error}
      />
    </Container>
  );
}

export default Menu;
