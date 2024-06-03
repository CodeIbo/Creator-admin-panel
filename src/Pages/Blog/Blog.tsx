import { Box, Button, Container, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import {
  AxiosErrorData,
  AxiosResponseTypedArray,
} from '../../Models/AxiosResponse';
import { BlogAttributes } from '../../Models/Api/blog.model';
import useAxiosPrivate from '../../Services/Hooks/useAxiosPrivate';
import fetchAxios from '../../Services/Api/fetchAxios';
import LoadingState from '../../Components/LoadingState/LoadingState';
import LinkButton from '../../Components/LinkButton/LinkButton';
import TableGenerator, {
  Column,
} from '../../Components/TableUI/TableGenerator';
import { useAlert } from '../../Services/Context/Alert/AlertProvider';

function Blogs() {
  const axiosPrivate = useAxiosPrivate();
  const { triggerAlert } = useAlert();
  const queryClient = useQueryClient();

  const blogQuery = useQuery<
    AxiosResponseTypedArray<BlogAttributes>,
    AxiosError
  >({
    queryKey: ['blog'],
    queryFn: async () =>
      fetchAxios({ axios: axiosPrivate, method: 'get', url: 'blog' }),
  });

  const pageDelete = useMutation(
    (id: string) =>
      fetchAxios({
        axios: axiosPrivate,
        url: `blog/${id}`,
        method: 'delete',
      }),
    {
      onSuccess: () => {
        triggerAlert('Item Deleted', 'success');
        queryClient.invalidateQueries(['blog'], { exact: true });
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

  if (blogQuery.isLoading) return <LoadingState />;

  if (blogQuery.isError) {
    return <Typography component="h3">{blogQuery.error.message}</Typography>;
  }

  const buttons = (row: BlogAttributes) => {
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
            pageDelete.mutate(row.id);
          }}
        >
          Delete
        </Button>
      </Box>
    );
  };

  const linkToArticles = (row: BlogAttributes) => (
    <Link to={row.blog_key}>Articles</Link>
  );

  const columns: Column<BlogAttributes>[] = [
    { header: 'Blog Name', accessor: 'name' },
    { header: 'Articles', accessor: 'article_url', render: linkToArticles },
    { header: 'Blog Url', accessor: 'url' },
    { header: 'Actions', accessor: 'action', render: buttons },
  ];

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
      <TableGenerator<BlogAttributes>
        data={blogQuery.data?.data || []}
        includeKeys={['name', 'url']}
        columns={columns}
      />
    </Container>
  );
}

export default Blogs;
