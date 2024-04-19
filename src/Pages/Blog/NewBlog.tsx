import Container from '@mui/material/Container';
import Form from '../../Components/Form/Form';
import useFormGenerator from '../../Services/Hooks/useFormGenerator';
import { BlogAttributes } from '../../Models/Api/blog.model';

function NewBlog() {
  const { emptyForm } = useFormGenerator('blog');
  return (
    <Container>
      <Form dataType="blog" mode="new" data={emptyForm as BlogAttributes} />
    </Container>
  );
}
export default NewBlog;
