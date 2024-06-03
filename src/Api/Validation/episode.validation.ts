import * as Yup from 'yup';
import {
  foreginKey,
  urlExternalRegex,
  urlInternalRegex,
} from '../../Services/Helpers/regexList';
import metaDataValidation from './shared/metaData.validation';

const episodeValidation = Yup.object().shape({
  ...metaDataValidation,
  episode_title: Yup.string().required('Article title is required'),
  date: Yup.date().required('Date is required'),
  url: Yup.string()
    .matches(urlInternalRegex, 'Invalid url')
    .required('Password is required'),
  photo_url: Yup.string().matches(urlExternalRegex, 'Invalid url'),
  episode_content: Yup.string(),
  episode_tags: Yup.array().of(Yup.string()),
});

export default episodeValidation;
