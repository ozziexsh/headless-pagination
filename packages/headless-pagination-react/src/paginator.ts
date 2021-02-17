import { useState, useRef } from 'react';
import Paginator, {
  PaginatorOptions,
} from '../../headless-pagination/src/paginator';

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

  return {
    ...state,
    setPage,
    onNext,
    onPrevious,
  };
}
