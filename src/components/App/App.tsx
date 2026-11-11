import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchNotes, createNote, deleteNote } from '../../services/noteService';
import type { CreateNotePayload } from '../../services/noteService';
import { useDebouncedCallback } from 'use-debounce';

import SearchBox from '../SearchBox/SearchBox';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import css from './App.module.css';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient(); // Для інвалідації кешу

  const createMutation = useMutation({
    mutationFn: (newNote: CreateNotePayload) => createNote(newNote),
    onSuccess: () => {
      // Коли бекенд успішно зберіг нотатку, кажемо React Query оновити колекцію
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setIsModalOpen(false); // Закриваємо модалку
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      // Щойно бекенд успішно видалить нотатку, змушуємо React Query оновити список
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleCreateNote = (noteData: CreateNotePayload) => {
    createMutation.mutate(noteData);
  };

  const [page, setPage] = useState(1);

  const [searchQuery, setSearchQuery] = useState(''); // Новий стан для пошуку

  // Створюємо відкладену функцію оновлення пошуку
  const handleSearchChange = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setPage(1); // Коли починаємо новий пошук, скидаємо сторінку на першу
  }, 300);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, searchQuery], // Додаємо searchQuery до ключа запиту
    queryFn: () => fetchNotes({ page, perPage: 12, search: searchQuery }),
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearchChange} />

        {data?.totalPages && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            onPageChange={page => setPage(page)}
          />
        )}

        {/* Додаємо обробник відкриття вікна */}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {/* Індикатори завантаження та помилки */}
      {isLoading && <div>Loading notes...</div>}
      {isError && <div>Error loading notes!</div>}

      {/* Рендеримо NoteList лише якщо є хоча б одна нотатка (вимога завдання) */}
      {data?.notes && data.notes.length > 0 && (
        <NoteList notes={data.notes} onDelete={handleDelete} />
      )}

      {/* Додаємо модалку в самий низ дерева App */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NoteForm
          onSubmit={handleCreateNote}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
