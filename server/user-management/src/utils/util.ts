/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

/**
 * @method omit
 * @param {Object} value
 * @param {Array} omitKeys
 * @returns {Object} with omitKeys removed
 * @description returns a new object with omitKeys removed
 */
export const omit = (obj: object, omitKeys: string[]): object => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (!omitKeys.includes(key)) {
      acc[key] = value;
    }
    return acc;
  }, {});
};
