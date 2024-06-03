import { Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { useMutation, useQuery } from 'react-query';
import { EpisodeAttributes } from '../../Models/Api/episode.model';
import {
  AxiosErrorData,
  AxiosResponseTypedObject,
} from '../../Models/AxiosResponse';
import { useAlert } from '../../Services/Context/Alert/AlertProvider';
import useAxiosPrivate from '../../Services/Hooks/useAxiosPrivate';
import fetchAxios from '../../Services/Api/fetchAxios';
import LoadingState from '../../Components/LoadingState/LoadingState';
import FormGenerator from '../../Components/FormsUI/FormGenerator';
import fields from '../../Services/Helpers/fieldsTypeSave';
import episodeValidation from '../../Api/Validation/episode.validation';

type EditEpisodeAtributes = Partial<Omit<EpisodeAttributes, 'id'>>;

function EditEpisodePost() {
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const { triggerAlert } = useAlert();
  const navigation = useNavigate();

  const episodeQuery = useQuery<
    AxiosResponseTypedObject<EpisodeAttributes>,
    AxiosErrorData
  >({
    queryKey: ['episode', id],
    queryFn: () =>
      fetchAxios({
        axios: axiosPrivate,
        url: `episode/${id}`,
        method: 'get',
      }),
    enabled: typeof id === 'string',
    onError(err) {
      triggerAlert(err.message, 'error');
    },
  });

  const episodeMutation = useMutation(
    (values: EditEpisodeAtributes) =>
      fetchAxios({
        axios: axiosPrivate,
        url: `episode/${id}`,
        method: 'put',
        data: values,
      }),
    {
      onSuccess: () => {
        triggerAlert('Episode updated', 'success');
        navigation(-1);
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

  return (
    <Container>
      <FormGenerator<EpisodeAttributes>
        validationSchema={episodeValidation}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          episodeMutation.mutate(values);
        }}
        fields={fields('episode')}
        fetchedValues={episodeQuery.data?.data}
      />
    </Container>
  );
}
export default EditEpisodePost;
