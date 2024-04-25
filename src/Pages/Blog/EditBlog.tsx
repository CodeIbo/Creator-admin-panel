import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isArray } from 'lodash';
import { Typography, CircularProgress, Box, Container } from '@mui/material';

import Form from '../../Components/Form/Form';
import useFetch from '../../Services/Hooks/useFetch';
import { BlogAttributes } from '../../Models/Api/blog.model';
import { AxiosResponseTypedData } from '../../Models/AxiosResponse';

function EditBlog() {
  const { id } = useParams();
  const [fetchedData, setFetchedData] = useState<
    AxiosResponseTypedData<BlogAttributes> | object
  >({});
  const { response, isLoading, apiHandler, error } = useFetch();
  useEffect(() => {
    apiHandler({
      method: 'get',
      url: `blog/${id}`,
    });
  }, []);

  useEffect(() => {
    if (response) {
      setFetchedData(response);
    }
  }, [response, fetchedData]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return <Typography component="h3">{error.message}</Typography>;
  }

  return (
    <Container>
      {!isLoading &&
        'data' in fetchedData &&
        fetchedData.data &&
        !isArray(fetchedData.data) && (
          <Form data={fetchedData?.data} dataType="blog" mode="edit" />
        )}
      {isLoading && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
}
export default EditBlog;
