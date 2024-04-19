import { useEffect, useState } from 'react';
import { Box, CircularProgress, Container } from '@mui/material';
import DynamicTable from '../../Components/DynamicTable/DynamicTable';
import useFetch from '../../Services/Hooks/useFetch';
import { AxiosResponseTypedData } from '../../Models/AxiosResponse';
import { BlogAttributes } from '../../Models/Api/blog.model';

function Blogs() {
  const [fetchedData, setFetchedData] = useState<
    object | AxiosResponseTypedData<BlogAttributes>
  >({});
  const { response, isLoading, apiHandler } = useFetch();
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
  }, [response, fetchedData]);

  return (
    <Container>
      {!isLoading && 'data' in fetchedData && (
        <DynamicTable data={fetchedData.data} dataName="blog" />
      )}
      {isLoading && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
}

export default Blogs;
