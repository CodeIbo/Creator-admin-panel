import { Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { useMutation, useQuery } from 'react-query';
import { CustomPageAttributes } from '../../Models/Api/customPage.model';
import {
  AxiosErrorData,
  AxiosResponseTypedObject,
} from '../../Models/AxiosResponse';
import { useAlert } from '../../Services/Context/Alert/AlertProvider';
import useAxiosPrivate from '../../Services/Hooks/useAxiosPrivate';
import { PageAttributes } from '../../Models/Api/page.model';
import fetchAxios from '../../Services/Api/fetchAxios';
import LoadingState from '../../Components/LoadingState/LoadingState';
import FormGenerator from '../../Components/FormsUI/FormGenerator';
import pagesValidation from '../../Api/Validation/pages.validation';
import fields from '../../Services/Helpers/fieldsTypeSave';

type EditPageAttributes = Partial<
  Omit<CustomPageAttributes, 'id' | 'page_category' | 'page_type'>
>;

function EditPage() {
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const { triggerAlert } = useAlert();
  const navigation = useNavigate();

  const pageQuery = useQuery<
    AxiosResponseTypedObject<PageAttributes>,
    AxiosErrorData
  >({
    queryKey: ['pages', id],
    queryFn: () =>
      fetchAxios({
        axios: axiosPrivate,
        url: `pages/${id}`,
        method: 'get',
      }),
    enabled: typeof id === 'string',
    onError(err) {
      triggerAlert(err.message, 'error');
    },
  });

  const pageMutation = useMutation(
    (values: EditPageAttributes) =>
      fetchAxios({
        axios: axiosPrivate,
        url: `pages/${id}`,
        method: 'put',
        data: values,
      }),
    {
      onSuccess: () => {
        triggerAlert('Page updated', 'success');
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

  if (pageQuery.isLoading) return <LoadingState />;

  return (
    <Container>
      <FormGenerator<PageAttributes>
        validationSchema={pagesValidation}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          pageMutation.mutate(values);
        }}
        fields={fields('custom_page')}
        fetchedValues={pageQuery.data?.data}
      />
    </Container>
  );
}
export default EditPage;
