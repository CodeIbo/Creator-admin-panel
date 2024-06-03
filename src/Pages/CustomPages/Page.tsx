import { Box, Button, Container, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  AxiosErrorData,
  AxiosResponseTypedArray,
} from '../../Models/AxiosResponse';
import { CustomPageAttributes } from '../../Models/Api/customPage.model';
import useAxiosPrivate from '../../Services/Hooks/useAxiosPrivate';
import fetchAxios from '../../Services/Api/fetchAxios';
import LoadingState from '../../Components/LoadingState/LoadingState';
import TableGenerator, {
  Column,
} from '../../Components/TableUI/TableGenerator';
import LinkButton from '../../Components/LinkButton/LinkButton';
import { axiosPrivate } from '../../Services/Api/Axios';
import { useAlert } from '../../Services/Context/Alert/AlertProvider';

function Pages() {
  const axiosPrivates = useAxiosPrivate();
  const { triggerAlert } = useAlert();
  const queryClient = useQueryClient();

  const pageQuery = useQuery<
    AxiosResponseTypedArray<CustomPageAttributes>,
    AxiosError
  >({
    queryKey: ['pages'],
    queryFn: async () =>
      fetchAxios({ axios: axiosPrivates, method: 'get', url: 'pages' }),
  });
  const pageDelete = useMutation(
    (id: string) =>
      fetchAxios({
        axios: axiosPrivate,
        url: `pages/${id}`,
        method: 'delete',
      }),
    {
      onSuccess: () => {
        triggerAlert('Item Deleted', 'success');
        queryClient.invalidateQueries(['pages'], { exact: true });
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

  if (pageQuery.isLoading) return <LoadingState />;

  if (pageQuery.isError)
    return <Typography component="h3">{pageQuery.error.message}</Typography>;

  const buttons = (row: CustomPageAttributes) => {
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

  const columns: Column<CustomPageAttributes>[] = [
    { header: 'Page Name', accessor: 'name' },
    { header: 'Page Url', accessor: 'url' },
    { header: 'Page Category', accessor: 'page_type' },
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
      <TableGenerator<CustomPageAttributes>
        data={pageQuery.data?.data || []}
        includeKeys={['name', 'url', 'page_type']}
        columns={columns}
      />
    </Container>
  );
}

export default Pages;
