import * as t from 'io-ts';
import { PathReporter } from 'io-ts/lib/PathReporter';
import jsonInstructions from './fieldInstructions.json';

const genericField = t.type({
  name: t.string,
  type: t.union([
    t.literal('input'),
    t.literal('date'),
    t.literal('html'),
    t.literal('array'),
    t.literal('dropdown'),
  ]),
  label: t.string,
  strictType: t.union([t.string, t.undefined]),
  size: t.union([t.number, t.undefined]), //
});

const fieldListInstructions = t.record(t.string, t.array(genericField));

const decodeJson = (json: unknown) => {
  const result = fieldListInstructions.decode(json);
  // eslint-disable-next-line no-underscore-dangle
  if (result._tag === 'Right') {
    return result.right;
  }
  console.error('Invalid JSON:', PathReporter.report(result));
  return null;
};

const getFields = (key: string) => {
  const decodedJson = decodeJson(jsonInstructions);
  if (decodedJson && decodedJson[key]) {
    return decodedJson[key];
  }
  console.error(`Key "${key}" not found or invalid.`);
  return [];
};
export default getFields;
