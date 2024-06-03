import { forOwn } from 'lodash';
import { AnyObject } from 'yup';
import { useEffect, useState } from 'react';

const useEmptyObjectGenerator = <T extends AnyObject>(yupObject: AnyObject) => {
  const [newObj, setNewObj] = useState<Partial<T>>({});
  useEffect(() => {
    const generateEmptyObject = (): Partial<T> => {
      const emptyObject: Partial<T> = {};
      const yupObjectInstructions = yupObject.describe().fields;

      forOwn(yupObjectInstructions, (v, k) => {
        let value: any;
        if (v.nullable) {
          emptyObject[k as keyof T] = null as any;
          return;
        }
        switch (v.type) {
          case 'array':
            value = [];
            break;
          case 'date':
            value = new Date().toLocaleDateString('en-CA');
            break;
          case 'string':
            value = '';
            break;
          case 'number':
            value = NaN;
            break;
          default:
            value = null;
        }
        emptyObject[k as keyof T] = value;
      });
      return emptyObject;
    };
    setNewObj(generateEmptyObject());
  }, [yupObject]);
  return newObj as T;
};

export default useEmptyObjectGenerator;
