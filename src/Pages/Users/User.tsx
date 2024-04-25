import { useEffect, useState } from 'react';
import { Box, CircularProgress, Container } from '@mui/material';
import DynamicTable from '../../Components/DynamicTable/DynamicTable';
import useFetch from '../../Services/Hooks/useFetch';
import { AxiosResponseTypedData } from '../../Models/AxiosResponse';
import { UserAttributes } from '../../Models/Api/users.model';

function Users() {
  const [fetchedData, setFetchedData] = useState<
    AxiosResponseTypedData<UserAttributes> | object
  >({});
  const { response, isLoading, apiHandler } = useFetch();
  useEffect(() => {
    apiHandler({
      method: 'get',
      url: 'users',
    });
  }, []);
  useEffect(() => {
    if (response !== null) {
      setFetchedData(response);
    }
  }, [response, fetchedData]);

  return (
    <Container>
      {!isLoading && 'data' in fetchedData && (
        <DynamicTable data={fetchedData?.data} dataName="users" />
      )}
      {isLoading && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
}

export default Users;
