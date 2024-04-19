import { useEffect, useState } from 'react';
import { Box, CircularProgress, Container } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import DynamicTable from '../../Components/DynamicTable/DynamicTable';
import useFetch from '../../Services/Hooks/useFetch';
import { EpisodeAttributes } from '../../Models/Api/episode.model';
import { AxiosResponseTypedData } from '../../Models/AxiosResponse';

function Episode() {
  const [fetchedData, setFetchedData] = useState<
    AxiosResponseTypedData<EpisodeAttributes> | object
  >({});
  const { response, isLoading, error, apiHandler } = useFetch();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    apiHandler({
      method: 'get',
      url: `episode`,
      config: {
        params: {
          podcast_key: searchParams.get('key'),
        },
      },
    });
  }, []);
  useEffect(() => {
    if (response) {
      setFetchedData(response);
    }
  }, [response, fetchedData, error]);

  return (
    <Container>
      {!isLoading && 'data' in fetchedData && (
        <DynamicTable data={fetchedData?.data} dataName="episode" />
      )}
      {isLoading && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
}

export default Episode;
