import nanoajax from 'nanoajax'

const nanoPromise = (params, type = 'json') => new Promise((resolve, reject) => {
  if (type === 'document') {
    params.responseType = 'document'
  }
  nanoajax.ajax(
    params,
    (code, response) => {
      if (code === 200 && response) {
        if (type === 'json') {
          try {
            response = JSON.parse(response)
          } catch (e) {
          }
        }
        resolve(response)
      } else {
        reject(response)
      }
    }
  )
})

const fetchData = (endpoint, type = 'json') => {
  const params = {
    url: endpoint,
    method: 'GET'
  }
  return nanoPromise(params, type)
}

export {
  fetchData,
  nanoPromise
}
