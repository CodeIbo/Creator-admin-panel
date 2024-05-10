import { DropResult } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { isArray } from 'lodash';

import useFetch from '../../Services/Hooks/useFetch';
import DraggableArea from '../../Components/DraggableArea/DraggableArea';
import { SocialMediaAttributes } from '../../Models/Api/socialMedia.model';

function SocialMedia() {
  const { apiHandler, response, isLoading, error } = useFetch();
  const [items, setItems] = useState<SocialMediaAttributes[] | []>([]);
  useEffect(() => {
    apiHandler({
      method: 'get',
      url: 'social-media',
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
        url: 'social-media/sort',
        data: { socialMedia: items },
      });
    }
  }, [items]);

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
    const updatedMenuIndexArray = newItems.map((smItem, index) => {
      if (smItem.order === index) {
        return smItem;
      }
      const copyMenuItem = smItem;
      copyMenuItem.order = index;
      return copyMenuItem;
    });
    setItems(updatedMenuIndexArray);
  };

  return (
    <Container>
      <DraggableArea
        objectNames={{
          id: 'id',
          label: 'name',
        }}
        items={items}
        onDragEnd={onDragEnd}
        configButtons={{
          edit: true,
          delete: false,
        }}
        isLoading={isLoading}
        error={error}
        textWhenEmptyArray="Call to admin to add :("
      />
    </Container>
  );
}

export default SocialMedia;
