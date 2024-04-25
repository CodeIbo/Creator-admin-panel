import { useEffect, useState } from 'react';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import DynamicTable from '../../Components/DynamicTable/DynamicTable';
import useFetch from '../../Services/Hooks/useFetch';
import { AxiosResponseTypedData } from '../../Models/AxiosResponse';
import { BlogAttributes } from '../../Models/Api/blog.model';

function Blogs() {
  const [fetchedData, setFetchedData] = useState<
    object | AxiosResponseTypedData<BlogAttributes>
  >({});
  const { response, isLoading, apiHandler, error } = useFetch();
  useEffect(() => {
    apiHandler({
      method: 'get',
      url: 'blog',
    });
  }, []);
  useEffect(() => {
    if (response) {
      setFetchedData(response);
    }
  }, [response]);

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
      {'data' in fetchedData && (
        <DynamicTable data={fetchedData.data} dataName="blog" />
      )}
    </Container>
  );
}

export default Blogs;
