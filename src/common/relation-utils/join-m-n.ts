/**
 * Flatten Prisma many-to-many join
 *
 * record: {
 *   id: true,
 *   intermediateTable: [
 *     {
 *       ...attr,
 *       targetTable: {...}
 *     }
 *   ]
 * }
 */
export function flattenPrismaMNJoin(
  obj,
  intermediateTable,
  targetTable,
  intermediateTableKeepFields = [],
) {
  const newObj = { ...obj };
  const intermediateTableObject: any[] = obj[intermediateTable];

  if (intermediateTableObject) {
    delete newObj[intermediateTable];

    newObj[targetTable] = intermediateTableObject.map((i) => {
      return {
        ...i[targetTable],
        ...intermediateTableKeepFields.reduce((acc, cur) => {
          acc[cur] = i[cur];
          return acc;
        }, {}),
      };
    });
  }

  return newObj;
}

export function flattenPrismaMNJoinMany(
  objs,
  intermediateTable,
  targetTable,
  intermediateTableKeepFields = [],
) {
  return objs.map((obj) =>
    flattenPrismaMNJoin(
      obj,
      intermediateTable,
      targetTable,
      intermediateTableKeepFields,
    ),
  );
}
