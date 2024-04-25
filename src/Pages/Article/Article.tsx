import { useEffect, useState } from 'react';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import DynamicTable from '../../Components/DynamicTable/DynamicTable';
import useFetch from '../../Services/Hooks/useFetch';
import { AxiosResponseTypedData } from '../../Models/AxiosResponse';
import { ArticlesAttributes } from '../../Models/Api/article.model';

function Article() {
  const [fetchedData, setFetchedData] = useState<
    AxiosResponseTypedData<ArticlesAttributes> | object
  >({});
  const { response, isLoading, error, apiHandler } = useFetch();
  const { componentKey } = useParams();
  useEffect(() => {
    apiHandler({
      method: 'get',
      url: `article`,
      config: {
        params: {
          blog_key: componentKey,
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
        <DynamicTable data={fetchedData?.data} dataName="article" />
      )}
    </Container>
  );
}

export default Article;
