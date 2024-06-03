import Container from '@mui/material/Container';

import { useQueryClient, useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import { CustomPageAttributes } from '../../Models/Api/customPage.model';
import useAxiosPrivate from '../../Services/Hooks/useAxiosPrivate';
import { useAlert } from '../../Services/Context/Alert/AlertProvider';
import { AxiosErrorData } from '../../Models/AxiosResponse';
import fetchAxios from '../../Services/Api/fetchAxios';
import FormGenerator from '../../Components/FormsUI/FormGenerator';
import pagesValidation from '../../Api/Validation/pages.validation';
import fields from '../../Services/Helpers/fieldsTypeSave';

type NewPageAttributes = Omit<
  CustomPageAttributes,
  'page_category' | 'page_type'
>;

function NewPage() {
  const axiosPrivate = useAxiosPrivate();
  const { triggerAlert } = useAlert();
  const navigation = useNavigate();
  const queryClient = useQueryClient();
  const pageMutation = useMutation(
    (values: NewPageAttributes) =>
      fetchAxios({
        axios: axiosPrivate,
        method: 'post',
        url: 'pages',
        data: {
          ...values,
          page_category: 'page',
          page_type: 'custom-page',
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['pages'], { exact: true });
        triggerAlert('Page added', 'success');
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
      <FormGenerator<NewPageAttributes>
        validationSchema={pagesValidation}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          pageMutation.mutate(values);
        }}
        fields={fields('custom_page')}
        buttons={{ first_button: { navigateTO: '..' } }}
      />
    </Container>
  );
}
export default NewPage;
