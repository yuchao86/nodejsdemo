const fs = require('fs')
const async_hooks = require('async_hooks')

async_hooks.createHook({
  init (asyncId, type, triggerAsyncId, resource) {
    fs.writeSync(1, `init ${type}(${asyncId}): trigger: ${triggerAsyncId}\n`, resource)
  },
  destroy (asyncId) {
    fs.writeSync(1, `destroy: ${asyncId}\n`);
  }
}).enable()

async function A () {
  fs.writeSync(1, `A -> ${async_hooks.executionAsyncId()}\n`)
  setTimeout(() => {
    fs.writeSync(1, `A in setTimeout -> ${async_hooks.executionAsyncId()}\n`)
    B()
  })
}

async function B () {
  fs.writeSync(1, `B -> ${async_hooks.executionAsyncId()}\n`)
  setTimeout(() => {
    fs.writeSync(1, `B in setTimeout -> ${async_hooks.executionAsyncId()}\n`)
  })
}

fs.writeSync(1, `top level -> ${async_hooks.executionAsyncId()}\n`)
A()
