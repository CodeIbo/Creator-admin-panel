import { Box, Button, Container, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  AxiosErrorData,
  AxiosResponseTypedArray,
} from '../../Models/AxiosResponse';
import { UserAttributes } from '../../Models/Api/users.model';
import useAxiosPrivate from '../../Services/Hooks/useAxiosPrivate';
import fetchAxios from '../../Services/Api/fetchAxios';
import LoadingState from '../../Components/LoadingState/LoadingState';
import LinkButton from '../../Components/LinkButton/LinkButton';
import TableGenerator, {
  Column,
} from '../../Components/TableUI/TableGenerator';
import { useAlert } from '../../Services/Context/Alert/AlertProvider';

function Users() {
  const axiosPrivate = useAxiosPrivate();
  const { triggerAlert } = useAlert();
  const queryClient = useQueryClient();

  const userQuery = useQuery<
    AxiosResponseTypedArray<UserAttributes>,
    AxiosErrorData
  >({
    queryKey: ['users'],
    queryFn: async () =>
      fetchAxios({ axios: axiosPrivate, method: 'get', url: 'users' }),
  });

  const userDelete = useMutation(
    (id: string) =>
      fetchAxios({
        axios: axiosPrivate,
        url: `users/${id}`,
        method: 'delete',
      }),
    {
      onSuccess: () => {
        triggerAlert('Item Deleted', 'success');
        queryClient.invalidateQueries(['users'], { exact: true });
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

  if (userQuery.isLoading) return <LoadingState />;
  if (userQuery.isError)
    return <Typography component="h3">{userQuery.error.message}</Typography>;

  const buttons = (row: UserAttributes) => {
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
            userDelete.mutate(row.id);
          }}
        >
          Delete
        </Button>
      </Box>
    );
  };

  const columns: Column<UserAttributes>[] = [
    { header: 'Nick Name', accessor: 'nick_name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Access Lvl', accessor: 'access_lvl' },
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
      <TableGenerator<UserAttributes>
        data={userQuery.data?.data || []}
        includeKeys={['email', 'nick_name', 'access_lvl']}
        columns={columns}
      />
    </Container>
  );
}

export default Users;
