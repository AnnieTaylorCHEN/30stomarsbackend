const path = require('path');
const express = require('express');
const connectDB = require('./config/db');

const app = express();

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,PATCH');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token'
	);
	next();
});

//connect to the database
connectDB();

//middleware
app.use(express.json({ extended: false }));

//routes
app.use('/echelon/auth', require('./routes/echelon/auth'));
app.use('/echelon/users', require('./routes/echelon/users'));
app.use('/echelon/profile', require('./routes/echelon/profile'));
app.use('/echelon/posts', require('./routes/echelon/posts'));
app.use('/store', require('./routes/product'));

//serve static assets in production
if (process.env.NODE_ENV === 'production') {
	//set static folder
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

//port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('the server is on ' + PORT));
