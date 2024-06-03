import * as Yup from 'yup';
import { foreginKey, urlInternalRegex } from '../../Services/Helpers/regexList';
import metaDataValidation from './shared/metaData.validation';

const podcastValidation = Yup.object().shape({
  ...metaDataValidation,
  podcast_title: Yup.string().required('Podcast Title is required'),
  url: Yup.string()
    .matches(urlInternalRegex, 'Invalid url')
    .required('Url is required'),
  name: Yup.string().required('Name is required'),
  podcast_key: Yup.string()
    .matches(foreginKey, 'Invalid foregin key')
    .required('Foregin key is required'),
});

export default podcastValidation;
