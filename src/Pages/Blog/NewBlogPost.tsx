import Container from '@mui/material/Container';
import Form from '../../Components/Form/Form';

function NewBlogPost() {
  return (
    <Container>
      <Form dataType="blog" mode="new" />
    </Container>
  );
}
export default NewBlogPost;
