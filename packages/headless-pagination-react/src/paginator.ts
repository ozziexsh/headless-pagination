import { useState, useRef, useEffect } from 'react';
import Paginator, { PaginatorOptions } from 'headless-pagination';

export default function usePagination(options: PaginatorOptions) {
  const paginator = useRef(new Paginator(options));
  const [state, setState] = useState(getStateFromPaginator());

  function getStateFromPaginator() {
    return {
      page: paginator.current.page,
      links: paginator.current.links(),
      hasNext: paginator.current.hasNext(),
      hasPrevious: paginator.current.hasPrevious(),
      from: paginator.current.from(),
      to: paginator.current.to(),
    };
  }

  function setStateFromPaginator() {
    setState(getStateFromPaginator());
  }

  function onNext() {
    paginator.current.onNext();
    setStateFromPaginator();
  }

  function onPrevious() {
    paginator.current.onPrevious();
    setStateFromPaginator();
  }

  function setPage(newPage: number) {
    paginator.current.setPage(newPage);
    setStateFromPaginator();
  }

  useEffect(() => {
    if (typeof options.maxLinks !== 'undefined') {
      paginator.current.setMaxLinks(options.maxLinks);
    }
    if (typeof options.perPage !== 'undefined') {
      paginator.current.setPerPage(options.perPage);
    }
    if (typeof options.totalItems !== 'undefined') {
      paginator.current.setTotalItems(options.totalItems);
    }
    setStateFromPaginator();
  }, [options.maxLinks, options.perPage, options.totalItems]);

  return {
    ...state,
    setPage,
    onNext,
    onPrevious,
  };
}
