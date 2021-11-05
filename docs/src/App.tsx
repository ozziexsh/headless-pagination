import React, { useState } from 'react';
import usePagination from 'headless-pagination-react';

function App() {
  const [totalItems, setTotalItems] = useState(1000);
  const [perPage, setPerPage] = useState(24);
  const [maxLinks, setMaxLinks] = useState(7);
  const { links, from, to, setPage, hasNext, hasPrevious, onNext, onPrevious } =
    usePagination({
      totalItems,
      perPage,
      maxLinks,
    });

  function clampValue(e: React.FormEvent<HTMLInputElement>, min = 1) {
    const value = Number(e.currentTarget.value);
    return value < min ? min : value;
  }

  return (
    <div className={'max-w-4xl mx-auto'}>
      <div className="text-center">
        <h1>Headless Pagination</h1>
        <p>
          <a
            href="https://github.com/ozziexsh/headless-pagination"
            className={'text-indigo-600'}
          >
            Read more on GitHub
          </a>
        </p>
      </div>
      <div
        className={
          'mt-6 flex flex-col md:flex-row md:items-center md:justify-center space-y-2 md:space-y-0 md:space-x-2'
        }
      >
        <div>
          <label htmlFor="total-items" className={'block mb-1 font-medium'}>
            Total items
          </label>
          <input
            type="number"
            id="total-items"
            value={totalItems}
            onChange={e => setTotalItems(clampValue(e))}
            className={'rounded-md px-4 py-2 border-solid border-gray-300'}
          />
        </div>
        <div>
          <label htmlFor="per-page" className={'block mb-1 font-medium'}>
            Per page
          </label>
          <input
            type="number"
            id="per-page"
            value={perPage}
            onChange={e => setPerPage(clampValue(e))}
            className={'rounded-md px-4 py-2 border-solid border-gray-300'}
          />
        </div>
        <div>
          <label htmlFor="max-links" className={'block mb-1 font-medium'}>
            Max links
          </label>
          <input
            type="number"
            id="max-links"
            value={maxLinks}
            onChange={e => setMaxLinks(clampValue(e, 7))}
            className={'rounded-md px-4 py-2 border-solid border-gray-300'}
          />
        </div>
      </div>

      <div>
        <h2>Simple example</h2>
        <p>
          Showing {from} to {to} of {totalItems}
        </p>
        <div>
          {links.map((link, i) => (
            <button
              key={i}
              disabled={link.disabled}
              style={{ backgroundColor: link.active ? '#00aced' : undefined }}
              onClick={() =>
                typeof link.label !== 'string' ? setPage(link.label) : undefined
              }
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2>With arrows</h2>
        <p>
          Showing {from} to {to} of {totalItems}
        </p>
        <div>
          <button disabled={!hasPrevious} onClick={onPrevious}>
            Prev
          </button>
          {links.map((link, i) => (
            <button
              key={i}
              disabled={link.disabled}
              style={{ backgroundColor: link.active ? '#00aced' : undefined }}
              onClick={() =>
                typeof link.label !== 'string' ? setPage(link.label) : undefined
              }
            >
              {link.label}
            </button>
          ))}
          <button disabled={!hasNext} onClick={onNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
