import Container from '@mui/material/Container';
import Form from '../../Components/Form/Form';
import useFormGenerator from '../../Services/Hooks/useFormGenerator';
import { ArticlesAttributes } from '../../Models/Api/article.model';

function NewArticlePost() {
  const { emptyForm } = useFormGenerator('article');

  return (
    <Container>
      <Form
        dataType="article"
        mode="new"
        data={emptyForm as ArticlesAttributes}
      />
    </Container>
  );
}
export default NewArticlePost;
