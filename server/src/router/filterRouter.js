const { Router } = require('express');
const { Card } = require('../../db/models');

const filterRouter = Router();

filterRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const { status } = req.query;
      
      if (!status) {
        return res.status(400).json({ message: 'Статус не указан' });
      }
      
      const filteredCards = await Card.findAll({
        where: { status }
      });
      
      if (filteredCards.length === 0) {
        return res.status(404).json({ message: 'Карточки с таким статусом не найдены' });
      }
      
      res.status(200).json(filteredCards);
    } catch (error) {
      console.log('Ошибка фильтрации карточек по статусу', error);
      res.status(500).json({
        message: 'Ошибка фильтрации карточек по статусу',
      });
    }
  });

module.exports = filterRouter;
