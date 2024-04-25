import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import { isArray } from 'lodash';
import Form from '../../Components/Form/Form';
import useFetch from '../../Services/Hooks/useFetch';
import { AxiosResponseTypedData } from '../../Models/AxiosResponse';
import { PodcastAttributes } from '../../Models/Api/podcast.model';

function EditPodcast() {
  const { id } = useParams();
  const [fetchedData, setFetchedData] = useState<
    AxiosResponseTypedData<PodcastAttributes> | object
  >({});
  const { response, isLoading, error, apiHandler } = useFetch();
  useEffect(() => {
    apiHandler({
      method: 'get',
      url: `podcast/${id}`,
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
          <Form data={fetchedData?.data} dataType="podcast" mode="edit" />
        )}
      {isLoading && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
}
export default EditPodcast;
