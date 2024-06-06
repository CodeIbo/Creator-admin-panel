import { Box, Container, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import {
  AxiosErrorData,
  AxiosResponseTypedArray,
} from '../../Models/AxiosResponse';
import useAxiosPrivate from '../../Services/Hooks/useAxiosPrivate';
import fetchAxios from '../../Services/Api/fetchAxios';
import LoadingState from '../../Components/LoadingState/LoadingState';
import LinkButton from '../../Components/LinkButton/LinkButton';
import TableGenerator, {
  Column,
} from '../../Components/TableUI/TableGenerator';
import { SettingsAttributes } from '../../Models/Api/settings.model';

function Settings() {
  const axiosPrivate = useAxiosPrivate();
  const settingsQuery = useQuery<
    AxiosResponseTypedArray<SettingsAttributes>,
    AxiosErrorData
  >({
    queryKey: ['settings'],
    queryFn: async () =>
      fetchAxios({ axios: axiosPrivate, method: 'get', url: 'settings' }),
  });

  const buttons = (row: SettingsAttributes) => {
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
      </Box>
    );
  };

  const columns: Column<SettingsAttributes>[] = [
    { header: 'Company ID', accessor: 'id' },
    { header: 'Company Name', accessor: 'company_name' },
    { header: 'Actions', accessor: 'action', render: buttons },
  ];

  if (settingsQuery.isLoading) return <LoadingState />;
  if (settingsQuery.isError)
    return (
      <Typography component="h3">{settingsQuery.error.message}</Typography>
    );

  return (
    <Container>
      <TableGenerator<SettingsAttributes>
        data={settingsQuery.data?.data || []}
        includeKeys={['id', 'company_name']}
        columns={columns}
      />
    </Container>
  );
}

export default Settings;
