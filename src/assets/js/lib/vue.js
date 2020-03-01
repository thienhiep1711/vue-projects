/* global Node */

import { removeAttribute, selectAll } from 'lib/dom'
import { getProp, pipe, map, toPascalCase } from 'lib/utils'
import store from 'lib/store'
import Vue from 'vue'
import { initializeModuleForEl } from 'lib/init-modules'

/**
 * Contains cached vue component definitions
 * @type {{}}
 */
const vueCache = {}
const vuexCache = {}

const createMountedHook = (oldMounted) => function () {
  if (this.$el) {
    if (this.$el.nodeType === Node.ELEMENT_NODE) {
      selectAll('[data-module-init]:not([data-module-initialized])', this.$el)
        .map(initializeModuleForEl)
    }
  }

  if (oldMounted) {
    oldMounted.bind(this)()
  }
}

const initializeAppForEl = (el) => {
  removeAttribute('data-app', el)

  return new Vue({
    el: el,
    components: getVueComponents(),
    mounted: createMountedHook(),
    store
  })
}

const getVueComponents = () => {
  if (!Object.keys(vueCache).length) {
    const req = require.context('modules', true, /\.vue$/)

    req.keys().forEach(filename => {
      const Component = req(filename).default
      const name = filename.split('/').pop().replace(/\.vue$/, '')
      const tag = toPascalCase(name)

      if (Object.getPrototypeOf(Component).getClassName && Object.getPrototypeOf(Component).getClassName() === 'Component') {
        return
      }

      vueCache[tag] = Component
      Vue.component(tag, Component)
    })
  }

  return vueCache
}

const initVue = (parent = document) => {
  const req = require.context('modules', true, /\.vue.js$/)
  req.keys().map((filename) => {
    const name = filename.split('/').pop().replace('.vue.js', '')
    const namespace = name.replace(/-([a-z])/g, (matched) => matched[1].toUpperCase())

    const component = pipe(
      req,
      getProp('default'),
      (Component) => new Component(name, namespace)
    )(filename)

    if (!vuexCache[namespace]) {
      const componentStore = component.store()

      if (componentStore) {
        // force store module namespace
        componentStore.namespaced = true
        store.registerModule(namespace, componentStore)
        vuexCache[namespace] = true
      }
    }

    const args = component.register()
    if (args) {
      const oldMounted = args.mounted || function () {}
      args.mounted = createMountedHook(oldMounted)
      component.setInstance(Vue.component(name, args))
    }
  })

  initVueAppDiv(parent)
}

const initVueAppDiv = (parent = document) => pipe(selectAll, map(initializeAppForEl))('[data-app]', parent)

const initializeVueAppComponent = (el) => {
  removeAttribute('data-vue', el)

  const components = getVueComponents()

  return new Vue({
    el,
    components,
    store
  })
}

const initVueSingleFile = (parent = document) => {
  pipe(selectAll, map(initializeVueAppComponent))('[data-vue]', parent)
}

const initVuex = () => {
  const req = require.context('modules', true, /\.vuex\.js$/)
  req.keys().map((filename) => {
    req(filename).default()
  })
}

export {
  initVue,
  initVueAppDiv,
  initVueSingleFile,
  initVuex
}
