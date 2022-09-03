const express = require("express")
const config = require("config")
const mongoose = require("mongoose")

const app = express()

app.use(express.json({extended: true}))
app.use('/api/auth', require("./routes/auth.rout"))
app.use('/api/data', require("./routes/data.rout"))
app.use('/api/test', require("./routes/test.rout"))

PORT = config.get("port") || 5000

async function start() {
    try {
        await mongoose.connect(config.get("mongoURL"), {
            useNewUrlParser: true, useUnifiedTopology: true
        }, (e) => {
            e ? console.log("mongoDB Error", e) : console.log("mongoDB connected")
        })
        app.listen(PORT, () => {
            console.log(`app started on port ${PORT}`)
        })

    } catch (e) {
        console.log("server Error", e.message)
        process.exit(1)
    }
}

start()
