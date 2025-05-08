const Grade = require('../models/Grade ');


exports.getStudentsGrade = (req, res) => {
    Grade.find({ student: req.params.studentId })
        .populate('course', 'name code')
        .populate('student', 'name studentId')
        .then((data) => {
            if (!data) res.status(401).json({ message: 'data not found' })
            res.json({ data })
        })
        .catch((err) => {
            res.status(500).json({ err });
        })

}


exports.getGrades = (req, res) => {
    Grade.find()
        .populate('student', 'name studentId')
        .populate('course', 'name code')
        .then((data) => {
            if (!data) res.status(401).json({ message: 'data not found' })
            res.json({ data })
        })
        .catch((err) => {
            res.status(500).json({ err });
        })

}

exports.addGrade = (req, res) => {
    const { student, course, grade, semester } = req.body
    Grade.find({ student, course })
        .then(data => {

            if (data.length > 0) return res.status(400).json({ message: 'this course was already entered!' });


            new Grade(req.body).save()
                .then(() => {
                    res.json({ message: 'grade added successfully!' })

                })
                .catch((err) => {
                    res.status(500).json({ error: err })
                })
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })




}

exports.updateGrade = (req, res) => {
    Grade.findByIdAndUpdate(req.params.gradeId, req.body, { new: true })
        .populate('student', 'name studentId')
        .populate('course', 'name code')
        .then(data => {
            res.json({ message: 'grade info updated successfully!', data });
        })
        .catch((err) => {
            res.status(500).json({ err });
        })
}



exports.deleteGrade = (req, res) => {
    Grade.findByIdAndDelete(req.params.gradeId)
        .then((data) => {
            if (data) {
                res.json({ message: 'grade deleted successfully!' });
            } else {
                res.status(400).json({ message: 'grade not found' })
            }
        })
        .catch((err) => {
            res.status(500).json({ err });
        })
}


exports.calculateGrade = (req, res) => {
    Grade.find({ student: req.params.studentId })
        .populate('course', 'name code creditHours')
        .populate('student', 'name studentId')
        .then(data => {
            if (!data || data.length === 0) {
                return res.status(404).json({ message: 'No grades found for this student.' });
            }

            let totalPoints = 0;
            let totalHours = 0;

            data.forEach(g => {
                const credit = g.course.creditHours || 0;
                totalPoints += g.grade * credit;
                totalHours += credit;
            });

            const gpa = totalHours > 0 ? totalPoints / totalHours : 0;

            res.json({
                student: data[0].student.name,
                studentId: data[0].student.studentId,
                GPA: gpa.toFixed(2),
            });
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
};


