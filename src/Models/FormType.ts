import { ApiCallback } from './AxiosResponse';
import { FormDataNames } from './dataNames';

type FormType = {
  data: ApiCallback;
  dataType: FormDataNames;
  mode: 'new' | 'edit';
};

export default FormType;
