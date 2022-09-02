const {Router} = require("express")
const auth = require("./authMiddleware")
const router = Router()
const User = require("../models/users")

//  /api/data
router.post("/answer", auth,

    async (req, res) => {

        try {
            const {assessment, userID} = req.body

            await User.updateOne({_id: userID}, {$set: {assessment: assessment}})

            res.status(201).json({message: "Відповідь прийнята"})

        } catch (e) {
            res.status(500).json({message: "Помилка запису"})
        }

    })

///   api/data
router.post("/user", auth,

    async (req, res) => {

        try {
            const {userID} = req.body
            const user = await User.findOne({_id: userID})
            res.json(user)

        } catch (e) {
            res.status(500).json({message: "err /Request serv"})
        }

    })

///   api/data
router.delete("/userDel",

    async (req, res) => {

        try {
            const {userID} = req.body
            const user = await User.findOneAndDelete({_id: userID})
            res.json({message: "Учень видалений"})

        } catch (e) {
            res.status(500).json({message: "err /Request serv"})
        }

    })

//   api/data
router.get("/students",

    async (req, res) => {

        try {
            const students = await User.find({'position': "student"}, 'name grade').sort({ grade: 1 }).populate('name')
            res.json(students)

        } catch (e) {
            res.status(500).json({message: "err /Request serv"})
        }

    })


module.exports = router