const Course = require('../models/Course ');

exports.getAllCourses = async (req, res) => {
    await Course.find().then(data => {
        res.json({ data });
    })
        .catch(err => {
            res.status(500).json({ message: 'somthing went wrong' + err });
        })

}


exports.getCourseByCode = async (req, res) => {
    await Course.findOne({ code: req.params.code })
        .then(data => {
            if(data){
                res.json({ data });
            }else{
                res.status(400).json({ message : 'no data found' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'somthing went wrong' + err });
        })

}

exports.addCourse = async (req, res) => {
    await new Course(req.body).save()
        .then(() => {
            res.json({ message: 'course added successfully!' })

        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })

}

exports.updateInfo = async (req, res) => {
    await Course.findOneAndUpdate({ code: req.params.code }, req.body, { new: true })
        .then(data => {
            res.json({ message: 'course info updated successfully!', data });
        })
        .catch((err) => {
            res.status(500).json({ err });
        })
}

exports.deleteCourse = async (req, res) => {
    await Course.findOneAndDelete({ code: req.params.code })
        .then((data) => {
            if (data) {
                res.json({ message: 'course deleted successfully!' });
            } else {
                res.status(400).json({ message: 'course not found' })
            }
        })
        .catch((err) => {
            res.status(500).json({ err });
        })
}