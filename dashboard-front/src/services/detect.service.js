import url from './common'

class DetectDataService {
  scan(data) {
    return url.post("/detect/scan", data);
  }

  getDoc() {
    return url.get("/detect/scan/report");
  }
}

export default new DetectDataService();
