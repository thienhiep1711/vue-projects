class Factory {
  constructor (InstanceConstructor) {
    this.InstanceConstructor = InstanceConstructor
    this.els = []
    this.instances = []
  }

  get (el) {
    const index = this.els.indexOf(el)
    if (index === -1) {
      return this.push(el)
    }
    return this.instances[index]
  }

  push (el) {
    const instance = new this.InstanceConstructor(el)
    this.els.push(el)
    this.instances.push(instance)
    return instance
  }

  getFunction () {
    return (el) => this.get(el)
  }
}

export default Factory
