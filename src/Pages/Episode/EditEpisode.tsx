import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import { isArray } from 'lodash';
import Form from '../../Components/Form/Form';
import useFetch from '../../Services/Hooks/useFetch';
import { EpisodeAttributes } from '../../Models/Api/episode.model';
import { AxiosResponseTypedData } from '../../Models/AxiosResponse';

function EditEpisodePost() {
  const { id } = useParams();
  const [fetchedData, setFetchedData] = useState<
    AxiosResponseTypedData<EpisodeAttributes> | object
  >({});
  const { response, isLoading, apiHandler } = useFetch();
  useEffect(() => {
    apiHandler({
      method: 'get',
      url: `episode/${id}`,
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
        !isArray(fetchedData.data) && (
          <Form data={fetchedData?.data} dataType="episode" mode="edit" />
        )}
      {isLoading && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
}
export default EditEpisodePost;
