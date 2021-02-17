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
  public page: number;
  private perPage: number;
  private maxLinks: number;
  private totalItems: number;
  private numTrailingLinks: number;

  constructor({
    initialPage = 1,
    perPage = 24,
    maxLinks = 7,
    totalItems,
  }: PaginatorOptions) {
    this.page = initialPage;
    this.perPage = perPage;
    this.maxLinks = maxLinks;
    this.totalItems = totalItems;
    this.numTrailingLinks = 2;
  }

  public totalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }

  public hasNext() {
    return this.page !== this.totalPages();
  }

  public hasPrevious() {
    return this.page > 1;
  }

  public from() {
    return this.page * this.perPage - this.perPage + 1;
  }

  public to() {
    return this.page * this.perPage;
  }

  private display() {
    if (this.totalPages() <= this.maxLinks) {
      return PaginatorDisplay.NoDots;
    }
    // assuming maxLinks = 7
    // 1 2 3 4 5 ... 42
    //       ^
    // if page is at most second to last while in left side state
    if (this.page <= this.maxLinks - this.numTrailingLinks - 1) {
      return PaginatorDisplay.LeftVisible;
    }
    // 1 ... 4 5 6 ... 42
    //         ^
    if (
      this.page >= this.maxLinks - this.numTrailingLinks &&
      this.page + (this.maxLinks - this.numTrailingLinks * 2) <
        this.totalPages()
    ) {
      return PaginatorDisplay.MiddleSpread;
    }
    // 1 ... 38 39 40 41 42
    //          ^
    return PaginatorDisplay.RightVisible;
  }

  public onNext() {
    if (this.page === this.totalPages()) {
      return;
    }
    this.page += 1;
  }

  public onPrevious() {
    if (this.page === 1) {
      return;
    }
    this.page -= 1;
  }

  public setPage(newPage: number) {
    this.page = newPage;
  }

  private formatLink(link: number | string) {
    return {
      label: link,
      active: link === this.page,
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
            let i = this.page - spot + 1;
            i < this.page + numIterations - spot + 1;
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
