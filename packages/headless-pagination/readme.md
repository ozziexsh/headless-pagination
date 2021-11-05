# Headless Pagination

## Installation

```bash
$ npm i -S headless-pagination
```

## Usage

- Paginator
  - [`constructor`](#constructor)
  - [`totalPages()`](#totalPages)
  - [`hasNext()`](#hasNext)
  - [`hasPrevious()`](#hasPrevious)
  - [`from()`](#from)
  - [`to()`](#to)
  - [`onNext()`](#onNext)
  - [`onPrevious()`](#onPrevious)
  - [`setPage()`](#setPage)
  - [`links()`](#links)

### `constructor`

```javascript
import Paginator from 'headless-pagination';

const paginator = new Paginator({
  totalItems: 1000, // required
  initialPage: 1, // optional (default shown), page to show at start
  perPage: 24, // optional (default shown), how many items you're showing per page
  maxLinks: 7, // optional (default shown, min value of 7), max number of pagination links to show
});
```

### `totalPages()`

Returns the total number of pages, takes into account a final page without necessarily having max items.

```javascript
import Paginator from 'headless-pagination';

const paginator = new Paginator({
  totalItems: 100,
  perPage: 24,
});

// would be 5 because 100 / 24 = 4.166...
console.log(paginator.totalPages());
```

### `hasNext()`

Whether or not there is a next page to navigate to. Useful for displaying/disabling arrow based navigation.

```javascript
import Paginator from 'headless-pagination';

const paginator = new Paginator({
  totalItems: 100,
  initialPage: 1,
});

// true
console.log(paginator.hasNext());
```

### `hasPrevious()`

Whether or not there is a previous page to navigate to. Useful for displaying/disabling arrow based navigation.

```javascript
import Paginator from 'headless-pagination';

const paginator = new Paginator({
  totalItems: 100,
  initialPage: 1,
});

// false, we're on page 1
console.log(paginator.hasPrevious());
```

### `from()`

Starting item we're currently displaying based on page offset. Useful for showing a message like `Showing 24 to 50 results of 100`.

```javascript
import Paginator from 'headless-pagination';

const paginator = new Paginator({
  totalItems: 100,
  initialPage: 2,
  perPage: 25,
});

// 26
console.log(paginator.from());
```

### `to()`

Ending item we're currently displaying based on page offset. Useful for showing a message like `Showing 24 to 50 results of 100`.

```javascript
import Paginator from 'headless-pagination';

const paginator = new Paginator({
  totalItems: 100,
  initialPage: 2,
  perPage: 25,
});

// 50
console.log(paginator.to());
```

### `onNext()`

Increments the active page. Will not go further than the max page.

```javascript
import Paginator from 'headless-pagination';

const paginator = new Paginator({
  totalItems: 50,
  initialPage: 1,
  perPage: 25,
});

paginator.onNext();
// 2
console.log(paginator.page);

paginator.onNext();
// 2 - doesn't go up past final page
console.log(paginator.page);
```

### `onPrevious()`

Decrements the active page. Will not go lower than the first page.

```javascript
import Paginator from 'headless-pagination';

const paginator = new Paginator({
  totalItems: 50,
  initialPage: 1,
  perPage: 25,
});

// 1
console.log(paginator.page);

paginator.onPrevious();

// 1
console.log(paginator.page);
```

### `setPage(newPage: number)`

Updates the page to the provided value

```javascript
import Paginator from 'headless-pagination';

const paginator = new Paginator({
  totalItems: 50,
  initialPage: 1,
  perPage: 25,
});

// 1
console.log(paginator.page);

paginator.setPage(2);

// 2
console.log(paginator.page);
```

### `links()`

Returns an array of what links to display to the user.

```javascript
import Paginator from 'headless-pagination';

const paginator = new Paginator({
  totalItems: 100,
  initialPage: 1,
  maxLinks: 7,
  perPage: 10,
});

// notice how there are only 7 links!
expect(paginator.links()).toEqual([
  { label: 1, active: true, disabled: false },
  { label: 2, active: false, disabled: false },
  { label: 3, active: false, disabled: false },
  { label: 4, active: false, disabled: false },
  { label: 5, active: false, disabled: false },
  { label: '...', active: false, disabled: true },
  { label: 10, active: false, disabled: false },
]);
```

As you navigate through the pages, the structure of the links may change by introducing multiple `...` items in order to respect the `maxLinks` config:

```javascript
import Paginator from 'headless-pagination';

const paginator = new Paginator({
  totalItems: 100,
  initialPage: 1,
  maxLinks: 7,
  perPage: 10,
});

paginator.setPage(5);

expect(paginator.links()).toEqual([
  { label: 1, active: false, disabled: false },
  { label: '...', active: false, disabled: true },
  { label: 4, active: false, disabled: false },
  { label: 5, active: true, disabled: false },
  { label: 6, active: false, disabled: false },
  { label: '...', active: false, disabled: true },
  { label: 10, active: false, disabled: false },
]);
```

And finally as you get closer to the last page, the links will expand out on the right:

```javascript
import Paginator from 'headless-pagination';

const paginator = new Paginator({
  totalItems: 100,
  initialPage: 1,
  maxLinks: 7,
  perPage: 10,
});

paginator.setPage(8);

expect(paginator.links()).toEqual([
  { label: 1, active: false, disabled: false },
  { label: '...', active: false, disabled: true },
  { label: 6, active: false, disabled: false },
  { label: 7, active: false, disabled: false },
  { label: 8, active: true, disabled: false },
  { label: 9, active: false, disabled: false },
  { label: 10, active: false, disabled: false },
]);
```
