export enum PaginatorDisplay {
  LeftVisible,
  MiddleSpread,
  RightVisible,
  NoDots,
}

export interface PaginatorOptions {
  totalItems: number;
  perPage?: number;
  maxLinks?: number;
  initialPage?: number;
}

export interface PaginatorLink {
  label: string | number;
  disabled: boolean;
  active: boolean;
}

export default class Paginator {
  private currentPage: number = 1;
  private perPage: number = 24;
  private maxLinks: number = 7;
  private totalItems: number = 0;
  private numTrailingLinks: number;

  constructor({
    initialPage = 1,
    perPage = 24,
    maxLinks = 7,
    totalItems,
  }: PaginatorOptions) {
    this.setTotalItems(totalItems);
    this.setPerPage(perPage);
    this.setMaxLinks(maxLinks);
    this.setPage(initialPage);
    this.numTrailingLinks = 2;
  }

  public page() {
    return this.currentPage;
  }

  public totalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }

  public hasNext() {
    return this.currentPage !== this.totalPages();
  }

  public hasPrevious() {
    return this.currentPage > 1;
  }

  public from() {
    return this.currentPage * this.perPage - this.perPage + 1;
  }

  public to() {
    const to = this.currentPage * this.perPage;
    if (to > this.totalItems) {
      return this.totalItems;
    }
    return to;
  }

  private display() {
    if (this.totalPages() <= this.maxLinks) {
      return PaginatorDisplay.NoDots;
    }
    // assuming maxLinks = 7
    // 1 2 3 4 5 ... 42
    //       ^
    // if page is at most second to last while in left side state
    if (this.currentPage <= this.maxLinks - this.numTrailingLinks - 1) {
      return PaginatorDisplay.LeftVisible;
    }
    // 1 ... 4 5 6 ... 42
    //         ^
    if (
      this.currentPage >= this.maxLinks - this.numTrailingLinks &&
      this.currentPage + (this.maxLinks - this.numTrailingLinks * 2) <
        this.totalPages()
    ) {
      return PaginatorDisplay.MiddleSpread;
    }
    // 1 ... 38 39 40 41 42
    //          ^
    return PaginatorDisplay.RightVisible;
  }

  public onNext() {
    if (this.currentPage === this.totalPages()) {
      return;
    }
    this.currentPage += 1;
  }

  public onPrevious() {
    if (this.currentPage === 1) {
      return;
    }
    this.currentPage -= 1;
  }

  public setPage(newPage: number) {
    if (newPage >= this.totalPages()) {
      this.currentPage = this.totalPages();
    } else if (newPage <= 1) {
      this.currentPage = 1;
    } else {
      this.currentPage = newPage;
    }
  }

  public setMaxLinks(newMaxLinks: number) {
    if (newMaxLinks <= 7) {
      this.maxLinks = 7;
    } else {
      this.maxLinks = newMaxLinks;
    }
  }

  public setPerPage(newPerPage: number) {
    if (newPerPage <= 1) {
      this.perPage = 1;
    } else {
      this.perPage = newPerPage;
    }
  }

  public setTotalItems(newTotalItems: number) {
    if (newTotalItems <= 0) {
      this.totalItems = 0;
    } else {
      this.totalItems = newTotalItems;
    }
  }

  private formatLink(link: number | string) {
    return {
      label: link,
      active: link === this.currentPage,
      disabled: typeof link === 'string',
    };
  }

  public links() {
    const links: PaginatorLink[] = [];

    switch (this.display()) {
      case PaginatorDisplay.NoDots:
        for (let i = 1; i <= this.totalPages(); i++) {
          links.push(this.formatLink(i));
        }
        break;
      case PaginatorDisplay.LeftVisible:
        for (let i = 1; i <= this.maxLinks - this.numTrailingLinks; i++) {
          links.push(this.formatLink(i));
        }
        links.push(this.formatLink('...'));
        links.push(this.formatLink(this.totalPages()));
        break;
      case PaginatorDisplay.MiddleSpread:
        {
          links.push(this.formatLink(1));
          links.push(this.formatLink('...'));
          const numIterations = this.maxLinks - this.numTrailingLinks * 2;
          const spot = Math.ceil(numIterations / 2);
          for (
            let i = this.currentPage - spot + 1;
            i < this.currentPage + numIterations - spot + 1;
            i++
          ) {
            links.push(this.formatLink(i));
          }
          links.push(this.formatLink('...'));
          links.push(this.formatLink(this.totalPages()));
        }
        break;
      case PaginatorDisplay.RightVisible:
        links.push(this.formatLink(1));
        links.push(this.formatLink('...'));
        for (
          let i = this.totalPages() - (this.maxLinks - 3);
          i <= this.totalPages();
          i++
        ) {
          links.push(this.formatLink(i));
        }
        break;
      default:
        break;
    }
    return links;
  }
}
