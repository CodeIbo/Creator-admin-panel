import { Dispatch, SetStateAction } from 'react';

type DropdownParams = {
  dropdownHandler: Dispatch<
    SetStateAction<{ url_id: string; position_on_list: number }>
  >;
  api_url: string;
  label: string;
  dropdownValue: string;
};

export default DropdownParams;
