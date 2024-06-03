import { AnyObject } from 'yup';
import _ from 'lodash';

function flattenObject(obj: AnyObject) {
  const result: AnyObject = {};

  function flatten(current: AnyObject, propertyPrefix: string = ''): void {
    _.forEach(current, (value, key) => {
      const newKey = propertyPrefix ? `${propertyPrefix}.${key}` : key;
      if (_.isObject(value) && value !== null && !_.isArray(value)) {
        flatten(value, newKey);
      } else {
        result[newKey] = value;
      }
    });
  }

  flatten(obj);
  return result;
}

const onlyModifiedFields = <T>(values: AnyObject, initObject: AnyObject) => {
  const flattenedInit = flattenObject(initObject);
  const resultObject: AnyObject = {};

  _.forEach(flattenedInit, (initialValue, key) => {
    const newValue = _.get(values, key);
    if (!_.isEqual(newValue, initialValue)) {
      _.set(resultObject, key, newValue);
    }
  });

  return resultObject as T;
};

export default onlyModifiedFields;
