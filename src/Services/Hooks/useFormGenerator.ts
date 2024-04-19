import { useEffect, useState } from 'react';
import { isString } from 'lodash';
import formHelper from '../Helpers/formHelper.json';
import { FormDataNames } from '../../Models/dataNames';
import { FormHelper } from '../../Models/JSONHelpers';
import { ApiCallback } from '../../Models/AxiosResponse';

const useFormGenerator = (
  typeKey: FormDataNames,
  dataType?: string,
  options?: { edit: boolean; data: ApiCallback }
) => {
  const [emptyForm, setEmptyForm] = useState<Partial<ApiCallback> | object>({});
  const [htmlInput, setHtmlInput] = useState('');
  const [arrayInput, setArrayInput] = useState<string[] | []>([]);

  useEffect(() => {
    const untypedObject: FormHelper[FormDataNames] = formHelper[typeKey];
    const newForm = Object.keys(untypedObject).reduce(
      (acc: Record<string, any>, key) => {
        if (dataType || options?.edit) {
          if (
            key in untypedObject &&
            untypedObject[key as keyof FormHelper[FormDataNames]]?.regex
          ) {
            acc[key] = false;
          } else if (options?.edit) {
            if (
              untypedObject[key as keyof FormHelper[FormDataNames]]?.type ===
              'input-html'
            ) {
              setHtmlInput(options.data[key as keyof ApiCallback]);
            }
            if (
              untypedObject[key as keyof FormHelper[FormDataNames]]?.type ===
              'input-array'
            ) {
              if (isString(options.data[key as keyof ApiCallback])) {
                setArrayInput(
                  JSON.parse(options.data[key as keyof ApiCallback])
                );
              } else {
                setArrayInput(
                  options.data[key as keyof ApiCallback] as unknown as string[]
                );
              }
            }
          }
        } else {
          // eslint-disable-next-line no-lonely-if
          if (
            untypedObject[key as keyof FormHelper[FormDataNames]]?.type ===
            'input-array'
          ) {
            acc[key] = [];
          } else if (
            untypedObject[key as keyof FormHelper[FormDataNames]]
              ?.value_type === 'number'
          ) {
            acc[key] = 0;
          } else if (
            untypedObject[key as keyof FormHelper[FormDataNames]]
              ?.value_type === 'null'
          ) {
            acc[key] = null;
          } else {
            acc[key] = '';
          }
        }
        return acc;
      },
      {}
    );
    setEmptyForm(newForm);
  }, [typeKey, dataType, options?.edit]);

  return { emptyForm, htmlInput, setHtmlInput, arrayInput, setArrayInput };
};

export default useFormGenerator;
