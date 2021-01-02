import HookCreator from './HookCreator'

const callbackHook: HookCreator<CallbackHook> = (useState) => (fn, deps) => {
  const [dependencies, setDependencies] = useState(deps)
  const [value, setValue] = useState(() => fn)
  const shouldRerun = deps.some((dep, i) => dependencies[i] !== dep)

  if (shouldRerun) {
    setDependencies(deps)
    setValue(fn)
  }

  return value
}

export default callbackHook

type CallbackHook = <Args extends unknown[], Rtn, Fn = (...args: Args) => Rtn>(
  fn: Fn,
  dependencies: unknown[]
) => Fn
