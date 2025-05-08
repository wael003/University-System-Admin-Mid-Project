const Student = require('../models/Student');

exports.getAllStudents = async (req, res) => {
    await Student.find().then(data => {
        res.json({ data });
    })
        .catch(err => {
            res.status(500).json({ message: 'somthing went wrong' + err });
        })

}


exports.getStudentByID = async (req, res) => {
    await Student.findOne({ studentId: req.params.id }).then(data => {
        res.json({ data });
    })
        .catch(err => {
            res.status(500).json({ message: 'somthing went wrong' + err });
        })

}

exports.addStudent = async (req, res) => {
    await new Student(req.body).save()
        .then(() => {
            res.json({ message: 'student added successfully!' })

        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })

}

exports.updateInfo = async (req, res) => {
    await Student.findOneAndUpdate({ studentId: req.params.id }, req.body, { new: true })
        .then(data => {
            res.json({ message: 'student info updated successfully!', data });
        })
        .catch((err) => {
            res.status(500).json({ err });
        })
}

exports.deleteStudent = async (req, res) => {
    await Student.findOneAndDelete({ studentId: req.params.id })
        .then(() => {
            res.json({ message: 'student deleted successfully!' });
        })
        .catch((err) => {
            res.status(500).json({ err });
        })
}