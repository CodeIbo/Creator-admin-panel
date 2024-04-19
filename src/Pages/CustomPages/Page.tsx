import { useEffect, useState } from 'react';
import { Box, CircularProgress, Container } from '@mui/material';
import DynamicTable from '../../Components/DynamicTable/DynamicTable';
import useFetch from '../../Services/Hooks/useFetch';
import { AxiosResponseTypedData } from '../../Models/AxiosResponse';
import { CustomPageAttributes } from '../../Models/Api/customPage.model';

function Pages() {
  const [fetchedData, setFetchedData] = useState<
    AxiosResponseTypedData<CustomPageAttributes> | object
  >({});
  const { response, isLoading, apiHandler } = useFetch();
  useEffect(() => {
    apiHandler({
      method: 'get',
      url: 'pages',
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
        <DynamicTable data={fetchedData?.data} dataName="pages" />
      )}
      {isLoading && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
}

export default Pages;
