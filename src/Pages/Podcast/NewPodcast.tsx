import Container from '@mui/material/Container';
import Form from '../../Components/Form/Form';
import useFormGenerator from '../../Services/Hooks/useFormGenerator';
import { PodcastAttributes } from '../../Models/Api/podcast.model';

function NewPodcast() {
  const { emptyForm } = useFormGenerator('podcast');
  return (
    <Container>
      <Form
        dataType="podcast"
        mode="new"
        data={emptyForm as PodcastAttributes}
      />
    </Container>
  );
}
export default NewPodcast;
