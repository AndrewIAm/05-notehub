// import type { Movie } from '../../types/note';
import css from './NoteList.module.css';

// interface MovieGridProps {
//   movies: Movie[];
//   onSelect: (movie: Movie) => void;
// }

// export default function NoteList({ movies, onSelect }: MovieGridProps) {
//   if (movies.length === 0) {
//     return null;
//   }

//   return (
//     <ul className={css.list}>
//       {/* Набір елементів списку нотаток */}
//       <li className={css.listItem}>
//         <h2 className={css.title}>Note title</h2>
//         <p className={css.content}>Note content</p>
//         <div className={css.footer}>
//           <span className={css.tag}>Note tag</span>
//           <button className={css.button}>Delete</button>
//         </div>
//       </li>
//     </ul>
//   );
// }

export default function NoteList() {
  return (
    <ul className={css.list}>
      {/* Набір елементів списку нотаток */}
      <li className={css.listItem}>
        <h2 className={css.title}>Note title</h2>
        <p className={css.content}>Note content</p>
        <div className={css.footer}>
          <span className={css.tag}>Note tag</span>
          <button className={css.button}>Delete</button>
        </div>
      </li>
    </ul>
  );
}
