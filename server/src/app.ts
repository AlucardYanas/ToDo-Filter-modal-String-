import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import cardRoutes from './routes/card.routes';

const app = express();


app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);


app.use((req, res, next) => {
  if (req.url.match(/\.(css|js|jpg|jpeg|png|gif|ico|woff2)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=86400');
  } else {
    res.setHeader('Cache-Control', 'public, max-age=300');
  }
  next();
});

app.use(morgan('dev'));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/cards', cardRoutes);

export default app;
