export type CardStatus = 'active' | 'completed';

export interface CardAttributes {
  id: number;
  title: string;
  description: string;
  status: CardStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CardCreationAttributes
  extends Omit<CardAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export interface CardUpdateAttributes extends Partial<CardCreationAttributes> {}
