import { useNavigate, useParams } from 'react-router';
import { useMutation, useQuery } from 'react-query';
import { Container } from '@mui/material';

import socialMediaValidation from '../../Api/Validation/socialMedia.validation';
import { SocialMediaAttributes } from '../../Models/Api/socialMedia.model';
import { useAlert } from '../../Services/Context/Alert/AlertProvider';
import {
  AxiosErrorData,
  AxiosResponseTypedObject,
} from '../../Models/AxiosResponse';
import useAxiosPrivate from '../../Services/Hooks/useAxiosPrivate';
import LoadingState from '../../Components/LoadingState/LoadingState';
import FormGenerator from '../../Components/FormsUI/FormGenerator';
import fields from '../../Services/Helpers/fieldsTypeSave';
import fetchAxios from '../../Services/Api/fetchAxios';

type EditSMModel = Partial<Pick<SocialMediaAttributes, 'title' | 'link'>>;

function EditSocialMedia() {
  const { id } = useParams();
  const { triggerAlert } = useAlert();
  const navigation = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const socialMediaQuery = useQuery<
    AxiosResponseTypedObject<SocialMediaAttributes>,
    AxiosErrorData
  >({
    queryKey: ['social-media', id],
    queryFn: () =>
      fetchAxios({
        axios: axiosPrivate,
        url: `social-media/${id}`,
        method: 'get',
      }),
    enabled: typeof id === 'string',
    onError(err) {
      triggerAlert(err.message, 'error');
    },
  });

  const socialMediaMutation = useMutation(
    (values: EditSMModel) =>
      fetchAxios({
        axios: axiosPrivate,
        url: `social-media/${id}`,
        method: 'put',
        data: values,
      }),
    {
      onSuccess: () => {
        triggerAlert('Social Media updated', 'success');
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

  if (socialMediaQuery.isLoading) return <LoadingState />;

  return (
    <Container>
      <FormGenerator<SocialMediaAttributes>
        validationSchema={socialMediaValidation}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          socialMediaMutation.mutate(values);
        }}
        fields={fields('social_media')}
        fetchedValues={socialMediaQuery.data?.data}
      />
    </Container>
  );
}

export default EditSocialMedia;
