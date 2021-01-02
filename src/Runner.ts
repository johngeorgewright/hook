import type { EventEmitter } from 'events'
import Hook from './Hook'
import HookName from './HookName'

export default function runner<Hooks extends Record<HookName, Hook>>(
  emitter: EventEmitter,
  hooks: Hooks,
  fn: (hooks: Hooks) => void
) {
  let queued = false
  let running = false

  return () => {
    if (!running) {
      run()
    } else if (!queued) {
      queued = true
      emitter.once('finished', run)
    }
  }

  function run() {
    running = true
    queued = false
    fn(hooks)
    running = false
    emitter.emit('finished')
  }
}
