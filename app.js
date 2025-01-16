const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const path = require('path')
const app = express();

mongoose.connect('mongodb://localhost:27017/userAuthDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true
}));


app.get('/', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname,'views','index.html'),{name: req.session.user.name, email: req.session.user.email})
       // res.render('home', { name: req.session.user.name, email: req.session.user.email });
    } else {
        res.redirect('login.html');
    }
});

app.get('/login', (req, res) =>
    {
        res.sendFile(path.join(__dirname,'views','login.html'))  
    });


app.post('/login,html', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.user = user;
            res.redirect('/');
        } else {
            res.send('Invalid email or password');
        }
    } catch (error) {
        res.send('Error during login');
    }
});

app.get('/register', (req, res) => {
    res.render('register.html');
});

app.post('/register.html', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    try {
        await newUser.save();
        res.redirect('login.html');
    } catch (error) {
        res.send('Error registering user. Email might already exist.');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('login.html'));
});


app.listen(3002, () => console.log('Server started on localhost:3000'));
