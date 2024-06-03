import { MenuItem } from '@mui/material';
import { ChangeEvent } from 'react';
import { AnyObject } from 'yup';
import TextFieldWrapper from '../TextField/TextField';

interface DropDownInterface {
  name: string;
  strictType?: string;
  arrayData?: AnyObject[];
  onChange: (value: string) => void;
  onBlur: (event: React.FocusEvent<any>) => void;
  fieldValue?: string;
  label: string;
}

function DropdownGenerator({
  name,
  fieldValue = '',
  label,
  strictType = 'Forgotten strictType',
  arrayData = [],
  onChange,
  onBlur,
}: DropDownInterface) {
  return (
    <TextFieldWrapper
      select
      key={name}
      name={name}
      label={label}
      onChange={(e: ChangeEvent<any>) => {
        onChange(e.target.value);
      }}
      onBlur={onBlur}
      value={fieldValue}
    >
      {arrayData.map((item) => {
        switch (strictType) {
          case 'url':
            return (
              <MenuItem key={item.id} value={item.id}>
                {`/${item.url} (${item.name} - ${item.page_category})`}
              </MenuItem>
            );

          default:
            return (
              <MenuItem key={item.value} value={item.value}>
                {item.text}
              </MenuItem>
            );
        }
      })}
    </TextFieldWrapper>
  );
}

export default DropdownGenerator;
