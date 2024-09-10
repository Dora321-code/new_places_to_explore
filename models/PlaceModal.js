class Place {
    constructor(id, title, imageUri,likes, address, lat, lng, description, ownerId) {
      this.id = id;
      this.title = title;
      this.likes = likes;
      this.imageUri = imageUri;
      this.address = address;
      this.lat = lat;
      this.lng = lng;
      this.description = description;
      this.ownerId = ownerId
    }
  }

  
  export default Place;

  export class Collection {
    constructor(id, title, imageUri, address, lat, lng, description, ownerId){
      this.id = id;
      this.title = title;
      this.imageUri = imageUri;
      this.address = address;
      this.lat = lat;
      this.lng = lng;
      this.ownerId = ownerId
    }
  }
