import { useEffect, useState } from 'react';
import { Box, CircularProgress, Container } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import DynamicTable from '../../Components/DynamicTable/DynamicTable';
import useFetch from '../../Services/Hooks/useFetch';
import DynamicObject from '../../Models/DynamicObject';
import { AxiosResponseTypedData } from '../../Models/AxiosResponse';
import { ArticlesAttributes } from '../../Models/Api/article.model';

function Article() {
  const [fetchedData, setFetchedData] = useState<
    AxiosResponseTypedData<ArticlesAttributes> | object
  >({});
  const { response, isLoading, error, apiHandler } = useFetch();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    apiHandler({
      method: 'get',
      url: `article`,
      config: {
        params: {
          blog_key: searchParams.get('key'),
        },
      },
    });
  }, []);
  useEffect(() => {
    if (response) {
      setFetchedData(response);
    }
  }, [response, fetchedData, error]);
  return (
    <Container>
      {!isLoading && 'data' in fetchedData && (
        <DynamicTable data={fetchedData?.data} dataName="article" />
      )}
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
}

export default Article;
