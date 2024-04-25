import Container from '@mui/material/Container';
import Form from '../../Components/Form/Form';
import useFormGenerator from '../../Services/Hooks/useFormGenerator';
import { UserAttributes } from '../../Models/Api/users.model';

function NewUser() {
  const { emptyForm } = useFormGenerator('users');
  return (
    <Container>
      <Form dataType="users" mode="new" data={emptyForm as UserAttributes} />
    </Container>
  );
}
export default NewUser;
