const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Connect to MongoDB (replace 'your-database-url' with your actual MongoDB URL)
mongoose.connect('mongodb://localhost:27017/your-database-name', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema for user data
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Assuming your static files (HTML, CSS, JS) are in a 'public' folder

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check credentials against the database
    const user = await User.findOne({ username, password });

    if (user) {
        res.send('Login successful!');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Simulated payment API endpoint
app.post('/pay', (req, res) => {
    // Here you would typically integrate with a real payment gateway API
    // For now, simulate a successful payment
    const success = Math.random() > 0.5; // 50% chance of success

    if (success) {
        res.json({ success: true, message: 'Payment successful!' });
    } else {
        res.status(500).json({ success: false, message: 'Payment failed.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
