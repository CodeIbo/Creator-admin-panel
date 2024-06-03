import { Box, Container, Grid } from '@mui/material';
import _ from 'lodash';

import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ImageAttributes } from '../../Models/Api/image.model';
import {
  AxiosErrorData,
  AxiosResponseTypedArray,
} from '../../Models/AxiosResponse';
import GalleryItem from '../../Components/GalleryItem/GalleryItem';
import FileUploadButton from '../../Components/FileUploadButton/FileUploadButton';
import useAxiosPrivate from '../../Services/Hooks/useAxiosPrivate';
import fetchAxios from '../../Services/Api/fetchAxios';
import LoadingState from '../../Components/LoadingState/LoadingState';
import { useAlert } from '../../Services/Context/Alert/AlertProvider';

function Gallery() {
  const axiosPrivate = useAxiosPrivate();
  const { triggerAlert } = useAlert();
  const queryClient = useQueryClient();

  const imageQuery = useQuery<
    AxiosResponseTypedArray<ImageAttributes>,
    AxiosErrorData
  >({
    queryKey: ['image'],
    queryFn: async () =>
      fetchAxios({
        axios: axiosPrivate,
        url: 'image',
        method: 'get',
      }),
  });

  const imageDeleteMutation = useMutation(
    (id: string) =>
      fetchAxios({
        axios: axiosPrivate,
        url: `image/${id}`,
        method: 'delete',
      }),
    {
      onSuccess: () => {
        triggerAlert('Image deleted', 'success');
        queryClient.invalidateQueries(['image'], { exact: true });
      },
      onError: (err: AxiosErrorData) => {
        if (err?.response?.data) {
          triggerAlert(err?.response?.statusText, 'error');
        } else {
          triggerAlert(err?.message, 'error');
        }
      },
    }
  );

  const imagePostMutation = useMutation(
    (values: FormData) =>
      fetchAxios({
        axios: axiosPrivate,
        method: 'post',
        url: 'image',
        data: values,
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['image'], { exact: true });
        triggerAlert('Image added', 'success');
      },
      onError: (err: AxiosErrorData) => {
        if (err?.response?.data) {
          triggerAlert(err?.response?.statusText, 'error');
        } else {
          triggerAlert(err?.message, 'error');
        }
      },
    }
  );

  const onAdd = (newItem: FormData) => {
    imagePostMutation.mutate(newItem);
  };

  const onDelete = (id: string) => {
    imageDeleteMutation.mutate(id);
  };

  if (imageQuery.isLoading) return <LoadingState />;

  return (
    <Container>
      <Box
        sx={{ marginBottom: 4, display: 'flex', justifyContent: 'flex-end' }}
      >
        <FileUploadButton
          onAdd={onAdd}
          isLoading={imagePostMutation.isLoading}
        />
      </Box>

      <Grid container spacing={3}>
        {imageQuery.data?.data.map((item) => (
          <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
            <GalleryItem image={item} onDelete={onDelete} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Gallery;
