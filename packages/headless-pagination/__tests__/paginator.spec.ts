import Paginator from '../src/paginator';

describe('Paginator', () => {
  describe('simple pagination', () => {
    it('should return a single link when only one page', () => {
      const paginator = new Paginator({
        totalItems: 1,
      });
      expect(paginator.links()).toEqual([
        { label: 1, active: true, disabled: false },
      ]);
      expect(paginator.hasNext()).toBeFalsy();
      expect(paginator.hasPrevious()).toBeFalsy();
      paginator.onNext();
      expect(paginator.page()).toEqual(1);
      paginator.onPrevious();
      expect(paginator.page()).toEqual(1);
    });
    it('should navigate between pages', () => {
      const paginator = new Paginator({
        totalItems: 10,
        perPage: 5,
      });
      expect(paginator.links()).toEqual([
        { label: 1, active: true, disabled: false },
        { label: 2, active: false, disabled: false },
      ]);
      expect(paginator.hasNext()).toBeTruthy();
      expect(paginator.hasPrevious()).toBeFalsy();
      paginator.onNext();
      expect(paginator.page()).toEqual(2);
      expect(paginator.links()).toEqual([
        { label: 1, active: false, disabled: false },
        { label: 2, active: true, disabled: false },
      ]);
      paginator.onPrevious();
      expect(paginator.page()).toEqual(1);
    });
  });

  describe('leading numbers, trailing to end', () => {
    it('should show links for 1-n with the final page rendered after dots', () => {
      const paginator = new Paginator({
        totalItems: 10,
        perPage: 1,
        maxLinks: 7,
      });
      expect(paginator.links()).toEqual([
        { label: 1, active: true, disabled: false },
        { label: 2, active: false, disabled: false },
        { label: 3, active: false, disabled: false },
        { label: 4, active: false, disabled: false },
        { label: 5, active: false, disabled: false },
        { label: '...', active: false, disabled: true },
        { label: 10, active: false, disabled: false },
      ]);
      paginator.setPage(4);
      expect(paginator.links()).toEqual([
        { label: 1, active: false, disabled: false },
        { label: 2, active: false, disabled: false },
        { label: 3, active: false, disabled: false },
        { label: 4, active: true, disabled: false },
        { label: 5, active: false, disabled: false },
        { label: '...', active: false, disabled: true },
        { label: 10, active: false, disabled: false },
      ]);
    });
    it('should show links for 1 .. 4 5 6 ... 10 when after limit, up ', () => {
      const paginator = new Paginator({
        totalItems: 10,
        perPage: 1,
        maxLinks: 7,
        initialPage: 5,
      });
      expect(paginator.links()).toEqual([
        { label: 1, active: false, disabled: false },
        { label: '...', active: false, disabled: true },
        { label: 4, active: false, disabled: false },
        { label: 5, active: true, disabled: false },
        { label: 6, active: false, disabled: false },
        { label: '...', active: false, disabled: true },
        { label: 10, active: false, disabled: false },
      ]);
      paginator.onNext();
      expect(paginator.links()).toEqual([
        { label: 1, active: false, disabled: false },
        { label: '...', active: false, disabled: true },
        { label: 5, active: false, disabled: false },
        { label: 6, active: true, disabled: false },
        { label: 7, active: false, disabled: false },
        { label: '...', active: false, disabled: true },
        { label: 10, active: false, disabled: false },
      ]);
    });
  });

  describe('nearing end of pagination, show final pages', () => {
    it('should show links for 1 .. 6 7 8 9 10 when after limit, up ', () => {
      const paginator = new Paginator({
        totalItems: 10,
        perPage: 1,
        maxLinks: 7,
        initialPage: 6,
      });
      expect(paginator.links()).toEqual([
        { label: 1, active: false, disabled: false },
        { label: '...', active: false, disabled: true },
        { label: 5, active: false, disabled: false },
        { label: 6, active: true, disabled: false },
        { label: 7, active: false, disabled: false },
        { label: '...', active: false, disabled: true },
        { label: 10, active: false, disabled: false },
      ]);
      paginator.onNext();
      expect(paginator.links()).toEqual([
        { label: 1, active: false, disabled: false },
        { label: '...', active: false, disabled: true },
        { label: 6, active: false, disabled: false },
        { label: 7, active: true, disabled: false },
        { label: 8, active: false, disabled: false },
        { label: 9, active: false, disabled: false },
        { label: 10, active: false, disabled: false },
      ]);
      paginator.onNext();
      expect(paginator.links()).toEqual([
        { label: 1, active: false, disabled: false },
        { label: '...', active: false, disabled: true },
        { label: 6, active: false, disabled: false },
        { label: 7, active: false, disabled: false },
        { label: 8, active: true, disabled: false },
        { label: 9, active: false, disabled: false },
        { label: 10, active: false, disabled: false },
      ]);
      paginator.onNext();
      expect(paginator.links()).toEqual([
        { label: 1, active: false, disabled: false },
        { label: '...', active: false, disabled: true },
        { label: 6, active: false, disabled: false },
        { label: 7, active: false, disabled: false },
        { label: 8, active: false, disabled: false },
        { label: 9, active: true, disabled: false },
        { label: 10, active: false, disabled: false },
      ]);
      paginator.onNext();
      expect(paginator.links()).toEqual([
        { label: 1, active: false, disabled: false },
        { label: '...', active: false, disabled: true },
        { label: 6, active: false, disabled: false },
        { label: 7, active: false, disabled: false },
        { label: 8, active: false, disabled: false },
        { label: 9, active: false, disabled: false },
        { label: 10, active: true, disabled: false },
      ]);
    });
  });
});
