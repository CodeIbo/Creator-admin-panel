import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Typography } from '@mui/material';
import FormType from '../../Models/FormType';

import formHelper from '../../Services/Helpers/formHelper.json';
import Editor from '../CodeEditor/CodeEditor';
import useFetch from '../../Services/Hooks/useFetch';
import InputArray from '../InputArray/InputArray';
import { useAlert } from '../../Services/Context/Alert/AlertProvider';
import LinkButton from '../LinkButton/LinkButton';
import useFormGenerator from '../../Services/Hooks/useFormGenerator';
import { ApiCallback, ApiUpdate } from '../../Models/AxiosResponse';
import { FormHelper } from '../../Models/JSONHelpers';
import { FormDataNames } from '../../Models/dataNames';
import Dropdown from '../Dropdown/Dropdown';

function Form({ dataType, data, mode }: FormType) {
  const { id, componentKey } = useParams();
  const navigate = useNavigate();
  const { emptyForm } = useFormGenerator(dataType, 'regex');
  const { htmlInput, setHtmlInput, arrayInput, setArrayInput } =
    useFormGenerator(dataType, undefined, {
      edit: mode !== 'new',
      data,
    });
  const jsonUntypedData: FormHelper[FormDataNames] = formHelper[dataType];
  const { response, isLoading, error, apiHandler } = useFetch();
  const [formData, setFormData] = useState(data);
  const [errorRegex, setRegexError] = useState(emptyForm);
  const [dropdownValue, setDropdownValue] = useState({
    url_id: '',
    position_on_list: 0,
  });
  const { triggerAlert } = useAlert();
  const location = useLocation();
  const urlData = location.state;
  const test = useParams();
  const inputHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    data_key: string,
    regex?: string
  ) => {
    let pattern;
    const { value } = e.target;
    switch (regex) {
      case 'email':
        pattern = /^[^\s@]+@[^\s@]+\.[^\s@]*$/;
        break;
      case 'link':
        pattern = /^[a-z,-]*$/;
        break;
      case 'foregin_key':
        pattern = /^[a-z,-]*$/;
        break;
      default:
        pattern = null;
    }
    if (pattern) {
      if (!pattern.test(value)) {
        setRegexError((prev) => {
          return { ...prev, [data_key]: true };
        });
      } else {
        setRegexError((prev) => {
          return { ...prev, [data_key]: false };
        });
      }
    }
    setFormData((prev) => {
      return { ...prev, [data_key]: value };
    });
  };
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const clonedFormData: ApiUpdate = structuredClone(formData);
    Object.keys(jsonUntypedData).map((key) => {
      if (
        jsonUntypedData[key as keyof FormHelper[FormDataNames]]?.type ===
        'input-html'
      ) {
        clonedFormData[key as keyof ApiCallback] = htmlInput;
      }
      if (
        jsonUntypedData[key as keyof FormHelper[FormDataNames]]?.type ===
        'input-array'
      ) {
        Object.assign(clonedFormData, { [key]: arrayInput });
      }
      if (
        jsonUntypedData[key as keyof FormHelper[FormDataNames]]?.key &&
        componentKey
      ) {
        clonedFormData[key as keyof ApiCallback] = componentKey;
      }
    });
    if ('url_id' in clonedFormData) {
      Object.assign(clonedFormData, { url_id: dropdownValue.url_id });
    }
    if (id) {
      if ('id' in clonedFormData) {
        delete clonedFormData.id;
      }
      if ('created_at' in clonedFormData) {
        delete clonedFormData.created_at;
      }
      apiHandler({
        method: 'put',
        url: `${dataType}/${id}`,
        data: clonedFormData,
      });
    } else {
      if (dataType === 'blog' || dataType === 'podcast') {
        Object.assign(clonedFormData, { page_category: dataType });
      }
      if (dataType === 'menu') {
        Object.assign(clonedFormData, {
          menu_order: dropdownValue.position_on_list,
        });
      }
      apiHandler({
        method: 'post',
        url: dataType,
        data: clonedFormData,
      });
    }
  };
  useEffect(() => {
    if (!isLoading) {
      if (error?.response?.data) {
        triggerAlert(error?.response?.data?.message, 'error');
      }
      if (response?.statusCode === 200 || response?.statusCode === 201) {
        triggerAlert(id ? 'Updated' : 'Added', 'info');
        navigate('../..', {
          relative: 'path',
        });
      }
    }
  }, [error, response, isLoading]);

  useEffect(() => {
    setFormData(data);
    if ('url_id' in data && data.url_id.length > 0) {
      setDropdownValue((prev) => {
        return { ...prev, url_id: data.url_id };
      });
    }
  }, [data]);

  return (
    <form
      onSubmit={(e) => {
        submitHandler(e);
      }}
    >
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
          switch (
            jsonUntypedData[key as keyof FormHelper[FormDataNames]]?.type
          ) {
            case 'input':
              return (
                <TextField
                  hidden={
                    jsonUntypedData[key as keyof FormHelper[FormDataNames]]
                      ?.hidden
                  }
                  key={key}
                  variant="outlined"
                  label={
                    jsonUntypedData[key as keyof FormHelper[FormDataNames]]
                      ?.label
                  }
                  value={formData[key as keyof ApiCallback]}
                  onChange={(e) => {
                    inputHandler(
                      e,
                      key,
                      jsonUntypedData[key as keyof FormHelper[FormDataNames]]
                        ?.regex
                    );
                  }}
                  disabled={
                    jsonUntypedData[key as keyof FormHelper[FormDataNames]]
                      ?.disabled
                  }
                  sx={{
                    minWidth: '100%',
                  }}
                  required={
                    jsonUntypedData[key as keyof FormHelper[FormDataNames]]
                      ?.required
                  }
                  type={
                    jsonUntypedData[key as keyof FormHelper[FormDataNames]]
                      ?.dataType
                  }
                  error={
                    key in errorRegex &&
                    errorRegex[key as keyof typeof errorRegex]
                  }
                  helperText={
                    key in errorRegex &&
                    errorRegex[key as keyof typeof errorRegex]
                      ? 'Error'
                      : ''
                  }
                />
              );
            case 'input-date':
              return (
                <TextField
                  key={key}
                  variant="outlined"
                  type="date"
                  label={
                    jsonUntypedData[key as keyof FormHelper[FormDataNames]]
                      ?.label
                  }
                  sx={{
                    width: '100%',
                  }}
                  value={
                    new Date(
                      formData[key as keyof ApiCallback]
                    ).toLocaleDateString('en-CA') as string
                  }
                  onChange={(e) => {
                    inputHandler(e, key);
                  }}
                  required={
                    jsonUntypedData[key as keyof FormHelper[FormDataNames]]
                      ?.required
                  }
                  disabled={
                    jsonUntypedData[key as keyof FormHelper[FormDataNames]]
                      ?.disabled
                  }
                />
              );
            case 'input-html':
              return (
                <Editor
                  key={key}
                  editorHandler={setHtmlInput}
                  value={htmlInput}
                />
              );
            case 'input-array':
              return (
                <InputArray
                  key={key}
                  arrayData={arrayInput}
                  arrayDataSet={setArrayInput}
                />
              );
            case 'dropdown':
              return (
                <Dropdown
                  dropdownHandler={setDropdownValue}
                  dropdownValue={dropdownValue.url_id}
                  api_url={
                    jsonUntypedData[key as keyof FormHelper[FormDataNames]]
                      ?.dropdown_link as string
                  }
                  label={
                    jsonUntypedData[key as keyof FormHelper[FormDataNames]]
                      ?.label as string
                  }
                />
              );
            default:
              if (
                jsonUntypedData[key as keyof FormHelper[FormDataNames]]?.hidden
              ) {
                return null;
              }

              return (
                <Typography
                  typography="p"
                  textAlign="center"
                  key={key}
                  sx={{ color: 'red' }}
                >
                  ERROR key: {`${key}`}
                </Typography>
              );
          }
        })}
        <ButtonGroup variant="contained">
          <LinkButton
            component={Link}
            to="../.."
            relative="path"
            sx={{
              width: '10rem',
            }}
            color="error"
            buttonText="Cancel"
          />

          <Button
            type="submit"
            sx={{ width: '10rem' }}
            disabled={
              typeof errorRegex === 'object' &&
              !Object.values(errorRegex).every((value) => !value)
            }
          >
            Send
          </Button>
        </ButtonGroup>
      </Box>
    </form>
  );
}

export default Form;
