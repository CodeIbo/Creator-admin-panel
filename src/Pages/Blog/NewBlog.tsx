import Container from '@mui/material/Container';

import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from 'react-query';
import { BlogAttributes } from '../../Models/Api/blog.model';
import useAxiosPrivate from '../../Services/Hooks/useAxiosPrivate';
import { useAlert } from '../../Services/Context/Alert/AlertProvider';
import fetchAxios from '../../Services/Api/fetchAxios';
import { AxiosErrorData } from '../../Models/AxiosResponse';
import fields from '../../Services/Helpers/fieldsTypeSave';
import FormGenerator from '../../Components/FormsUI/FormGenerator';
import blogValidation from '../../Api/Validation/blog.validation';

type NewBlogAttributes = Omit<BlogAttributes, 'page_category' | 'id'>;

function NewBlog() {
  const axiosPrivate = useAxiosPrivate();
  const { triggerAlert } = useAlert();
  const navigation = useNavigate();
  const queryClient = useQueryClient();

  const blogMutation = useMutation(
    (values: NewBlogAttributes) =>
      fetchAxios({
        axios: axiosPrivate,
        method: 'post',
        url: 'blog',
        data: { ...values, page_category: 'blog' },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['blog'], { exact: true });
        triggerAlert('Blog added', 'success');
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
      <FormGenerator<NewBlogAttributes>
        validationSchema={blogValidation}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          blogMutation.mutate(values);
        }}
        fields={fields('blog')}
        buttons={{ first_button: { navigateTO: '..' } }}
      />
    </Container>
  );
}
export default NewBlog;
