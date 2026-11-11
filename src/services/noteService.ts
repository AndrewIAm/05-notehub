import axios from 'axios';
import type { Note } from '../types/note';

const apiClient = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
});

apiClient.interceptors.request.use(config => {
  const token = import.meta.env.VITE_NOTEHUB_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface FetchNotesResponse {
  notes: Note[];
  totalNotes: number;
  totalPages: number;
  currentPage: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export type CreateNotePayload = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const { data } = await apiClient.get<FetchNotesResponse>('/notes', {
    params,
  });
  return data;
};

export const createNote = async (
  noteData: CreateNotePayload
): Promise<Note> => {
  const { data } = await apiClient.post<Note>('/notes', noteData);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await apiClient.delete<Note>(`/notes/${id}`);
  return data;
};
