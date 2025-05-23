import { Request, Response } from 'express';
import { Card } from '../models/card.model';
import type {
  CardCreationAttributes,
  CardUpdateAttributes,
} from '../../src/types/card.types';

export class CardController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const allCards = await Card.findAll();
      res.status(200).json(allCards);
    } catch (error) {
      console.log('Ошибка получения всех карточек', error);
      res.status(500).json({
        message: 'Ошибка получения всех карточек',
      });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, status } = req.body;
      const newCard = await Card.create({ title, description, status });
      res.json(newCard);
    } catch (error) {
      console.log('Ошибка добавления карточки', error);
      res.status(500).json({
        message: 'Ошибка добавления карточки',
      });
    }
  }

  static async deleteAll(req: Request, res: Response): Promise<void> {
    try {
      await Card.destroy({ where: {} });
      res.sendStatus(200);
    } catch (error) {
      console.log('Ошибка удаления всех карточек', error);
      res.status(500).json({
        message: 'Ошибка удаления всех карточек',
      });
    }
  }

  static async getOne(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const card = await Card.findByPk(id);
      if (!card) {
        res.status(404).json({ message: 'Карточка не найдена' });
        return;
      }
      res.json(card);
    } catch (error) {
      console.log('Ошибка получения карточки', error);
      res.status(500).json({
        message: 'Ошибка получения карточки',
      });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const card = await Card.findByPk(id);
      if (!card) {
        res.status(404).json({ message: 'Карточка не найдена' });
        return;
      }
      await card.destroy();
      res.sendStatus(200);
    } catch (error) {
      console.log('Ошибка удаления карточки', error);
      res.status(500).json({
        message: 'Ошибка удаления карточки',
      });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title, description, status } = req.body;
      const card = await Card.findByPk(id);
      if (!card) {
        res.status(404).json({ message: 'Карточка не найдена' });
        return;
      }
      await card.update({ title, description, status });
      res.json(card);
    } catch (error) {
      console.log('Ошибка редактирования карточки', error);
      res.status(500).json({
        message: 'Ошибка редактирования карточки',
      });
    }
  }

  static async getStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const card = await Card.findByPk(id, {
        attributes: ['status'],
      });
      if (!card) {
        res.status(404).json({ message: 'Карточка не найдена' });
        return;
      }
      res.status(200).json({ status: card.status });
    } catch (error) {
      console.log('Ошибка получения статуса карточки', error);
      res.status(500).json({
        message: 'Ошибка получения статуса карточки',
      });
    }
  }
}
