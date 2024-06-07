import Container from '@mui/material/Container';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import { UserAttributes } from '../../Models/Api/users.model';
import FormGenerator from '../../Components/FormsUI/FormGenerator';
import { useAlert } from '../../Services/Context/Alert/AlertProvider';
import useAxiosPrivate from '../../Services/Hooks/useAxiosPrivate';
import fields from '../../Services/Helpers/fieldsTypeSave';
import fetchAxios from '../../Services/Api/fetchAxios';
import { AxiosErrorData } from '../../Models/AxiosResponse';
import { newUsersValidation } from '../../Api/Validation/users.validation';

type NewUserAttributes = Omit<
  UserAttributes,
  'id' | 'refresh_token' | 'created_at'
>;

function NewUser() {
  const axiosPrivate = useAxiosPrivate();
  const { triggerAlert } = useAlert();
  const navigation = useNavigate();
  const queryClient = useQueryClient();

  const userMutation = useMutation(
    (values: NewUserAttributes) =>
      fetchAxios({
        axios: axiosPrivate,
        method: 'post',
        url: 'users',
        data: values,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users'], { exact: true });
        triggerAlert('User added', 'success');
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
      <FormGenerator<NewUserAttributes>
        validationSchema={newUsersValidation}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          userMutation.mutate(values);
        }}
        fields={fields('users')}
        buttons={{ first_button: { navigateTO: '..' } }}
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
export default NewUser;
