const { Router } = require('express');
const { Card } = require('../../db/models');

const cardsRouter = Router();

cardsRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const allCards = await Card.findAll();
      res.status(200).json(allCards);
    } catch (error) {
      console.log('Ошибка получения всех карточек', error);
      res.status(500).json({
        message: 'Ошибка получения всех карточек',
      });
    }
  })
  .post(async (req, res) => {
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
  })
  .delete(async (req, res) => {
    try {
      await Card.destroy({ where: {} });
      res.sendStatus(200);
    } catch (error) {
      console.log('Ошибка удаления всех карточек', error);
      res.status(500).json({
        message: 'Ошибка удаления всех карточек',
      });
    }
  });

cardsRouter
  .route('/:id')
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const card = await Card.findByPk(id);
      if (!card) {
        return res.status(404).json({ message: 'Карточка не найдена' });
      }
      res.json(card);
    } catch (error) {
      console.log('Ошибка получения карточки', error);
      res.status(500).json({
        message: 'Ошибка получения карточки',
      });
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      const card = await Card.findByPk(id);
      if (!card) {
        return res.status(404).json({ message: 'Карточка не найдена' });
      }
      await card.destroy();
      res.sendStatus(200);
    } catch (error) {
      console.log('Ошибка удаления карточки', error);
      res.status(500).json({
        message: 'Ошибка удаления карточки',
      });
    }
  })
  .patch(async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, status } = req.body;
      const card = await Card.findByPk(id);
      if (!card) {
        return res.status(404).json({ message: 'Карточка не найдена' });
      }
      await card.update({ title, description, status });
      res.json(card);
    } catch (error) {
      console.log('Ошибка редактирования карточки', error);
      res.status(500).json({
        message: 'Ошибка редактирования карточки',
      });
    }
  });

cardsRouter.route('/:id/status').get(async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findByPk(id, {
      attributes: ['status'],
    });
    if (!card) {
      return res.status(404).json({ message: 'Карточка не найдена' });
    }
    res.status(200).json({ status: card.status });
  } catch (error) {
    console.log('Ошибка получения статуса карточки', error);
    res.status(500).json({
      message: 'Ошибка получения статуса карточки',
    });
  }
});

module.exports = cardsRouter;
