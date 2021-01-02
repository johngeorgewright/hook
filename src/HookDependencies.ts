import HookCreator from './HookCreator'
import HookName from './HookName'
import { StateHook } from './StateHook'

type HookDependencies<
  HookCreators extends Record<HookName, HookCreator<any>>
> = { useState: StateHook } & {
  [Name in keyof HookCreators]: HookCreators[Name] extends HookCreator<infer H>
    ? H
    : never
}

export default HookDependencies
