import { EventEmitter } from 'events'
import { mapObjIndexed } from 'ramda'
import type Hook from './Hook'
import type HookCreator from './HookCreator'
import type HookDependencies from './HookDependencies'
import type HookName from './HookName'
import runner from './Runner'
import stateHook from './StateHook'

export default function flow<
  HookCreators extends Record<HookName, HookCreator<Hook>>,
  Hooks extends Record<HookName, Hook> = HookDependencies<HookCreators>
>(hookCreators: HookCreators, fn: (hooks: Hooks) => void) {
  const emitter = new EventEmitter()
  const useState = stateHook(emitter)
  const hooks = mapObjIndexed(
    (hookCreator) => hookCreator(useState),
    hookCreators
  ) as Hooks
  const run = runner(emitter, { ...hooks, useState }, fn)
  emitter.on('run', run)
  run()
}
