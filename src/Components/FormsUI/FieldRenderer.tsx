import React, { useState } from 'react';
import { Field, FieldArray, FieldProps } from 'formik';
import { Box, FormControlLabel, Switch, Typography } from '@mui/material';
import { AnyObject } from 'yup';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';

import TextFieldWrapper from './TextField/TextField';
import Editor from './CodeEditor/CodeEditor';
import InputArray from './InputArray/InputArray';
import CKEditorComponent from './CKEditorComponent/CKEditorComponent';
import DropdownGenerator from './Dropdown/DropdownGenerator';

interface FieldRendererProps {
  fieldProps: {
    name: string;
    type: string;
    label: string;
    strictType?: string;
    size?: number;
  };
  values: { [key: string]: any };
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any>) => void;
  extraData?: {
    dropdown?: AnyObject[];
  };
}

function FieldRenderer({
  fieldProps,
  values,
  handleChange,
  handleBlur,
  extraData,
}: FieldRendererProps) {
  const [devMode, setDevMode] = useState<boolean>(false);
  switch (fieldProps.type) {
    case 'input':
      return (
        <TextFieldWrapper
          key={fieldProps.name}
          name={fieldProps.name}
          label={fieldProps.label}
          type={fieldProps.strictType}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values[fieldProps.name]}
        />
      );
    case 'html':
      return (
        <Box>
          <FormControlLabel
            sx={{
              marginLeft: 'auto',
              width: '100%',
              justifyContent: 'flex-end',
            }}
            labelPlacement="end"
            control={
              <Switch
                color="success"
                value={devMode}
                onChange={() => setDevMode((prev) => !prev)}
              />
            }
            label="DevMode"
          />
          <Field name={fieldProps.name} key={fieldProps.name}>
            {({ field }: FieldProps) => {
              if (devMode)
                return (
                  <Editor
                    editorHandler={(value) => {
                      field.onChange(field.name)(value);
                    }}
                    value={field.value}
                  />
                );
              return (
                <CKEditorComponent
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(field.name)(value);
                  }}
                />
              );
            }}
          </Field>
        </Box>
      );
    case 'date':
      return (
        <Field name={fieldProps.name} key={fieldProps.name}>
          {({ field, form }: FieldProps) => {
            const handleDateChange = (value: moment.Moment | null) => {
              if (value) form.setFieldValue(field.name, value.toISOString());
            };
            return (
              <DatePicker
                format="DD-MM-YYYY"
                key={fieldProps.name}
                name={fieldProps.name}
                label={fieldProps.label}
                onChange={handleDateChange}
                value={
                  values[fieldProps.name]
                    ? moment.utc(values[fieldProps.name])
                    : null
                }
                sx={{ width: '100%' }}
              />
            );
          }}
        </Field>
      );
    case 'array':
      return (
        <FieldArray name={fieldProps.name} key={fieldProps.name}>
          {(arrayProps) => (
            <InputArray
              key={fieldProps.name}
              arrayData={values[fieldProps.name] || []}
              arrayProps={arrayProps}
            />
          )}
        </FieldArray>
      );
    case 'dropdown':
      return (
        <Field name={fieldProps.name} key={fieldProps.name}>
          {({ field }: FieldProps) => (
            <DropdownGenerator
              name={fieldProps.name}
              fieldValue={values[fieldProps.name]}
              label={fieldProps.label}
              strictType={fieldProps.strictType}
              onChange={(value) => {
                field.onChange(field.name)(value);
              }}
              onBlur={handleBlur}
              arrayData={extraData?.dropdown}
            />
          )}
        </Field>
      );
    default:
      return (
        <Typography
          typography="p"
          textAlign="center"
          key={fieldProps.name}
          sx={{ color: 'red' }}
        >
          ERROR key: {`${fieldProps.name}`}
        </Typography>
      );
  }
}

export default FieldRenderer;
