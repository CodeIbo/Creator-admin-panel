import * as Yup from 'yup';

const uiSettingsValidation = Yup.object().shape({
  element_value: Yup.string().required('Cannot be empty'),
  element_css: Yup.string().nullable(),
});

export default uiSettingsValidation;
