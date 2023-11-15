import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import InputArrayType from '../../Models/InputArrayType';

function InputArray({ key, arrayDataSet, arrayData }: InputArrayType) {
  const [inputValue, setInputValue] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const onEnterPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const lowerText = inputValue.toLowerCase();
      const duplicate: boolean = arrayData.includes(lowerText);
      setIsError(duplicate);
      if (!duplicate) {
        arrayData.push(lowerText);
        arrayDataSet(arrayData);
      }
      setInputValue('');
    }
  };
  const removeItem = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    tag: string
  ) => {
    e.preventDefault();
    const newData = arrayData.filter((arrTag) => arrTag !== tag);
    arrayDataSet(newData);
  };
  return (
    <Box sx={{ width: '100%' }}>
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
        helperText={isError && 'Duplikat tagu'}
      />
      <Box sx={{ paddingTop: '0.5rem' }}>
        {arrayData.length > 0 ? (
          arrayData.map((tag) => (
            <Button
              sx={{ m: 1 }}
              key={tag}
              onClick={(e) => {
                removeItem(e, tag);
              }}
              variant="outlined"
              startIcon={<DeleteIcon />}
            >
              {tag}
            </Button>
          ))
        ) : (
          <Typography>Dodaj nowe tagi :)</Typography>
        )}
      </Box>
    </Box>
  );
}

export default InputArray;
