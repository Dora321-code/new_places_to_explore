import { ADD_COLLECTION, ADD_PLACE, SET_COLLECTION, SET_PLACES  } from '../actions/placeActions';
import Place, { Collection } from '../../models/PlaceModal';

const initialState = {
  places: [],
  userPlaces:[],
  userCollection:[]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
        return {
          ...state,
          places: action.LoadedPlaces,
          userProducts: action.userPlaces
        };
    case SET_COLLECTION:
      const userFoundCollections = []
      action.userCollectionPlaces.map(place => {
         for (let x = 0; x < state.places.length; x++) {
          const element = state.places[x];
          if (element.id === place.placeId) {
            const data = new Collection(
              element.id,
              element.title,
              element.imageUri,
              element.address,
              element.lat,
              element.lng,
              element.ownerId
            )

            userFoundCollections.concat(data);
          }   
         }
      })
        return {
          ...state,
          userCollection: userFoundCollections,
        };
    case ADD_COLLECTION:
        const userCollectionPlaces = state.places.filter(place => place.id === action.placeCollectionData.placeId);
        console.log('userCollection' + userCollectionPlaces);
        const newCol = new Collection(
          userCollectionPlaces[0].id,
          userCollectionPlaces[0].title,
          userCollectionPlaces[0].imageUri,
          userCollectionPlaces[0].address,
          userCollectionPlaces[0].lat,
          userCollectionPlaces[0].lng,
          userCollectionPlaces[0].ownerId
        );
        return{
          ...state,
          userCollection:state.userCollection.concat(newCol)
        }
    case ADD_PLACE:
      const newPlace = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.imageUri,
        action.placeData.likes,
        action.placeData.address,
        action.placeData.lat,
        action.placeData.lng,
        action.placeData.description,
        action.placeData.ownerId
      );
      return {
        ...state,
        places: state.places.concat(newPlace),
        userPlaces: state.userPlaces.concat(newPlace)
      };
    default:
      return state;
  }
};
