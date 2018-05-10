class API {
  constructor({ url }) {
    this.url = url;
    this.endpoints = {};
  }
  /**
   * Create and store a single entity's endpoints
   */
  createEntity(entity) {
    this.endpoints[entity.name] = this.createBasicCRUDEndpoints(entity);
  }
  createEntities(arrayofEntity) {
    arrayofEntity.forEach(this.createEntity.bind(this));
  }

  createBasicCRUDEndpoints({ name }) {
    var endpoints = {};

    const resourceURL = `${this.url}/${name}`;
    endpoints.getAll = async ({ query } = {}) => {
      const response = await fetch(resourceURL, {
        method: "GET",
        params: { query }
      });
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body;
    };
    endpoints.getOne = async ({ id }) => {
      const response = await fetch(`${resourceURL}/${id}`);
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body;
    };
    endpoints.create = async toCreate => {
      const response = await fetch(resourceURL, {
        method: "POST",
        body: JSON.stringify(toCreate),
        headers: new Headers({
          "Content-Type": "application/json"
        })
      });
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body;
    };
    endpoints.update = async toUpdate => {
      const response = await fetch(`${resourceURL}/${toUpdate._id}`, {
        method: "PUT",
        body: JSON.stringify(toUpdate),
        headers: new Headers({
          "Content-Type": "application/json"
        })
      });
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body;
    };

    endpoints.delete = async ({ id }) => {
      const response = await fetch(`${resourceURL}/${id}`, {
        method: "DELETE"
      });
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body;
    };
    return endpoints;
  }
}
export default API;
