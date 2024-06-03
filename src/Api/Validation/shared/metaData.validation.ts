import * as Yup from 'yup';

const metaDataValidation = {
  meta_data_title: Yup.string().required('Meta data is required'),
  meta_data_description: Yup.string().required('Meta data is required'),
  keywords: Yup.string().required('Keywords are required'),
};
export default metaDataValidation;
