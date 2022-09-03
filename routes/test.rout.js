const {Router} = require("express")
const auth = require("./authMiddleware")
const router = Router()
const Test = require("../models/test")

//  /api/test
router.post("/add", auth,

    async (req, res) => {

        try {
            const {date, teacherID, grade, theme, questions} = req.body

            const test = new Test({teacherID: teacherID, date: date, theme: theme, grade: grade, questions: questions})
            await test.save()

            res.status(201).json({message: "Опитування створено"})

        } catch (e) {
            res.status(500).json({message: "Помилка запису"})
        }
    })

//  /api/test
router.post("/dayTest", auth,

    async (req, res) => {

        try {
            const {userID, grade, date} = req.body

            const tests = await Test.find({'grade': grade, 'date': date})

            if (tests.length === 0) {
                return res.status(400).json({message: "На сьогодні немає тестів"})
            }
            res.json({tests})

        } catch (e) {
            res.status(500).json({message: "err /Request serv"})
        }
    })

router.post("/myTests", auth,

    async (req, res) => {

        try {
            const {userID} = req.body
            const tests = await Test.find({'teacherID': userID}, 'theme date grade')
            res.json(tests)

        } catch (e) {
            res.status(500).json({message: "err /Request serv"})
        }
    })

router.delete("/testDel",

    async (req, res) => {

        try {
            const {testID} = req.body
            const user = await Test.findOneAndDelete({_id: testID})
            res.json({message: "Тест видалений"})

        } catch (e) {
            res.status(500).json({message: "err /Request serv"})
        }
    })

module.exports = router