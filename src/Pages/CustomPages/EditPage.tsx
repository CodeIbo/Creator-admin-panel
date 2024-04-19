import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
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
  const { response, isLoading, apiHandler } = useFetch();
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
  }, [response, fetchedData]);

  return (
    <Container>
      {!isLoading &&
        'data' in fetchedData &&
        fetchedData.data &&
        !isArray(fetchedData.data) && (
          <Form data={fetchedData?.data} dataType="pages" mode="edit" />
        )}
      {isLoading && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
}
export default EditPage;
