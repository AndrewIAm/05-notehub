import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

// 1. Створюємо безпечну обгортку, яка дістає компонент незалежно від того, як його зібрав Vite
const PaginateComponent =
  (ReactPaginate as unknown as { default: typeof ReactPaginate }).default ||
  ReactPaginate;

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedPage: number) => void;
}

export default function Pagination({
  pageCount,
  onPageChange,
}: PaginationProps) {
  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1);
  };

  return (
    <PaginateComponent
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
