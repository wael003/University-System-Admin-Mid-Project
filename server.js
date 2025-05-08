const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('./config/DB')
const student = require('./routes/student')
const course = require('./routes/course')
const grade = require('./routes/grade')

const app = express();

app.use(express.json());
app.use(cors());

app.use('/students', student);
app.use('/courses', course)
app.use('/grades', grade)


app.listen(process.env.PORT | 3000, () => {
    console.log(`server is running on port ${process.env.PORT | 3000}`);
})