import url from './common'

class TargetDataService {
  getAll() {
    return url.get("/target");
  }

  get(id) {
    return url.get(`/target/${id}`);
  }

  create(data) {
    return url.post("/target", data);
  }

  update(id, data) {
    return url.put(`/target/${id}`, data);
  }

  delete(id) {
    return url.delete(`/target/${id}`);
  }

  deleteAll() {
    return url.delete(`/target`);
  }

  findByUrl(title) {
    return url.get(`/target?title=${title}`);
  }
}

export default new TargetDataService();
