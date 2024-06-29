import { Container, Typography } from '@mui/material';
import { useQuery, useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router';
import { UISettingsAttributes } from '../../Models/Api/uiSettings.model';
import FormGenerator from '../../Components/FormsUI/FormGenerator';
import uiSettingsValidation from '../../Api/Validation/uiSettings.validation';
import LoadingState from '../../Components/LoadingState/LoadingState';
import {
  AxiosResponseTypedObject,
  AxiosErrorData,
} from '../../Models/AxiosResponse';
import fetchAxios from '../../Services/Api/fetchAxios';
import { useAlert } from '../../Services/Context/Alert/AlertProvider';
import useAxiosPrivate from '../../Services/Hooks/useAxiosPrivate';
import fields from '../../Services/Helpers/fieldsTypeSave';

type EditUISettingsAtributes = Partial<
  Pick<UISettingsAttributes, 'element_value' | 'element_css'>
>;

function EditUISettings() {
  const { triggerAlert } = useAlert();
  const axiosPrivate = useAxiosPrivate();
  const navigation = useNavigate();
  const { id } = useParams();

  const uiSettingsQuery = useQuery<
    AxiosResponseTypedObject<UISettingsAttributes>,
    AxiosErrorData
  >({
    queryKey: ['settings', 'ui', id],
    queryFn: () =>
      fetchAxios({
        axios: axiosPrivate,
        url: `settings/ui/panel/${id}`,
        method: 'get',
      }),
    enabled: typeof id === 'string',
    onError(err) {
      triggerAlert(err.message, 'error');
    },
  });

  const uiSettingMutation = useMutation(
    (values: EditUISettingsAtributes) =>
      fetchAxios({
        axios: axiosPrivate,
        url: `ui-settings/panel/${id}`,
        method: 'put',
        data: values,
      }),
    {
      onSuccess: () => {
        triggerAlert('Settings updated', 'success');
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
  if (uiSettingsQuery.isLoading) return <LoadingState />;

  return (
    <Container>
      <Typography variant="h4" mb={3} textAlign="center">
        Element edited for {uiSettingsQuery.data?.data.element_key} in (
        {uiSettingsQuery.data?.data.element_type})
      </Typography>
      <FormGenerator<UISettingsAttributes>
        validationSchema={uiSettingsValidation}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          uiSettingMutation.mutate(values);
        }}
        fields={fields('ui-settings')}
        fetchedValues={uiSettingsQuery.data?.data}
        buttons={{
          first_button: { navigateTO: '../../../' },
        }}
      />
    </Container>
  );
}

export default EditUISettings;
