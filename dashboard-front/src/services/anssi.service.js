import url from './common'

class AnssiDataService {
  search(title) {
    return url.post("/rss/search", title);
  }
}

export default new AnssiDataService();
