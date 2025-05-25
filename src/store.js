import { objVehicles, objPeoples, objPlanets } from "./components/objects";

export const initialStore = () => {
  return {
    vehicles: objVehicles,
    peoples: objPeoples,
    planets: objPlanets
  };
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'updated_object': {
      const { object, id, typeObj } = action.payload;
      return {
        ...store,
        [typeObj]: store[typeObj].map(item =>
          item.uid === id
            ? { ...item, result: object }
            : item
        )
      };
    }
    case 'shift_favorite': {
      const { id, typeObj } = action.payload;
      return {
        ...store,
        [typeObj]: store[typeObj].map(item =>
          item.uid === id
            ? { ...item, favorite: !item.favorite }
            : item
        )
      };
    }
    default:
      throw Error('Unknown action.');
  }
}
