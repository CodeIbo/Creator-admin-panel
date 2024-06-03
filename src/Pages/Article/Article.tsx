import { Box, Button, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import {
  AxiosErrorData,
  AxiosResponseTypedArray,
} from '../../Models/AxiosResponse';
import { ArticlesAttributes } from '../../Models/Api/article.model';
import useAxiosPrivate from '../../Services/Hooks/useAxiosPrivate';
import fetchAxios from '../../Services/Api/fetchAxios';
import LoadingState from '../../Components/LoadingState/LoadingState';
import TableGenerator, {
  Column,
} from '../../Components/TableUI/TableGenerator';
import LinkButton from '../../Components/LinkButton/LinkButton';
import { useAlert } from '../../Services/Context/Alert/AlertProvider';

function Article() {
  const { componentKey } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { triggerAlert } = useAlert();

  const articleQuery = useQuery<
    AxiosResponseTypedArray<ArticlesAttributes>,
    AxiosErrorData
  >({
    queryKey: ['article', componentKey],
    queryFn: async () =>
      fetchAxios({
        axios: axiosPrivate,
        url: 'article',
        method: 'get',
        config: {
          params: {
            blog_key: componentKey,
          },
        },
      }),
  });

  const articleDelete = useMutation(
    (id: string) =>
      fetchAxios({
        axios: axiosPrivate,
        url: `article/${id}`,
        method: 'delete',
      }),
    {
      onSuccess: () => {
        triggerAlert('Item Deleted', 'success');
        queryClient.invalidateQueries(['article', componentKey], {
          exact: true,
        });
      },
      onError: (err: AxiosErrorData) => {
        if (err?.response?.data) {
          triggerAlert(err?.response?.statusText, 'error');
        } else {
          triggerAlert(err?.message, 'error');
        }
      },
    }
  );

  const buttons = (row: ArticlesAttributes) => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >
        <LinkButton
          to={`edit/${row.id}`}
          buttonText="Edit"
          variant="contained"
        />
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            articleDelete.mutate(row.id);
          }}
        >
          Delete
        </Button>
      </Box>
    );
  };

  const columns: Column<ArticlesAttributes>[] = [
    { header: 'Page Name', accessor: 'article_title' },
    { header: 'Page Url', accessor: 'url' },
    { header: 'Date', accessor: 'date' },
    { header: 'Actions', accessor: 'action', render: buttons },
  ];

  if (articleQuery.isLoading) return <LoadingState />;
  if (articleQuery.isError)
    return <Typography component="h3">{articleQuery.error.message}</Typography>;

  return (
    <Container>
      <LinkButton
        variant="contained"
        sx={{
          margin: '0 0 2rem auto',
          display: 'block',
          maxWidth: '10rem',
          textAlign: 'center',
        }}
        to="new"
        buttonText="ADD NEW"
      />
      <TableGenerator<ArticlesAttributes>
        data={articleQuery.data?.data || []}
        includeKeys={['article_title', 'url', 'date']}
        columns={columns}
      />
    </Container>
  );
}

export default Article;
