import axios from 'axios';
import { Model } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function searchModels(query: string, filters: Record<string, string[]>): Promise<Model[]> {
  try {
    const { data } = await api.post('/search', { query, filters });
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'サーバーに接続できません / Cannot connect to server'
    );
  }
}

export async function saveModel(model: Model): Promise<void> {
  try {
    await api.post('/save', { model });
  } catch (error) {
    console.error('Save Error:', error);
    throw new Error('保存に失敗しました / Failed to save model');
  }
}