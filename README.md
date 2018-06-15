# idle-callback
Strongly-typed requestIdleCallback polyfill


```typescript
import { requestIdleCallback, cancelIdleCallback } from 'idle-callback';

const id = requestIdleCallback(
    (deadline: IdleDeadline) => {
        while (deadline.timeRemaining() > 0) {
            // perform some work
        }
    },
    { timeout: 1000 },
);

cancelIdleCallback(id);
```