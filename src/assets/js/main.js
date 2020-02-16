import { ready } from 'lib/dom'
import { pipe } from 'lib/utils'
import initializeModules from 'lib/init-modules'

ready(pipe(initializeModules))
