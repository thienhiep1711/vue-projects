import { tryCatch, identity, ifElse, getProp, map, pipe, partial } from 'lib/utils'
import { selectAll, getData, setData } from 'lib/dom'
import Factory from 'lib/factory'

const factories = {}

/**
 * Require a module by name
 *
 * @param {string} name
 * @return {Function|Object}
 */
const requireModule = (name) => require('modules/' + name + '/' + name + '.js')

/**
 * Handle exception
 *
 * @param {Error} err
 * @returns {boolean}
 */
const handleError = (err) => {
  console.log(err.toString())
  return false
}

/**
 * Check to see if a module is an ES6 wrapper
 *
 * @param {Function|Object} val
 * @return {boolean}
 */
const isEs6Module = (val) => typeof val === 'object' && typeof val.default !== 'undefined'

/**
 * Create new module instance for element
 *
 * @param {HTMLElement} el
 * @param {Function} Module
 * @returns {Module}}
 */
const runModule = (el, Module) => {
  let instance
  try {
    instance = new Module(el)
  } catch (err) {
    console.log(el, Module)
    console.error(err)
  }

  return instance
}

const isFactory = (el, Module) => typeof Module.moduleName !== 'undefined'

const getFactory = (Module) => {
  if (typeof factories[Module.moduleName] === 'undefined') {
    factories[Module.moduleName] = new Factory(Module)
  }

  return factories[Module.moduleName]
}

const getInstance = (el, factory) => factory.get(el)

const getModule = (el, Module) => pipe(
  ifElse(
    partial(isFactory, el),
    pipe(
      getFactory,
      partial(getInstance, el)
    ),
    partial(runModule, el)
  )
)(Module)

/**
 * Initialize module based on attribute name
 *
 * @param {HTMLElement} el
 * @returns {HTMLElement|Module}
 */
const initializeModuleForEl = (el) => {
  return pipe(
    setData('module-initialized', '1'),
    getData('module-init'),
    (val) => val.split(' '),
    map(
      pipe(
        tryCatch(requireModule, handleError),
        ifElse(isEs6Module, getProp('default'), identity),
        partial(getModule, el)
      )
    )
  )(el)
}

/**
 * Finds all elements with a "data-module-init" attribute
 * and calls the corresponding script
 *
 * @return {Array<HTMLElement|Object>}
 */
export default () => {
  const allModules = selectAll('[data-module-init]')
  const modulesInsideVue = selectAll('[data-app] [data-module-init]')

  const nonVueModules = allModules.filter(module => modulesInsideVue.indexOf(module) === -1)
  nonVueModules.map(initializeModuleForEl)
}

export {
  initializeModuleForEl,
  getModule
}
