# Headless Pagination

A small JavaScript library to help you determine what pagination links to show given any dataset.

Does not render anything to the UI, nor does it know anything about your data other than the size of it.

## Demo
View the demo at [headless-pagination.ozzie.sh](https://headless-pagination.ozzie.sh) and the demo's source [in the docs folder](./docs/src/App.tsx).

## Documentation

- Vanilla JS - [packages/headless-pagination/readme.md](./packages/headless-pagination/readme.md)
- React Adapter - [packages/headless-pagination-react/readme.md](./packages/headless-pagination-react/readme.md)

## Quick Start

**Vanilla JS**

```
$ npm install -S headless-pagination
```

```javascript
import Paginator from 'headless-pagination';

const paginator = new Paginator({
  totalItems: 1000,
  perPage: 24, 
});
```

**React**

```
$ npm i -S headless-pagination headless-pagination-react
```

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
    totalItems: 1000,
    perPage: 24,
  });
}
```
