const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// mongodb+srv://ashutosh19jics022:<db_password>@cluster0.3eegy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
mongoose.connect('mongodb+srv://ashutosh19jics022:Ashusintu%2304@cluster0.3eegy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const User = mongoose.model('User', userSchema);

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching users', error });
  }
});

app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: 'Error creating user', error });
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: 'Error updating user', error });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send({ message: 'User deleted' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting user', error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});