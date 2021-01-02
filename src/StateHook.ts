import type { EventEmitter } from 'events'
import { isFunction } from './util/Lang'

export default function stateHook(emitter: EventEmitter): StateHook {
  let index: number = 0

  const states = new Map<number, unknown>()

  const stateInitializer: StateHook = (initialValue) => {
    const i = index++
    const value = isFunction(initialValue) ? initialValue() : initialValue
    states.set(i, value)
    return [value, stateSetter(i)]
  }

  const useState: StateHook = <T>() => {
    const i = index++
    return [states.get(i) as T, stateSetter(i)]
  }

  let hook: StateHook = stateInitializer

  emitter.on('finished', () => {
    index = 0
    hook = useState
  })

  return (initialValue) => hook(initialValue)

  function stateSetter<T>(index: number) {
    return (value: T) => {
      states.set(index, value)
      emitter.emit('run')
    }
  }
}

export interface StateHook {
  <T>(initialValue: (() => T) | T): [T, (value: T) => void]
}
