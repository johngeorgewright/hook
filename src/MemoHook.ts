import type HookCreator from './HookCreator'

const memoHook: HookCreator<MemoHook> = (useState) => (fn, deps) => {
  const [dependencies, setDependencies] = useState(deps)
  const [value, setValue] = useState(fn)
  const shouldRerun = deps.some((dep, i) => dependencies[i] !== dep)

  if (shouldRerun) {
    setDependencies(deps)
    setValue(fn())
  }

  return value
}

export default memoHook

export type MemoHook = <T>(fn: () => T, dependencies: unknown[]) => T
