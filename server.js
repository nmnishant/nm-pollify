const app = require('./app')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });

const DB = process.env.DBString.replace('<password>', process.env.password);

mongoose.connect(DB)
.then(function(){
    console.log('DB Connected');
});

app.listen(process.env.PORT || 3000, function(){
    console.log('Listening to port', process.env.PORT);
})