import Container from '@mui/material/Container';

import { useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router';
import { ArticlesAttributes } from '../../Models/Api/article.model';
import { AxiosErrorData } from '../../Models/AxiosResponse';
import { useAlert } from '../../Services/Context/Alert/AlertProvider';
import useAxiosPrivate from '../../Services/Hooks/useAxiosPrivate';
import articleValidation from '../../Api/Validation/article.validation';
import FormGenerator from '../../Components/FormsUI/FormGenerator';
import fields from '../../Services/Helpers/fieldsTypeSave';
import fetchAxios from '../../Services/Api/fetchAxios';

type NewArticleAtributes = Omit<ArticlesAttributes, 'id' | 'blog_key'>;

function NewArticlePost() {
  const { componentKey } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const { triggerAlert } = useAlert();
  const navigation = useNavigate();
  const queryClient = useQueryClient();

  const articleMutation = useMutation(
    (values: NewArticleAtributes) =>
      fetchAxios({
        axios: axiosPrivate,
        method: 'post',
        url: 'article',
        data: { ...values, blog_key: componentKey },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['article', componentKey], {
          exact: true,
        });
        triggerAlert('Article updated', 'success');
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
      <FormGenerator<NewArticleAtributes>
        validationSchema={articleValidation}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          articleMutation.mutate(values);
        }}
        fields={fields('article')}
        buttons={{ first_button: { navigateTO: '..' } }}
      />
    </Container>
  );
}
export default NewArticlePost;
