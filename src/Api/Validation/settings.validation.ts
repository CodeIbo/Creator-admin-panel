import * as Yup from 'yup';
import { urlExternalRegex } from '../../Services/Helpers/regexList';

const settingsValidation = Yup.object().shape({
  company_name: Yup.string().required('Company name is required field'),
  logo: Yup.string()
    .matches(urlExternalRegex, 'Invalid Url')
    .required('Logo Url is required field'),
  logo_alt: Yup.string().required('Alt Logo is required field'),
  meta_data_title_global: Yup.string().required(
    'Meta Data Title  is required field'
  ),
  meta_data_description_global: Yup.string().required(
    'Meta Data Description is required field'
  ),
  keywords_global: Yup.string().required('Keywords is required field'),
  meta_data_suffix_global: Yup.string().required(
    'Meta Global suffix is required field'
  ),
});

export default settingsValidation;
