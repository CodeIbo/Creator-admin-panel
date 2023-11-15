import DynamicObject from './DynamicObject';
import DataNames from './dataNames';

type FormType = {
  data?: DynamicObject;
  dataType: DataNames;
  mode: 'new' | 'edit';
};

export default FormType;
