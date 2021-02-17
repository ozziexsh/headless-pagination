import React, { useState } from 'react';
import usePagination from 'headless-pagination-react';

function App() {
  const [totalItems, setTotalItems] = useState(1000);
  const [perPage, setPerPage] = useState(24);
  const [maxLinks, setMaxLinks] = useState(7);

  return <div className="App"></div>;
}

export default App;
