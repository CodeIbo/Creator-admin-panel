import { Dispatch, SetStateAction } from 'react';

type SideBarHandlerType = {
  sideBarState: boolean;
  sideBarHandler: Dispatch<SetStateAction<boolean>>;
};

export default SideBarHandlerType;
