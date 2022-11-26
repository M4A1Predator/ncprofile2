class Container {
  constructor () {
    this._services = {}
  }

  service(name, cb) {
    Object.defineProperty(this, name, {
      get() {
        if(!this._services.hasOwnProperty(name)){
            this._services[name] = cb(this);
        }

        return this._services[name];
      },
      configurable: true,
      enumerable: true
    })
    return this
  }
}

export default class ContainerFactory {
  constructor() {
    throw new Error("Constructor not available")
  }

  static instance() {
    if (!this._instance) {
      this._instance = new Container()
    }
    return this._instance
  }
}
