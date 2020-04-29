const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors')
const knex = require('knex');
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')
const app = express();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const db = knex({
    client: 'pg',
    connection: {
        connectString : process.env.DATABASE_URL,
        ssl: true
    }
});


// dev db
// const db = knex({
//     client: 'pg',
//     connection: {
//         host : 'postgresql-flexible-42647',
//         port: 5432,
//         user : 'postgres',
//         password : 'postgres',
//         database : 'smartbrain'
//     }
// });


app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {res.json('home')})
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfile(db))
app.put('/image', image.handleImage(db))
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running ${process.env.PORT}`);
})
