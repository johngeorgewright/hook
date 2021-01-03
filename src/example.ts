import flow from './Flow'
import memoHook from './MemoHook'

flow({ useMemo: memoHook }, ({ useMemo, useState }) => {
  console.info('flow')
  const [count, setCount] = useState(0)

  useMemo(() => {
    console.info('---->', count)
    setTimeout(() => setCount(count + 1), 1_000)
  }, [count])
})
