import * as Yup from 'yup';
import { urlExternalRegex } from '../../Services/Helpers/regexList';

const socialMediaValidation = Yup.object().shape({
  link: Yup.string().matches(urlExternalRegex, 'Invalid Url'),
  title: Yup.string(),
});

export default socialMediaValidation;
