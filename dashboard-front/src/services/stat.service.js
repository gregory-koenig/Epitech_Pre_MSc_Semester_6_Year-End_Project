import url from './common'

class StatDataService {
  newClick(data) {
    return url.post("/stat/newclick", data);
  }
}

export default new StatDataService();
