import { Dispatch, SetStateAction } from 'react';

type InputArrayType = {
  key: string;
  arrayData: string[];
  arrayDataSet: Dispatch<SetStateAction<string[]>>;
};

export default InputArrayType;
