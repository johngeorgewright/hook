import memoHook from './MemoHook'
import flow from './Flow'

test('basics', (done) => {
  let index = 0

  flow(
    {
      useMemo: memoHook,
    },
    ({ useMemo, useState }) => {
      index++
      const [foo, setFoo] = useState('foo')

      useMemo(() => {
        if (index === 1) {
          expect(foo).toBe('foo')
          setFoo('poo')
        } else {
          expect(foo).toBe('poo')
          done()
        }
      }, [foo])
    }
  )
})
