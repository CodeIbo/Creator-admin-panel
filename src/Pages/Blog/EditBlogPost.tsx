import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import Form from '../../Components/Form/Form';
import useFetch from '../../Services/Hooks/useFetch';

function EditBlogPost() {
  const { id } = useParams();
  const [fetchedData, setFetchedData] = useState<any>({});
  const { response, isLoading, error, apiHandler } = useFetch();
  useEffect(() => {
    apiHandler({
      method: 'get',
      url: `blog/${id}`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (response !== null) {
      setFetchedData(response);
      console.log(fetchedData.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, fetchedData]);

  return (
    <Container>
      {!isLoading && fetchedData?.data && (
        <Form data={fetchedData?.data} dataType="blog" mode="edit" />
      )}
      {isLoading && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
}
export default EditBlogPost;
