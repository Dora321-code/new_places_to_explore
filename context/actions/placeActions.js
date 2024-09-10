import * as FileSystem from "expo-file-system";

import vars from "../../env";
import Place from "../../models/PlaceModal";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";
export const CREATE_PLACE = "CREATE_PLACE";
export const ADD_COLLECTION = "ADD_COLLECTION";
export const ADD_VIEW = "ADD_VIEW";
export const SET_COLLECTION = "SET_COLLECTION";


const locationss = [
  { name: "Dar es Salaam", lat: -6.7924, lng: 39.2083 },
  { name: "Arusha", lat: -3.3869, lng: 36.6820 },
  { name: "Zanzibar City", lat: -6.1659, lng: 39.2026 },
  { name: "Mwanza", lat: -2.5164, lng: 32.9175 },
  { name: "Dodoma", lat: -6.1630, lng: 35.7516 },
  { name: "Mbeya", lat: -8.9093, lng: 33.4608 },
  { name: "Morogoro", lat: -6.8278, lng: 37.6591 },
  { name: "Tanga", lat: -5.0667, lng: 39.0989 },
  { name: "Kilimanjaro", lat: -3.0659, lng: 37.3556 },
  { name: "Tabora", lat: -5.0161, lng: 32.8266 },

];

function getRandomLocation() {
  const randomIndex = Math.floor(Math.random() * locationss.length);
  return locationss[randomIndex];
}


export const addPlace = (title, description, image, location) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    console.log("-------------------------------------");
    console.log(location);

    // const response = await fetch(
    //   `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${vars.googleApiKey}`
    // );
    // console.log("-------------------------------------");
    // console.log(response);
    // if (!response.ok) {
    //   throw new Error("Something went wrong! could not get Address");
    // }

    // const resData = await response.json();
    // if (!resData.results) {
    //   throw new Error("Something went wrong! check your internet");
    // }

    // console.log(resData);

    // const address = resData.results[0].formatted_address;

    const locationa = getRandomLocation();

    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });

      const dbResult = {
        title: title,
        description: description,
        likes: 0,
        imageUri: newPath,
        address: locationa.name,
        lat: location.lat,
        lng: location.lng,
        ownerId: userId,
      };

      const toDatabase = await fetch(
        `https://best-places-app-v2-default-rtdb.firebaseio.com/places.json?auth=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dbResult),
        }
      );

      console.log(toDatabase);

      if (!toDatabase.ok) {
        throw new Error("Something went wrong! failed to add place");
      }

      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: Math.random(),
          description: description,
          title: title,
          image: newPath,
          address: address,
          likes: 0,
          coords: {
            lat: location.lat,
            lng: location.lng,
          },
          ownerId: userId,
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch, getState) => {
    // any async code you want!
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        "https://best-places-app-v2-default-rtdb.firebaseio.com/places.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      console.log(resData);
      const loadedPlaces = [];

      for (const key in resData) {
        loadedPlaces.push(
          new Place(
            key,
            resData[key].title,
            resData[key].imageUri,
            resData[key].likes,
            resData[key].address,
            resData[key].lat,
            resData[key].lng,
            resData[key].description,
            resData[key].ownerId
          )
        );
      }

      dispatch({
        type: SET_PLACES,
        LoadedPlaces: loadedPlaces,
        userPlaces: loadedPlaces.filter((place) => place.ownerId === userId),
      });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const add_to_collection = (placeId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    try {
      const dbResult = {
        placeId: placeId,
        userId: userId,
      };

      const toDatabase = await fetch(
        `https://best-places-app-v2-default-rtdb.firebaseio.com/collection.json?auth=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dbResult),
        }
      );

      console.log(toDatabase);

      if (!toDatabase.ok) {
        throw new Error("Something went wrong! failed to add place");
      }

      dispatch({
        type: ADD_COLLECTION,
        placeCollectionData: {
          id: Math.random(),
          placeId: placeId,
          ownerId: userId,
        },
      });
    } catch (error) {
      throw error;
    }
  };
};

export const addViews =  (placeId, likes) => {
  return async (dispatch, getState) => {
  console.log(likes);
  try {
    const dbResult = {
      "likes": likes,
    };

    const toDatabase = await fetch(
      `https://best-places-app-v2-default-rtdb.firebaseio.com/places/${placeId}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dbResult),
      }
    );
    console.log(toDatabase);

    if (!toDatabase.ok) {
      throw new Error("Something went wrong! failed to add place");
    }

  } catch (error) {
    throw error;
  }
}
};

export const deletePlace = (placeId) => {
  return async (dispatch, getState) => {
  try {
    const toDatabase = await fetch(
      `https://best-places-app-v2-default-rtdb.firebaseio.com/places/${placeId}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(toDatabase);

    if (!toDatabase.ok) {
      throw new Error("Something went wrong! failed to delete place!");
    }

  } catch (error) {
    throw error;
  }
}
};

export const loadCollection = () => {
  return async (dispatch, getState) => {
    // any async code you want!
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        "https://best-places-app-v2-default-rtdb.firebaseio.com/collection.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const collectionPlaces = [];

      for (const key in resData) {
        collectionPlaces.push({
          id: key,
          placeId: resData[key].placeId,
          ownerId: resData[key].userId,
        });
      }

      dispatch({
        type: SET_COLLECTION,
        userCollectionPlaces: collectionPlaces.filter(
          (place) => place.ownerId === userId
        ),
      });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};
