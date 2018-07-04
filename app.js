const express = require('express');

const router = require('./routes/events_routes');

const app = express();

app.use('/api', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
   console.log(`Server running at PORT : ${PORT}`);
});
