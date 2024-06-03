import Container from '@mui/material/Container';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import { PodcastAttributes } from '../../Models/Api/podcast.model';
import { useAlert } from '../../Services/Context/Alert/AlertProvider';
import useAxiosPrivate from '../../Services/Hooks/useAxiosPrivate';
import { AxiosErrorData } from '../../Models/AxiosResponse';
import fetchAxios from '../../Services/Api/fetchAxios';
import FormGenerator from '../../Components/FormsUI/FormGenerator';
import fields from '../../Services/Helpers/fieldsTypeSave';
import podcastValidation from '../../Api/Validation/podcast.validation';

type NewPodcastAttributes = Omit<PodcastAttributes, 'page_category' | 'id'>;

function NewPodcast() {
  const axiosPrivate = useAxiosPrivate();
  const { triggerAlert } = useAlert();
  const navigation = useNavigate();
  const queryClient = useQueryClient();
  const podcastMutation = useMutation(
    (values: NewPodcastAttributes) =>
      fetchAxios({
        axios: axiosPrivate,
        method: 'post',
        url: 'podcast',
        data: { ...values, page_category: 'podcast' },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['podcast'], { exact: true });
        triggerAlert('Podcast added', 'success');
        navigation('..');
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
  return (
    <Container>
      <FormGenerator<NewPodcastAttributes>
        validationSchema={podcastValidation}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          podcastMutation.mutate(values);
        }}
        fields={fields('podcast')}
        buttons={{ first_button: { navigateTO: '..' } }}
      />
    </Container>
  );
}
export default NewPodcast;
