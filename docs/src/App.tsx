import React, { useState } from 'react';
import usePagination from 'headless-pagination-react';

function App() {
  const [totalItems, setTotalItems] = useState(1000);
  const [perPage, setPerPage] = useState(24);
  const [maxLinks, setMaxLinks] = useState(7);
  const { page, links, from, to, setPage } = usePagination({
    totalItems,
    perPage,
    maxLinks,
  });

  return (
    <div>
      <div>
        <div>
          <label htmlFor="total-items">Total items</label>
          <input
            type="number"
            id="total-items"
            value={totalItems}
            onChange={e => setTotalItems(Number(e.currentTarget.value))}
          />
        </div>
        <div>
          <label htmlFor="per-page">Per page</label>
          <input
            type="number"
            id="per-page"
            value={perPage}
            onChange={e => setPerPage(Number(e.currentTarget.value))}
          />
        </div>
        <div>
          <label htmlFor="max-links">Max links</label>
          <input
            type="number"
            id="max-links"
            value={maxLinks}
            onChange={e => setMaxLinks(Number(e.currentTarget.value))}
          />
        </div>
      </div>
      <div>
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
    </div>
  );
}

export default App;
