import Container from '@mui/material/Container';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { UserAttributes } from '../../Models/Api/users.model';
import useAxiosPrivate from '../../Services/Hooks/useAxiosPrivate';
import { useAlert } from '../../Services/Context/Alert/AlertProvider';
import FormGenerator from '../../Components/FormsUI/FormGenerator';
import { editUsersValidation } from '../../Api/Validation/users.validation';
import {
  AxiosResponseTypedObject,
  AxiosErrorData,
} from '../../Models/AxiosResponse';
import fetchAxios from '../../Services/Api/fetchAxios';
import fields from '../../Services/Helpers/fieldsTypeSave';
import LoadingState from '../../Components/LoadingState/LoadingState';

function EditUser() {
  const { id } = useParams();
  const { triggerAlert } = useAlert();
  const axiosPrivate = useAxiosPrivate();
  const navigation = useNavigate();

  type EditUserAttributes = Partial<
    Omit<UserAttributes, 'id' | 'refresh_token' | 'created_at'>
  >;

  const userQuery = useQuery<
    AxiosResponseTypedObject<UserAttributes>,
    AxiosErrorData
  >({
    queryKey: ['users', id],
    queryFn: () =>
      fetchAxios({
        axios: axiosPrivate,
        url: `users/${id}`,
        method: 'get',
      }),
    enabled: typeof id === 'string',
    onError(err) {
      triggerAlert(err.message, 'error');
    },
    onSuccess(data) {
      const dataCopy = { ...data };
      dataCopy.data.user_password = '';
      return dataCopy;
    },
  });

  const userMutation = useMutation(
    (values: EditUserAttributes) =>
      fetchAxios({
        axios: axiosPrivate,
        url: `users/${id}`,
        method: 'put',
        data: values,
      }),
    {
      onMutate(variables) {
        const copyVariables = { ...variables };
        if (copyVariables.user_password) {
          if (copyVariables.user_password.length > 0) {
            return copyVariables;
          }
          delete copyVariables.user_password;
          return copyVariables;
        }
        return variables;
      },

      onSuccess: () => {
        triggerAlert('User updated', 'success');
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

  if (userQuery.isLoading) return <LoadingState />;

  return (
    <Container>
      <FormGenerator<UserAttributes>
        validationSchema={editUsersValidation}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          userMutation.mutate(values);
        }}
        fields={fields('users')}
        fetchedValues={userQuery.data?.data}
        extraData={{
          dropdown: [
            {
              value: 'admin',
              text: 'admin',
            },
            {
              value: 'editor',
              text: 'editor',
            },
            {
              value: 'user',
              text: 'user',
            },
          ],
        }}
      />
    </Container>
  );
}
export default EditUser;
