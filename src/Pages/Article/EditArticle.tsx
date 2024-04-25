import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isArray } from 'lodash';
import { Typography, CircularProgress, Box, Container } from '@mui/material';

import Form from '../../Components/Form/Form';
import useFetch from '../../Services/Hooks/useFetch';
import { ArticlesAttributes } from '../../Models/Api/article.model';
import { AxiosResponseTypedData } from '../../Models/AxiosResponse';

function EditArticlePost() {
  const { id } = useParams();
  const [fetchedData, setFetchedData] = useState<
    AxiosResponseTypedData<ArticlesAttributes> | object
  >({});
  const { response, isLoading, error, apiHandler } = useFetch();
  useEffect(() => {
    apiHandler({
      method: 'get',
      url: `article/${id}`,
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
          <Form data={fetchedData.data} dataType="article" mode="edit" />
        )}
    </Container>
  );
}
export default EditArticlePost;
