import type Hook from './Hook'
import { StateHook } from './StateHook'

export default interface HookCreator<H extends Hook> {
  (useState: StateHook): H
}
