const express = require('express');
const path = require('path');

// routers
const messagesRouter = require('./routes/messages.router');
const commentsRouter = require('./routes/comments.router');
const profilesRouter = require('./routes/profiles.router');


// app config
const app = express();

const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send(' Hello!')
})

app.use('/messages', messagesRouter);
app.use('/messages/:id/comments', commentsRouter);
app.use('/profiles', profilesRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})