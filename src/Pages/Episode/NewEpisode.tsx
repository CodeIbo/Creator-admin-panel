import Container from '@mui/material/Container';

import { useMutation, useQueryClient } from 'react-query';
import { useParams, useNavigate } from 'react-router';
import { EpisodeAttributes } from '../../Models/Api/episode.model';
import { useAlert } from '../../Services/Context/Alert/AlertProvider';
import useAxiosPrivate from '../../Services/Hooks/useAxiosPrivate';
import FormGenerator from '../../Components/FormsUI/FormGenerator';
import episodeValidation from '../../Api/Validation/episode.validation';
import fields from '../../Services/Helpers/fieldsTypeSave';
import fetchAxios from '../../Services/Api/fetchAxios';
import { AxiosErrorData } from '../../Models/AxiosResponse';

type NewEpisodeAtributes = Omit<EpisodeAttributes, 'id' | 'podcast_key'>;

function NewEpisodePost() {
  const { componentKey } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const { triggerAlert } = useAlert();
  const navigation = useNavigate();
  const queryClient = useQueryClient();

  const episodeMutation = useMutation(
    (values: NewEpisodeAtributes) =>
      fetchAxios({
        axios: axiosPrivate,
        method: 'post',
        url: 'episode',
        data: { ...values, podcast_key: componentKey },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['episode', componentKey], {
          exact: true,
        });
        triggerAlert('New Episode', 'success');
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
      <FormGenerator<EpisodeAttributes>
        validationSchema={episodeValidation}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          episodeMutation.mutate(values);
        }}
        fields={fields('episode')}
        buttons={{ first_button: { navigateTO: '..' } }}
      />
    </Container>
  );
}
export default NewEpisodePost;
