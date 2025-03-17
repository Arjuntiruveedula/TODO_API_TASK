const app = require('./app');

const PORT = process.env.PORT || 5000;
app.get('/hi', (req, res) => {
  res.send('hii');
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});