// Импортируем экземпляр Express из файла app.js
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Запускаем сервер на указанном порту
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

