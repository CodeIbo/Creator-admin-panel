import { Box, Button, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import { useMutation, useQuery, useQueryClient } from 'react-query';
import { EpisodeAttributes } from '../../Models/Api/episode.model';
import {
  AxiosErrorData,
  AxiosResponseTypedArray,
} from '../../Models/AxiosResponse';
import useAxiosPrivate from '../../Services/Hooks/useAxiosPrivate';
import LoadingState from '../../Components/LoadingState/LoadingState';
import fetchAxios from '../../Services/Api/fetchAxios';
import LinkButton from '../../Components/LinkButton/LinkButton';
import TableGenerator, {
  Column,
} from '../../Components/TableUI/TableGenerator';
import { useAlert } from '../../Services/Context/Alert/AlertProvider';

function Episode() {
  const { componentKey } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const { triggerAlert } = useAlert();
  const queryClient = useQueryClient();

  const episodeQuery = useQuery<
    AxiosResponseTypedArray<EpisodeAttributes>,
    AxiosErrorData
  >({
    queryKey: ['episode', componentKey],
    queryFn: async () =>
      fetchAxios({
        axios: axiosPrivate,
        method: 'get',
        url: 'episode',
        config: {
          params: {
            podcast_key: componentKey,
          },
        },
      }),
  });
  const episodeDelete = useMutation(
    (id: string) =>
      fetchAxios({
        axios: axiosPrivate,
        url: `episode/${id}`,
        method: 'delete',
      }),
    {
      onSuccess: () => {
        triggerAlert('Item Deleted', 'success');
        queryClient.invalidateQueries(['episode', componentKey], {
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

  if (episodeQuery.isLoading) return <LoadingState />;

  if (episodeQuery.isError)
    return <Typography component="h3">{episodeQuery.error.message}</Typography>;

  const buttons = (row: EpisodeAttributes) => {
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
            episodeDelete.mutate(row.id);
          }}
        >
          Delete
        </Button>
      </Box>
    );
  };

  const columns: Column<EpisodeAttributes>[] = [
    { header: 'Episode Title', accessor: 'episode_title' },
    { header: 'Episode Url', accessor: 'url' },
    { header: 'Date', accessor: 'date' },
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
      <TableGenerator<EpisodeAttributes>
        data={episodeQuery.data?.data || []}
        includeKeys={['episode_title', 'url', 'date']}
        columns={columns}
      />
    </Container>
  );
}

export default Episode;
