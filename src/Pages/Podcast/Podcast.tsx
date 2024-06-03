import { Box, Button, Container, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { PodcastAttributes } from '../../Models/Api/podcast.model';
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
import { useAlert } from '../../Services/Context/Alert/AlertProvider';

function Podcast() {
  const axiosPrivate = useAxiosPrivate();
  const { triggerAlert } = useAlert();
  const queryClient = useQueryClient();
  const podcastQuery = useQuery<
    AxiosResponseTypedArray<PodcastAttributes>,
    AxiosErrorData
  >({
    queryKey: ['podcast'],
    queryFn: async () =>
      fetchAxios({ axios: axiosPrivate, method: 'get', url: 'podcast' }),
  });
  const podcastDelete = useMutation(
    (id: string) =>
      fetchAxios({
        axios: axiosPrivate,
        url: `podcast/${id}`,
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

  const buttons = (row: PodcastAttributes) => {
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
            podcastDelete.mutate(row.id);
          }}
        >
          Delete
        </Button>
      </Box>
    );
  };

  const linkToEpisode = (row: PodcastAttributes) => (
    <Link to={row.podcast_key}>Episodes</Link>
  );

  const columns: Column<PodcastAttributes>[] = [
    { header: 'Podcast Name', accessor: 'name' },
    { header: 'Episodes', accessor: 'episode_url', render: linkToEpisode },
    { header: 'Podcast Url', accessor: 'url' },
    { header: 'Actions', accessor: 'action', render: buttons },
  ];

  if (podcastQuery.isLoading) return <LoadingState />;
  if (podcastQuery.isError)
    return <Typography component="h3">{podcastQuery.error.message}</Typography>;

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
      <TableGenerator<PodcastAttributes>
        data={podcastQuery.data?.data || []}
        includeKeys={['name', 'url']}
        columns={columns}
      />
    </Container>
  );
}

export default Podcast;
