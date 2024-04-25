import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

type LinkItemType = {
  IconElement: OverridableComponent<SvgIconTypeMap<object, 'svg'>>;
  name: string;
  urlAdress: string;
};

export default LinkItemType;
