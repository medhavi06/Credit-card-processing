import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import {fileURLToPath} from 'url';
import helmet from 'helmet';
import fs from 'fs';
import creditCardRouter from './routes/creditCardRoute.js';
import DatastoreStrategy from './strategy/datastoreStrategy.js';
import InMemoryStore from './datastore/inMemoryStore.js';

dotenv.config();
const app = express();
const HTTPSOptions = {
    key: fs.readFileSync('certificates/key.pem'),
    cert: fs.readFileSync('certificates/cert.pem'),
};
const port = process.env.PORT || 3000;
app.set('port', port);

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'));
}
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(helmet());

const strategyManager = new DatastoreStrategy();
strategyManager.setStrategy(new InMemoryStore());
app.set('dbObject', strategyManager);

app.use('/api/v1', creditCardRouter);

app.get('/', (req, res) => {
    res.send('Hello from server.');
});

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
    res.send({error: 'Not Found'});
});

app.listen(app.get('port'), (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Example app listening at https://localhost:${port}`);
});

export default app;
