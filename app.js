const express = require('express');
const path = require('path');
const app = express();
const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//   res.send(
//
//     // `<p>test</p>`
//   );
// });
