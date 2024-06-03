import * as Yup from 'yup';
import { urlInternalRegex } from '../../Services/Helpers/regexList';
import metaDataValidation from './shared/metaData.validation';

const pagesValidation = Yup.object().shape({
  ...metaDataValidation,
  page_content: Yup.string(),
  url: Yup.string()
    .matches(urlInternalRegex, 'Invalid url')
    .required('Url is required'),
  name: Yup.string().required('Name is required'),
});

export default pagesValidation;
