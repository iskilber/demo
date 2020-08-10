export function deepFreeze<T>(inObj: T): T {
  Object.freeze(inObj);

  Object.getOwnPropertyNames(inObj).forEach(function (prop) {
    if (inObj.hasOwnProperty(prop)
      && inObj[prop] != null
      && typeof inObj[prop] === 'object'
      && !Object.isFrozen(inObj[prop])) {
        deepFreeze(inObj[prop]);
      }
  });
  return inObj;
}

export function naiveObjectComparison(objOne, objTwo): boolean {
  return JSON.stringify(objOne) === JSON.stringify(objTwo);
}