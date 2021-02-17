# Headless Pagination React

React hook that provides the functionality from [`headless-pagination`](../headless-pagination/readme.md)

## Installation

Both the core library and this react adapter are required

```bash
npm i -S headless-pagination headless-pagination-react
```

## Usage

This hook simply exposes the values provided by the core library. To read more about their usages, visit the [headless-pagination](../headless-pagination/readme.md) documentation.

**Note:** In the core library, values (such as `from`, `to`, `links`, etc) are exposed as functions that return a value. In this hook they are **not** functions, they simply expose the raw underlying value.

```javascript
import usePagination from 'headless-pagination-react';

function Component() {
  const {
    page,
    links,
    hasNext,
    hasPrevious,
    from,
    to,
    setPage,
    onNext,
    onPrevious,
  } = usePagination({
    totalItems: 1000, // required
    perPage: 24, // optional
    maxLinks: 7, // optional
    initialPage: 1, // optional
  });
}
```
