import { useEffect, useState } from 'react';
import { Box, CircularProgress, Container } from '@mui/material';
import DynamicTable from '../../Components/DynamicTable/DynamicTable';
import useFetch from '../../Services/Hooks/useFetch';

function Blog() {
  const [fetchedData, setFetchedData] = useState<any>({});
  const { response, isLoading, error, apiHandler } = useFetch();
  useEffect(() => {
    apiHandler({
      method: 'get',
      url: 'blog',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (response !== null) {
      setFetchedData(response);
      console.log(fetchedData.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, fetchedData]);

  return (
    <Container>
      {!isLoading && fetchedData?.data && (
        <DynamicTable data={fetchedData?.data} dataName="blog" />
      )}
      {isLoading && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
}

export default Blog;
