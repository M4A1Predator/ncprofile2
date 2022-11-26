export default class WebSettingService {

  constructor({ webInfoRepo }) {
    this.webInfoRepo = webInfoRepo
  }

  getWebInfo() {
    return this.webInfoRepo.getWebInfo()
  }

}