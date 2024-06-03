import * as Yup from 'yup';

const menuValidation = Yup.object().shape({
  label: Yup.string().required('Name is required'),
  url_id: Yup.string().required('Url is required'),
  scroll_target: Yup.string().nullable(),
  parent_id: Yup.string().nullable(),
});

export default menuValidation;
