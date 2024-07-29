// Описание типа CardType для объекта Card
export type CardType = {
  id: number;  
  title: string;
  description: string;
  status: string;


};

// Описание типа CardDataType без поля 'id'
export type CardDataType = Omit<CardType, 'id'>;

// Описание типа ApiResponse как массив объектов CardType
export type ApiResponse = CardType[];
