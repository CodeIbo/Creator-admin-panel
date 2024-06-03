import { Button, ButtonGroup, Grid, Tab, Tabs, Box } from '@mui/material';
import { Form, useFormik, FormikProvider, FormikHelpers } from 'formik';
import { AnyObject } from 'yup';
import _ from 'lodash';
import { SyntheticEvent, useState } from 'react';
import useEmptyObjectGenerator from '../../Services/Hooks/useEmptyObjectGenerator';
import LinkButton from '../LinkButton/LinkButton';
import FieldRenderer from './FieldRenderer';
import onlyModifiedFields from '../../Services/Helpers/onlyModifiedFields';

type InputTypes = 'input' | 'html' | 'array' | 'date' | 'dropdown';

export interface Fields {
  type: InputTypes;
  strictType?: string;
  size?: number;
  name: string;
  label: string;
}

interface FormGeneratorInterface<InitValues> {
  validationSchema: AnyObject;
  onSubmit: (
    values: InitValues,
    formikHelpers: FormikHelpers<InitValues>
  ) => void | Promise<any>;
  fields: Fields[];
  fetchedValues?: InitValues;
  extraData?: {
    dropdown?: AnyObject[];
  };
  buttons?: {
    first_button?: {
      show?: boolean;
      name?: string;
      navigateTO?: string;
    };
    second_button?: {
      show?: boolean;
      name?: string;
    };
  };
}

function FormGenerator<InitValues extends AnyObject>({
  validationSchema,
  onSubmit,
  fields,
  fetchedValues,
  extraData,
  buttons = {
    first_button: {
      show: true,
      name: 'Cancel',
      navigateTO: '../..',
    },
    second_button: {
      show: true,
      name: 'Submit',
    },
  },
}: FormGeneratorInterface<InitValues>) {
  const defaultButtons = {
    first_button: {
      show: true,
      name: 'Cancel',
      navigateTO: '../..',
    },
    second_button: {
      show: true,
      name: 'Submit',
    },
  };

  const mergedButtons = {
    ...defaultButtons,
    ...buttons,
    first_button: {
      ...defaultButtons.first_button,
      ...buttons.first_button,
    },
    second_button: {
      ...defaultButtons.second_button,
      ...buttons.second_button,
    },
  };
  const initValues = useEmptyObjectGenerator<InitValues>(validationSchema);
  const formik = useFormik<InitValues>({
    initialValues: fetchedValues || initValues,
    validationSchema,
    onSubmit: (values, helpers) => {
      let modifiedValues = { ...values };
      if (fetchedValues) {
        modifiedValues = onlyModifiedFields<InitValues>(values, fetchedValues);
      }

      onSubmit(modifiedValues, helpers);
    },
    enableReinitialize: true,
  });
  const [tabIndex, setTabIndex] = useState(0);

  const { handleChange, handleBlur, values, isSubmitting, handleSubmit } =
    formik;

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const mainFields = fields.filter(
    (field) =>
      !field.name.includes('meta') &&
      !field.name.includes('keywords') &&
      field.type !== 'html'
  );
  const metaFields = fields.filter(
    (field) => field.name.includes('meta') || field.name.includes('keywords')
  );
  const htmlFields = fields.filter((field) => field.type === 'html');
  const shouldRenderTabs = metaFields.length > 0 || htmlFields.length > 0;
  return (
    <FormikProvider value={formik}>
      <Form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {shouldRenderTabs && (
            <Box
              sx={{
                justifyContent: 'flex-top',
                borderBottom: 1,
                borderColor: 'divider',
                width: '100%',
                marginBottom: 2,
              }}
            >
              <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                variant="fullWidth"
              >
                <Tab label="Main" />
                {htmlFields.length > 0 && (
                  <Tab label="Edit Content" value={1} />
                )}
                {metaFields.length > 0 && <Tab label="Meta Data" value={2} />}
              </Tabs>
            </Box>
          )}
          {!shouldRenderTabs &&
            fields.map((field) => (
              <Grid item xs={field.size || 12} key={field.name}>
                <FieldRenderer
                  fieldProps={field}
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  extraData={extraData}
                />
              </Grid>
            ))}

          {shouldRenderTabs &&
            tabIndex === 0 &&
            mainFields.map((field) => (
              <Grid item xs={field.size || 12} key={field.name}>
                <FieldRenderer
                  fieldProps={field}
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  extraData={extraData}
                />
              </Grid>
            ))}
          {shouldRenderTabs &&
            tabIndex === 1 &&
            htmlFields.map((field) => (
              <Grid item xs={field.size || 12} key={field.name}>
                <FieldRenderer
                  fieldProps={field}
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  extraData={extraData}
                />
              </Grid>
            ))}

          {shouldRenderTabs &&
            tabIndex === 2 &&
            metaFields.map((field) => (
              <Grid item xs={field.size || 12} key={field.name}>
                <FieldRenderer
                  fieldProps={field}
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  extraData={extraData}
                />
              </Grid>
            ))}
          <Grid item xs={12} textAlign="center">
            <ButtonGroup>
              {mergedButtons.first_button.show && (
                <LinkButton
                  color="error"
                  variant="contained"
                  to={mergedButtons.first_button.navigateTO}
                  relative="path"
                  buttonText={mergedButtons.first_button.name}
                  sx={{ width: '10rem' }}
                />
              )}
              {mergedButtons.second_button.show && (
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{ width: '10rem' }}
                  disabled={isSubmitting}
                >
                  {mergedButtons.second_button.name}
                </Button>
              )}
            </ButtonGroup>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}

export default FormGenerator;
