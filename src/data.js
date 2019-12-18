import {processData} from './helpers';
const dataNotReplaced = processData();

/**
 * Replaces all occurrences of needle (interpreted as a regular expression with replacement and returns the new object.
 *
 * @param entity The object on which the replacements should be applied to
 * @param needle The search phrase (as a regular expression)
 * @param replacement Replacement value
 * @param affectsKeys[optional=true] Whether keys should be replaced
 * @param affectsValues[optional=true] Whether values should be replaced
 */
Object.replaceAll = function(
  entity,
  needle,
  replacement,
  affectsKeys,
  affectsValues,
) {
  affectsKeys = typeof affectsKeys === 'undefined' ? true : affectsKeys;
  affectsValues = typeof affectsValues === 'undefined' ? true : affectsValues;

  var newEntity = {},
    regExp = new RegExp(needle, 'g');
  for (var property in entity) {
    if (!entity.hasOwnProperty(property)) {
      continue;
    }

    var value = entity[property],
      newProperty = property;

    if (affectsKeys) {
      newProperty = property.replace(regExp, replacement);
    }

    if (affectsValues) {
      if (typeof value === 'object') {
        value = Object.replaceAll(
          value,
          needle,
          replacement,
          affectsKeys,
          affectsValues,
        );
      } else if (typeof value === 'string') {
        value = value.replace(regExp, replacement);
      }
    }

    newEntity[newProperty] = value;
  }

  return newEntity;
};

const dataWithBuildPath = Object.values(
  Object.replaceAll(
    dataNotReplaced,
    '/uploads',
    'https://lusi-dataviz.ylestatic.fi/2019-11-ulkolinja-venaja/uploads',
  ),
);

let data =
  process.env.BUILD_PATH === 'fynd' ? dataWithBuildPath : dataNotReplaced;
export {data};
