import Container from '@mui/material/Container';

import { useNavigate, useParams } from 'react-router-dom';

import { useMutation, useQuery } from 'react-query';
import {
  AxiosErrorData,
  AxiosResponseTypedObject,
} from '../../Models/AxiosResponse';
import { PodcastAttributes } from '../../Models/Api/podcast.model';
import FormGenerator from '../../Components/FormsUI/FormGenerator';

import podcastValidation from '../../Api/Validation/podcast.validation';
import fields from '../../Services/Helpers/fieldsTypeSave';
import fetchAxios from '../../Services/Api/fetchAxios';
import { useAlert } from '../../Services/Context/Alert/AlertProvider';
import useAxiosPrivate from '../../Services/Hooks/useAxiosPrivate';
import LoadingState from '../../Components/LoadingState/LoadingState';

type EditPodcastAttributes = Partial<
  Omit<PodcastAttributes, 'id' | 'page_category'>
>;

function EditPodcast() {
  const { id } = useParams();
  const { triggerAlert } = useAlert();
  const axiosPrivate = useAxiosPrivate();
  const navigation = useNavigate();

  const podcastQuery = useQuery<
    AxiosResponseTypedObject<PodcastAttributes>,
    AxiosErrorData
  >({
    queryKey: ['podcast', id],
    queryFn: () =>
      fetchAxios({
        axios: axiosPrivate,
        url: `podcast/${id}`,
        method: 'get',
      }),
    enabled: typeof id === 'string',
    onError(err) {
      triggerAlert(err.message, 'error');
    },
  });
  const podcastMutation = useMutation(
    (values: EditPodcastAttributes) =>
      fetchAxios({
        axios: axiosPrivate,
        url: `podcast/${id}`,
        method: 'put',
        data: values,
      }),
    {
      onSuccess: () => {
        triggerAlert('Podcast updated', 'success');
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

  if (podcastQuery.isLoading) return <LoadingState />;

  return (
    <Container>
      <FormGenerator<PodcastAttributes>
        validationSchema={podcastValidation}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          podcastMutation.mutate(values);
        }}
        fields={fields('podcast')}
        fetchedValues={podcastQuery.data?.data}
      />
    </Container>
  );
}
export default EditPodcast;
