import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import { isArray } from 'lodash';
import Form from '../../Components/Form/Form';
import useFetch from '../../Services/Hooks/useFetch';
import { UserAttributes } from '../../Models/Api/users.model';
import { AxiosResponseTypedData } from '../../Models/AxiosResponse';

function EditUser() {
  const { id } = useParams();
  const [fetchedData, setFetchedData] = useState<
    AxiosResponseTypedData<UserAttributes> | object
  >({});
  const { response, isLoading, error, apiHandler } = useFetch();
  useEffect(() => {
    apiHandler({
      method: 'get',
      url: `users/${id}`,
    });
  }, []);

  useEffect(() => {
    if (response) {
      setFetchedData(response);
      setFetchedData((prev: any) => {
        return {
          ...prev,
          data: {
            ...prev.data,
            user_password: '',
          },
        };
      });
    }
  }, [response]);

  return (
    <Container>
      {!isLoading &&
        'data' in fetchedData &&
        fetchedData.data &&
        !isArray(fetchedData.data) && (
          <Form data={fetchedData?.data} dataType="users" mode="edit" />
        )}
      {isLoading && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
}
export default EditUser;
