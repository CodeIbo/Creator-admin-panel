import { ReactNode } from 'react';
import { MenuItem } from '@mui/material';

interface DropdownInterface {
  itemValue: string;
  dropdownContent: ReactNode;
  id: string;
  dropdownKey: string;
}

function DropdownItem({
  itemValue = '',
  dropdownContent,
  id,
  dropdownKey,
}: DropdownInterface) {
  return (
    <MenuItem id={id} value={itemValue} key={dropdownKey}>
      {dropdownContent}
    </MenuItem>
  );
}

export default DropdownItem;
