import express from 'express';
import logger from 'morgon';
import creditCardRouter from './routes/creditCardRoute.js';
import DatastoreStrategy from './strategy/datastoreStrategy.js';
import InMemoryStore from './datastore/inMemoryStore.js';
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const strategyManager = new DatastoreStrategy();
strategyManager.setStrategy(new InMemoryStore());
app.set('dbObject', strategyManager);

app.use('/api/v1', creditCardRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send({ error: 'Not Found' });
});

const port = process.env.PORT || '3000';
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
