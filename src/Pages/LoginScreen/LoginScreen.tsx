import { Container } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

import Cookies from 'js-cookie';
import useAuth from '../../Services/Hooks/useAuth';
import { useAlert } from '../../Services/Context/Alert/AlertProvider';
import loginValidation from '../../Api/Validation/login.validation';
import { Login, LoginResponse } from '../../Models/Api/login.model';
import LoadingState from '../../Components/LoadingState/LoadingState';
import fetchAxios from '../../Services/Api/fetchAxios';
import Axios from '../../Services/Api/Axios';
import FormGenerator from '../../Components/FormsUI/FormGenerator';
import fields from '../../Services/Helpers/fieldsTypeSave';
import {
  AxiosErrorData,
  AxiosResponseLoginHandler,
} from '../../Models/AxiosResponse';

function LoginScreen() {
  const navigation = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';
  const { setAuth } = useAuth();
  const { triggerAlert } = useAlert();

  const { mutate, isLoading } = useMutation(
    (values: Login) =>
      fetchAxios({
        axios: Axios,
        method: 'post',
        url: 'auth/login',
        config: { headers: { ...values }, withCredentials: true },
      }),
    {
      onSuccess: (response: AxiosResponseLoginHandler<LoginResponse>) => {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { email, token, nick_name } = response.data;
        const lastVisit = Cookies.get('lastVisit');
        setAuth({
          email,
          accessToken: token,
          nick_name,
          lastVisited: lastVisit,
        });
        localStorage.setItem('user', JSON.stringify({ email, nick_name }));
        triggerAlert('Logged', 'success');
        navigation(from, { replace: true });
      },
      onError: (err: AxiosErrorData) => {
        if (err.response?.data.message) {
          triggerAlert(err.response?.data.message, 'error');
        } else {
          triggerAlert('Login Failed', 'error');
        }
      },
    }
  );
  if (isLoading) return <LoadingState />;

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <FormGenerator<Login>
        validationSchema={loginValidation}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          mutate(values);
        }}
        fields={fields('login')}
        buttons={{
          first_button: { show: false },
          second_button: { name: 'Login' },
        }}
      />
    </Container>
  );
}

export default LoginScreen;
