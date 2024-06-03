import { Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { useMutation, useQuery } from 'react-query';
import {
  AxiosErrorData,
  AxiosResponseTypedArray,
  AxiosResponseTypedObject,
} from '../../Models/AxiosResponse';
import { MenuAttributes } from '../../Models/Api/menu.model';
import { useAlert } from '../../Services/Context/Alert/AlertProvider';
import menuValidation from '../../Api/Validation/menu.validation';
import FormGenerator from '../../Components/FormsUI/FormGenerator';
import { UrlAttributes } from '../../Models/Api/url.model';
import fetchAxios from '../../Services/Api/fetchAxios';
import fields from '../../Services/Helpers/fieldsTypeSave';
import LoadingState from '../../Components/LoadingState/LoadingState';
import useAxiosPrivate from '../../Services/Hooks/useAxiosPrivate';

type EditMenuAtributes = Partial<
  Pick<MenuAttributes, 'label' | 'url_id' | 'scroll_target'>
>;

function EditMenu() {
  const { id } = useParams();
  const { triggerAlert } = useAlert();
  const navigation = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const urlQuery = useQuery<AxiosResponseTypedArray<UrlAttributes>>({
    queryKey: ['url'],
    queryFn: () =>
      fetchAxios({
        axios: axiosPrivate,
        url: 'url',
        method: 'get',
      }),
  });

  const menuQuery = useQuery<AxiosResponseTypedObject<MenuAttributes>>({
    queryKey: ['menu', id],
    queryFn: () =>
      fetchAxios({
        axios: axiosPrivate,
        url: `menu/${id}`,
        method: 'get',
      }),
  });

  const menuMutation = useMutation(
    (values: EditMenuAtributes) =>
      fetchAxios({
        axios: axiosPrivate,
        url: `menu/${id}`,
        method: 'put',
        data: values,
      }),
    {
      onSuccess: () => {
        triggerAlert('Menu Item Updated', 'success');
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

  if (menuQuery.isLoading) return <LoadingState />;

  return (
    <Container>
      <FormGenerator<MenuAttributes>
        validationSchema={menuValidation}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          menuMutation.mutate({
            label: values.label,
            url_id: values.url_id,
            scroll_target: values.scroll_target,
          });
        }}
        fields={fields('menu')}
        fetchedValues={menuQuery.data?.data}
        extraData={{ dropdown: urlQuery.data?.data }}
      />
    </Container>
  );
}
export default EditMenu;
