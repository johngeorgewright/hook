import type { EventEmitter } from 'events'
import type Hook from './Hook'
import type HookName from './HookName'

export default function runner<Hooks extends Record<HookName, Hook>>(
  emitter: EventEmitter,
  hooks: Hooks,
  fn: (hooks: Hooks) => void
) {
  let queued = false
  let running = false

  return run

  function run() {
    if (!running) {
      running = true
      exec()
      running = false
    } else if (!queued) {
      queued = true
    }
  }

  function exec() {
    fn(hooks)
    emitter.emit('finished')

    if (queued) {
      queued = false
      exec()
    }
  }
}
