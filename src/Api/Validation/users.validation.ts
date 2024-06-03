import * as Yup from 'yup';

const usersValidation = {
  nick_name: Yup.string(),
  email: Yup.string().email('Invalid email').required('Email is required'),
  access_lvl: Yup.string().required('Access Lvl is required'),
};

const newUsersValidation = Yup.object().shape({
  ...usersValidation,
  user_password: Yup.string().required('Password is required'),
});

const editUsersValidation = Yup.object().shape({
  ...usersValidation,
  user_password: Yup.string(),
});

export { newUsersValidation, editUsersValidation };
