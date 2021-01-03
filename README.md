# @johngw/hook

> React like system without the need to render views.

Very early days yet.

## Use

```typescript
import flow from '@johngw/hook'

flow(({ useMemo, useState }) => {
  const [count, setCount] = useState(0)

  useMemo(() => {
    console.info(count)
  }, [count])

  setInterval(() => {
    setCount(count + 1)
  }, 1_000)
})
```
