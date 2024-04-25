import Container from '@mui/material/Container';

import Form from '../../Components/Form/Form';
import useFormGenerator from '../../Services/Hooks/useFormGenerator';
import { EpisodeAttributes } from '../../Models/Api/episode.model';

function NewEpisodePost() {
  const { emptyForm } = useFormGenerator('episode');
  return (
    <Container>
      <Form
        dataType="episode"
        mode="new"
        data={emptyForm as EpisodeAttributes}
      />
    </Container>
  );
}
export default NewEpisodePost;
