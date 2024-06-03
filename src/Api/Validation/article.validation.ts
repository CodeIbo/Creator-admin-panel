import * as Yup from 'yup';
import {
  urlExternalRegex,
  urlInternalRegex,
} from '../../Services/Helpers/regexList';
import metaDataValidation from './shared/metaData.validation';

const articleValidation = Yup.object().shape({
  ...metaDataValidation,
  article_title: Yup.string().required('Article title is required'),
  author: Yup.string().required('Author is required'),
  date: Yup.date().required('Date is required'),
  url: Yup.string()
    .matches(urlInternalRegex, 'Invalid url')
    .required('Password is required'),
  lead: Yup.string().required('Lead is required'),
  photo_url: Yup.string().matches(urlExternalRegex, 'Invalid url'),
  article_content: Yup.string(),
  post_tags: Yup.array().of(Yup.string()),
});

export default articleValidation;
