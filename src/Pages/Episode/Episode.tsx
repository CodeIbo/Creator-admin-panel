import { useEffect, useState } from 'react';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import DynamicTable from '../../Components/DynamicTable/DynamicTable';
import useFetch from '../../Services/Hooks/useFetch';
import { EpisodeAttributes } from '../../Models/Api/episode.model';
import { AxiosResponseTypedData } from '../../Models/AxiosResponse';

function Episode() {
  const [fetchedData, setFetchedData] = useState<
    AxiosResponseTypedData<EpisodeAttributes> | object
  >({});
  const { response, isLoading, error, apiHandler } = useFetch();
  const { componentKey } = useParams();
  useEffect(() => {
    apiHandler({
      method: 'get',
      url: `episode`,
      config: {
        params: {
          podcast_key: componentKey,
        },
      },
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
        <DynamicTable data={fetchedData?.data} dataName="episode" />
      )}
    </Container>
  );
}

export default Episode;
