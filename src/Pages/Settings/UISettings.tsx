import { Box, Typography } from '@mui/material';
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
import { UISettingsAttributes } from '../../Models/Api/uiSettings.model';

function UISettings() {
  const axiosPrivate = useAxiosPrivate();
  const settingsQuery = useQuery<
    AxiosResponseTypedArray<UISettingsAttributes>,
    AxiosErrorData
  >({
    queryKey: ['settings', 'ui'],
    queryFn: async () =>
      fetchAxios({
        axios: axiosPrivate,
        method: 'get',
        url: 'ui-settings/panel',
      }),
  });

  const buttons = (row: UISettingsAttributes) => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >
        <LinkButton
          to={`ui/edit/${row.id}`}
          buttonText="Edit"
          variant="contained"
        />
      </Box>
    );
  };

  const columns: Column<UISettingsAttributes>[] = [
    { header: 'Type of config', accessor: 'element_key' },
    { header: 'Type of page', accessor: 'element_type' },
    { header: 'Actions', accessor: 'action', render: buttons },
  ];

  if (settingsQuery.isLoading) return <LoadingState />;
  if (settingsQuery.isError)
    return (
      <Typography component="h3">{settingsQuery.error.message}</Typography>
    );

  return (
    <TableGenerator<UISettingsAttributes>
      data={settingsQuery.data?.data || []}
      includeKeys={['element_key', 'element_type']}
      columns={columns}
    />
  );
}

export default UISettings;
