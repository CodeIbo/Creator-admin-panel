import * as Yup from 'yup';

const loginValidation = Yup.object().shape({
  email: Yup.string()
    .email('Email must be valid email')
    .required('Email is required'),
  user_password: Yup.string()
    .min(4, 'Password is to short')
    .required('Password is required'),
});

export default loginValidation;
