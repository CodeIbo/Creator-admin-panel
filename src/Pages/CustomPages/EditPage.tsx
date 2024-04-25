import { useEffect, useState } from 'react';
import { Typography, Box, Container, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { isArray } from 'lodash';

import Form from '../../Components/Form/Form';
import useFetch from '../../Services/Hooks/useFetch';
import { CustomPageAttributes } from '../../Models/Api/customPage.model';
import { AxiosResponseTypedData } from '../../Models/AxiosResponse';

function EditPage() {
  const { id } = useParams();
  const [fetchedData, setFetchedData] = useState<
    AxiosResponseTypedData<CustomPageAttributes> | object
  >({});
  const { response, isLoading, apiHandler, error } = useFetch();
  useEffect(() => {
    apiHandler({
      method: 'get',
      url: `pages/${id}`,
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
      {'data' in fetchedData &&
        fetchedData.data &&
        !isArray(fetchedData.data) && (
          <Form data={fetchedData?.data} dataType="pages" mode="edit" />
        )}
    </Container>
  );
}
export default EditPage;
