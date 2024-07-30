import type { AxiosInstance } from 'axios';
import apiInstance from './apiInstance';
import type { ApiResponse, CardDataType, CardType } from '../types/CardTypes';


class CardService {
  constructor(private readonly api: AxiosInstance) {}

  async getCards(): Promise<ApiResponse> {
    const { data } = await this.api.get<ApiResponse>('/cards');
    return data;
  }

  async addCard(obj: CardDataType): Promise<CardType> {
    const { data } = await this.api.post<CardType>('/cards', obj);
    return data;
  }

  async deleteCard(id: number): Promise<CardType> {
    return this.api.delete(`/cards/${id}`);
  }

  // async getCardStatus(id: number): Promise<{ status: string }> {
  //   const { data } = await this.api.get<{ status: string }>(`/cards/${id}/status`);
  //   return data;
  // }

  async updateCard(id: CardType['id'], cardData: CardDataType): Promise<CardType> {
  const { data } = await this.api.patch<CardType>(`/cards/${id}`, cardData);
  return data;
}

async getCardsByStatus(status: string): Promise<ApiResponse> {
  console.log('Requesting filtered cards with status:', status);
  const { data } = await this.api.get<ApiResponse>('/filter', { params: { status } });
  return data;
}

}

export default new CardService(apiInstance);
