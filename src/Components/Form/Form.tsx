import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { random } from 'lodash';
import ButtonGroup from '@mui/material/ButtonGroup';
import FormType from '../../Models/FormType';
import formHelper from '../../Services/Helpers/formHelper.json';
import Editor from '../CodeEditor/CodeEditor';
import DynamicObject from '../../Models/DynamicObject';
import useFetch from '../../Services/Hooks/useFetch';
import InputArray from '../InputArray/InputArray';

function Form({ dataType, data = {}, mode }: FormType) {
  const { id } = useParams();
  const navigate = useNavigate();
  const jsonUntypedData = formHelper[dataType] as DynamicObject;
  const { response, isLoading, error, apiHandler } = useFetch();
  const [formData, setFormData] = useState(data);
  const [htmlInput, setHtmlInput] = useState('');
  const [arrayInput, setArrayInput] = useState<string[] | []>([]);

  const inputHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    data_key: string
  ) => {
    setFormData({ ...formData, [`${data_key}`]: e.target.value });
  };
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id) {
      apiHandler({
        method: 'put',
        url: `${dataType}/${id}`,
      });
    } else {
      apiHandler({
        method: 'post',
        url: dataType,
      });
    }
  };
  useEffect(() => {
    if (mode === 'new') {
      Object.keys(jsonUntypedData).map((key) => {
        return setFormData({ ...formData, [`${key}`]: '' });
      });
    } else {
      setHtmlInput(data.post_content as string);
      setArrayInput(JSON.parse(data.post_tags) as string[]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form onSubmit={submitHandler}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          padding: '2rem',
        }}
      >
        {Object.keys(jsonUntypedData).map((key) => {
          if (jsonUntypedData[key] === 'input') {
            return (
              <TextField
                key={key}
                variant="outlined"
                label={key}
                value={formData[key]}
                onChange={(e) => {
                  inputHandler(e, key);
                }}
                sx={{
                  minWidth: '100%',
                }}
              />
            );
          }
          if (jsonUntypedData[key] === 'input-date') {
            return (
              <TextField
                key={key}
                variant="outlined"
                type="date"
                label="Data Publikacji"
                sx={{
                  width: '100%',
                }}
                value={
                  new Date(formData[key] as string).toLocaleDateString(
                    'en-CA'
                  ) as string
                }
                onChange={(e) => {
                  inputHandler(e, key);
                }}
              />
            );
          }
          if (jsonUntypedData[key] === 'input-html') {
            return (
              <Editor
                key={key}
                editorHandler={setHtmlInput}
                value={htmlInput}
              />
            );
          }
          if (jsonUntypedData[key] === 'input-array') {
            return (
              <InputArray
                key={key}
                arrayData={arrayInput}
                arrayDataSet={setArrayInput}
              />
            );
          }

          return <h1 key={random()}>ERROR</h1>;
        })}
        <ButtonGroup variant="contained">
          <Button
            onClick={() => {
              navigate('..', { relative: 'path' });
            }}
            sx={{
              width: '10rem',
            }}
            color="error"
          >
            Cancel
          </Button>
          <Button type="submit" sx={{ width: '10rem' }}>
            Send
          </Button>
        </ButtonGroup>
      </Box>
    </form>
  );
}

export default Form;
