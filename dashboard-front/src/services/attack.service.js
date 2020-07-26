import url from './common'

class DetectDataService {
  attack() {
    return url.get("/attack");
  }

  getDoc() {
    return url.get("/attack/report");
  }
}

export default new DetectDataService();
