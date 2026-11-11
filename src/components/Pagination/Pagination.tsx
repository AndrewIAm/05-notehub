import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

const PaginateComponent =
  (ReactPaginate as unknown as { default: typeof ReactPaginate }).default ||
  ReactPaginate;

interface PaginationProps {
  pageCount: number;
  currentPage: number; // Додали пропс для поточної сторінки
  onPageChange: (selectedPage: number) => void;
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1);
  };

  return (
    <PaginateComponent
      forcePage={currentPage - 1}
      previousLabel="<"
      nextLabel=">"
      pageCount={pageCount}
      onPageChange={handlePageClick}
      containerClassName={css.pagination}
      pageClassName={css.pageItem}
      pageLinkClassName={css.pageLink}
      previousClassName={css.pageItem}
      previousLinkClassName={css.pageLink}
      nextClassName={css.pageItem}
      nextLinkClassName={css.pageLink}
      activeClassName={css.active}
      breakLabel="..."
      breakClassName={css.pageItem}
      breakLinkClassName={css.pageLink}
    />
  );
}
