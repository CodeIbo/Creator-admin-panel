import { useNavigate, useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { useMutation, useQuery } from 'react-query';

import { ArticlesAttributes } from '../../Models/Api/article.model';
import {
  AxiosErrorData,
  AxiosResponseTypedObject,
} from '../../Models/AxiosResponse';
import useAxiosPrivate from '../../Services/Hooks/useAxiosPrivate';
import { useAlert } from '../../Services/Context/Alert/AlertProvider';
import LoadingState from '../../Components/LoadingState/LoadingState';
import articleValidation from '../../Api/Validation/article.validation';
import FormGenerator from '../../Components/FormsUI/FormGenerator';
import fields from '../../Services/Helpers/fieldsTypeSave';
import fetchAxios from '../../Services/Api/fetchAxios';

type EditArticleAtributes = Omit<ArticlesAttributes, 'id' | 'blog_key'>;

function EditArticlePost() {
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const { triggerAlert } = useAlert();
  const navigation = useNavigate();

  const articleQuery = useQuery<
    AxiosResponseTypedObject<EditArticleAtributes>,
    AxiosErrorData
  >({
    queryKey: ['article', id],
    queryFn: () =>
      fetchAxios({
        axios: axiosPrivate,
        url: `article/${id}`,
        method: 'get',
      }),
    enabled: typeof id === 'string',
    onError(err) {
      triggerAlert(err.message, 'error');
    },
  });

  const articleMutation = useMutation(
    (values: EditArticleAtributes) =>
      fetchAxios({
        axios: axiosPrivate,
        url: `article/${id}`,
        method: 'put',
        data: values,
      }),
    {
      onSuccess: () => {
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

  if (articleQuery.isLoading) return <LoadingState />;
  return (
    <Container>
      <FormGenerator<EditArticleAtributes>
        validationSchema={articleValidation}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          articleMutation.mutate(values);
        }}
        fields={fields('article')}
        fetchedValues={articleQuery.data?.data}
      />
    </Container>
  );
}
export default EditArticlePost;
