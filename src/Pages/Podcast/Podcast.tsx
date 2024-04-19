import { useEffect, useState } from 'react';
import { Box, CircularProgress, Container } from '@mui/material';
import { isArray } from 'lodash';
import DynamicTable from '../../Components/DynamicTable/DynamicTable';
import useFetch from '../../Services/Hooks/useFetch';
import { PodcastAttributes } from '../../Models/Api/podcast.model';
import { AxiosResponseTypedData } from '../../Models/AxiosResponse';

function Podcast() {
  const [fetchedData, setFetchedData] = useState<
    AxiosResponseTypedData<PodcastAttributes> | object
  >({});
  const { response, isLoading, apiHandler } = useFetch();
  useEffect(() => {
    apiHandler({
      method: 'get',
      url: 'podcast',
    });
  }, []);
  useEffect(() => {
    if (response) {
      setFetchedData(response);
    }
  }, [response, fetchedData]);
  return (
    <Container>
      {!isLoading &&
        'data' in fetchedData &&
        fetchedData.data &&
        isArray(fetchedData.data) && (
          <DynamicTable data={fetchedData?.data} dataName="podcast" />
        )}
      {isLoading && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
}

export default Podcast;
