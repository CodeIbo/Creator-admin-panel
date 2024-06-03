import { TextField } from '@mui/material';
import { useField } from 'formik';
import { ReactNode } from 'react';

interface TextFieldWrapperProps {
  name: string;
  children?: ReactNode;
  [key: string]: any;
}

interface ConfigTextFieldInterface {
  [x: string]: any;
  fullWidth: boolean;
  variant: 'outlined';
  error?: boolean;
  helperText?: string;
  value: any;
  name: string;
  onChange: (event: React.ChangeEvent<any>) => void;
  onBlur: (event: React.FocusEvent<any>) => void;
}

function TextFieldWrapper({
  name,
  children,
  ...otherProps
}: TextFieldWrapperProps) {
  const [field, mata] = useField(name);

  const configTextField: ConfigTextFieldInterface = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'outlined',
  };

  if (mata && mata.touched && mata.error) {
    configTextField.error = true;
    configTextField.helperText = mata.error;
  }

  return <TextField {...configTextField}>{children}</TextField>;
}

export default TextFieldWrapper;
