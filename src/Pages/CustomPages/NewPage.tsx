import Container from '@mui/material/Container';
import Form from '../../Components/Form/Form';
import useFormGenerator from '../../Services/Hooks/useFormGenerator';
import { CustomPageAttributes } from '../../Models/Api/customPage.model';

function NewPage() {
  const { emptyForm } = useFormGenerator('pages');
  return (
    <Container>
      <Form
        dataType="pages"
        mode="new"
        data={emptyForm as CustomPageAttributes}
      />
    </Container>
  );
}
export default NewPage;
