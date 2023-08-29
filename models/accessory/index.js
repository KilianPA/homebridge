const model = require('./model');

class Accessory {
  #id;
  #name;
  #status;

  constructor(id, name, status) {
    this.#id = id;
    this.#name = name;
    this.#status = status;
  }

  get status() {
    return this.#status;
  }

  get name() {
    return this.#name;
  }
  
  async refresh() {
    const accessory = await Accessory.get(this.#id);
    this.#name = accessory.name;
    this.#status = accessory.status;
  }

  static async factory(id) {
    const accessory = await Accessory.get(id);
    return new Accessory(accessory.id, accessory.name, accessory.status);
  }

  static async get(id) {
    return model.get(id);
  }

  async update(accessory) {
    return model.update(this.#id, accessory);
  }
}

module.exports = Accessory;
