import Container from '@mui/material/Container';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import { MenuAttributes } from '../../Models/Api/menu.model';
import useAxiosPrivate from '../../Services/Hooks/useAxiosPrivate';
import { useAlert } from '../../Services/Context/Alert/AlertProvider';
import { UrlAttributes } from '../../Models/Api/url.model';
import {
  AxiosErrorData,
  AxiosResponseTypedArray,
} from '../../Models/AxiosResponse';
import fetchAxios from '../../Services/Api/fetchAxios';
import FormGenerator from '../../Components/FormsUI/FormGenerator';
import menuValidation from '../../Api/Validation/menu.validation';
import fields from '../../Services/Helpers/fieldsTypeSave';

type NewMenuAtributes = Omit<MenuAttributes, 'id' | 'created_at'>;

function NewMenu() {
  const axiosPrivate = useAxiosPrivate();
  const { triggerAlert } = useAlert();
  const navigation = useNavigate();
  const queryClient = useQueryClient();

  const urlQuery = useQuery<AxiosResponseTypedArray<UrlAttributes>>({
    queryKey: ['url'],
    queryFn: () =>
      fetchAxios({
        axios: axiosPrivate,
        url: 'url',
        method: 'get',
      }),
  });
  const menuMutation = useMutation(
    (values: NewMenuAtributes) =>
      fetchAxios({
        axios: axiosPrivate,
        url: 'menu',
        method: 'post',
        data: {
          ...values,
          menu_order: 99,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['menu'], { exact: true });
        triggerAlert('Menu Item Added', 'success');
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
  return (
    <Container>
      <FormGenerator<MenuAttributes>
        validationSchema={menuValidation}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          menuMutation.mutate(values);
        }}
        fields={fields('menu')}
        extraData={{ dropdown: urlQuery.data?.data }}
      />
    </Container>
  );
}
export default NewMenu;
