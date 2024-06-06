import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { v4 as uuidv4 } from 'uuid';
import { Chip, Paper, styled } from '@mui/material';
import InputArrayType from '../../../Models/InputArrayType';

function InputArray({ key, arrayProps, arrayData }: InputArrayType) {
  const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));
  const [inputValue, setInputValue] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const onEnterPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const lowerText = inputValue.toLowerCase();
      const duplicate: boolean = arrayData.includes(lowerText);
      setIsError(duplicate);
      if (!duplicate && lowerText.length > 0) {
        arrayProps.push(lowerText);
      }
      setInputValue('');
    }
  };
  const removeItem = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    tag: string
  ) => {
    e.preventDefault();
    arrayProps.remove(arrayData.indexOf(tag));
  };
  return (
    <Paper
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none',
        px: 0.5,
        py: 1,
        m: 0,
      }}
      component="ul"
    >
      <TextField
        sx={{ width: '100%' }}
        key={key}
        variant="outlined"
        placeholder="Wpisz tagi"
        label="Tags"
        value={inputValue}
        onKeyDown={(e) => {
          onEnterPress(e);
        }}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        error={isError}
        helperText={isError && 'Tag duplicate'}
      />

      {arrayData.length > 0 ? (
        arrayData.map((tag) => (
          <ListItem key={uuidv4()}>
            <Chip
              label={tag}
              sx={{ fontSize: '1.1rem', mt: 1 }}
              onDelete={(e) => {
                removeItem(e, tag);
              }}
              variant="outlined"
              color="success"
            />
          </ListItem>
        ))
      ) : (
        <Typography
          paddingTop={1}
          display="block"
          minWidth="100%"
          textAlign="center"
          color="textSecondary"
        >
          Dodaj nowe tagi :)
        </Typography>
      )}
    </Paper>
  );
}

export default InputArray;
