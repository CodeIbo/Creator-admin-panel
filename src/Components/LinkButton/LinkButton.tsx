import { Link, LinkProps, To } from 'react-router-dom';
import Button, { ButtonProps } from '@mui/material/Button';

type LinkButtonProps = ButtonProps &
  Omit<LinkProps, 'to'> & {
    to?: To;
    buttonText: string;
  };
function LinkButton(props: LinkButtonProps) {
  const {
    to,
    buttonText,
    color,
    variant,
    relative,
    onClick,
    sx,
    state,
    target,
    rel,
  } = props;
  if (to) {
    return (
      <Button
        component={Link}
        to={to}
        color={color}
        variant={variant}
        relative={relative}
        onClick={onClick}
        sx={sx}
        target={target}
        state={state}
        rel={rel}
      >
        {`${buttonText}`}
      </Button>
    );
  }
  return (
    <Button color={color} variant={variant} onClick={onClick} sx={sx}>
      {`${buttonText}`}
    </Button>
  );
}

export default LinkButton;
