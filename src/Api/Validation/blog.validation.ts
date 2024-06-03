import * as Yup from 'yup';
import { foreginKey, urlInternalRegex } from '../../Services/Helpers/regexList';
import metaDataValidation from './shared/metaData.validation';

const blogValidation = Yup.object().shape({
  ...metaDataValidation,
  blog_title: Yup.string().required('Blog Title is required'),
  url: Yup.string()
    .matches(urlInternalRegex, 'Invalid url')
    .required('Password is required'),
  name: Yup.string().required('Name is required'),
  blog_key: Yup.string()
    .matches(foreginKey, 'Invalid foregin key')
    .required('Foregin key is required'),
});

export default blogValidation;
