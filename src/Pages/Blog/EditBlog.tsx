import { useNavigate, useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { useMutation, useQuery } from 'react-query';

import { BlogAttributes } from '../../Models/Api/blog.model';
import {
  AxiosErrorData,
  AxiosResponseTypedObject,
} from '../../Models/AxiosResponse';
import { useAlert } from '../../Services/Context/Alert/AlertProvider';
import fetchAxios from '../../Services/Api/fetchAxios';
import useAxiosPrivate from '../../Services/Hooks/useAxiosPrivate';
import LoadingState from '../../Components/LoadingState/LoadingState';
import FormGenerator from '../../Components/FormsUI/FormGenerator';
import blogValidation from '../../Api/Validation/blog.validation';
import fields from '../../Services/Helpers/fieldsTypeSave';

type EditBlogAtributes = Partial<Omit<BlogAttributes, 'id' | 'page_category'>>;

function EditBlog() {
  const { id } = useParams();
  const { triggerAlert } = useAlert();
  const axiosPrivate = useAxiosPrivate();
  const navigation = useNavigate();
  const blogQuery = useQuery<
    AxiosResponseTypedObject<BlogAttributes>,
    AxiosErrorData
  >({
    queryKey: ['blog', id],
    queryFn: () =>
      fetchAxios({
        axios: axiosPrivate,
        url: `blog/${id}`,
        method: 'get',
      }),
    enabled: typeof id === 'string',
    onError(err) {
      triggerAlert(err.message, 'error');
    },
  });

  const blogMutation = useMutation(
    (values: EditBlogAtributes) =>
      fetchAxios({
        axios: axiosPrivate,
        url: `blog/${id}`,
        method: 'put',
        data: values,
      }),
    {
      onSuccess: () => {
        triggerAlert('Blog updated', 'success');
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

  if (blogQuery.isLoading) return <LoadingState />;

  return (
    <Container>
      <FormGenerator<BlogAttributes>
        validationSchema={blogValidation}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          blogMutation.mutate(values);
        }}
        fields={fields('blog')}
        fetchedValues={blogQuery.data?.data}
      />
    </Container>
  );
}
export default EditBlog;
