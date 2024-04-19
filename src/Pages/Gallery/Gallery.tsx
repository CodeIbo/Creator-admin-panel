import { useEffect, useState } from 'react';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import _ from 'lodash';
import { ImageAttributes } from '../../Models/Api/image.model';
import { AxiosResponseTypedData } from '../../Models/AxiosResponse';
import useFetch from '../../Services/Hooks/useFetch';
import GalleryItem from '../../Components/GalleryItem/GalleryItem';
import FileUploadButton from '../../Components/FileUploadButton/FileUploadButton';

function Gallery() {
  const [fetchedData, setFetchedData] = useState<
    AxiosResponseTypedData<ImageAttributes> | object
  >({});
  const { response, isLoading, apiHandler, error } = useFetch();
  useEffect(() => {
    apiHandler({
      method: 'get',
      url: 'image',
    });
  }, []);
  useEffect(() => {
    if (response) {
      setFetchedData(response);
    }
  }, [response]);

  const onAdd = (newItem: any) => {
    setFetchedData((prev) => {
      if ('data' in prev && prev.data && _.isArray(prev.data)) {
        prev.data.unshift(newItem);
        return { ...prev, data: prev.data };
      }
      return prev;
    });
  };

  const onDelete = (id: string) => {
    setFetchedData((prev) => {
      if ('data' in prev && prev.data && _.isArray(prev.data)) {
        return { ...prev, data: prev.data.filter((image) => image.id !== id) };
      }
      return prev;
    });
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <CircularProgress />
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
      <Box
        sx={{ marginBottom: 2, display: 'flex', justifyContent: 'flex-end' }}
      >
        <FileUploadButton onAdd={onAdd} />
      </Box>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        {'data' in fetchedData &&
          fetchedData.data &&
          _.isArray(fetchedData.data) &&
          fetchedData.data.map((item) => (
            <Grid key={item.id}>
              <GalleryItem image={item} onDelete={onDelete} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

export default Gallery;
