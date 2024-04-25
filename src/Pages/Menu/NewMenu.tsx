import Container from '@mui/material/Container';
import Form from '../../Components/Form/Form';
import useFormGenerator from '../../Services/Hooks/useFormGenerator';
import { MenuAttributes } from '../../Models/Api/menu.model';

function NewMenu() {
  const { emptyForm } = useFormGenerator('menu');
  return (
    <Container>
      <Form dataType="menu" mode="new" data={emptyForm as MenuAttributes} />
    </Container>
  );
}
export default NewMenu;
