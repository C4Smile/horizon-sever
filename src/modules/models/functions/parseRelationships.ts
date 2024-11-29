/**
 *
 * @param entity entity to parse
 * @returns parsed entity
 */
export const parseRelationships = (entity: any) => {
  const newEntity: any = {};
  Object.keys(entity).forEach((key) => {
    switch (key) {
      case "type": {
        if (entity.type) {
          newEntity.typeId = entity.type.id;
          delete entity.type;
        }
        break;
      }
      default:
        newEntity[key] = entity[key];
        break;
    }
  });
  return newEntity;
};
