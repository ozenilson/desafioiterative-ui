interface PageModel {
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
}

export interface PageableModel<L> {
  pageable: PageModel;
  content: L[]
}
