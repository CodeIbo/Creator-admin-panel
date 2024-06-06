import Container from '@mui/material/Container';

import { useNavigate, useParams } from 'react-router-dom';

import { useMutation, useQuery } from 'react-query';
import {
  AxiosErrorData,
  AxiosResponseTypedObject,
} from '../../Models/AxiosResponse';
import FormGenerator from '../../Components/FormsUI/FormGenerator';

import fields from '../../Services/Helpers/fieldsTypeSave';
import fetchAxios from '../../Services/Api/fetchAxios';
import { useAlert } from '../../Services/Context/Alert/AlertProvider';
import useAxiosPrivate from '../../Services/Hooks/useAxiosPrivate';
import LoadingState from '../../Components/LoadingState/LoadingState';
import { SettingsAttributes } from '../../Models/Api/settings.model';
import settingsValidation from '../../Api/Validation/settings.validation';

type EditSettingsAtributes = Partial<
  Omit<SettingsAttributes, 'id' | 'created_at' | 'updated_at'>
>;

function EditSettings() {
  const { id } = useParams();
  const { triggerAlert } = useAlert();
  const axiosPrivate = useAxiosPrivate();
  const navigation = useNavigate();

  const settingsQuery = useQuery<
    AxiosResponseTypedObject<SettingsAttributes>,
    AxiosErrorData
  >({
    queryKey: ['settings', id],
    queryFn: () =>
      fetchAxios({
        axios: axiosPrivate,
        url: `settings/${id}`,
        method: 'get',
      }),
    enabled: typeof id === 'string',
    onError(err) {
      triggerAlert(err.message, 'error');
    },
  });
  const settingMutation = useMutation(
    (values: EditSettingsAtributes) =>
      fetchAxios({
        axios: axiosPrivate,
        url: `settings/${id}`,
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

  if (settingsQuery.isLoading) return <LoadingState />;

  return (
    <Container>
      <FormGenerator<SettingsAttributes>
        validationSchema={settingsValidation}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          settingMutation.mutate(values);
        }}
        fields={fields('settings')}
        fetchedValues={settingsQuery.data?.data}
      />
    </Container>
  );
}
export default EditSettings;
