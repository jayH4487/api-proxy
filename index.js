require('dotenv').config()
const express = require("express")
const fetch = require("node-fetch")
const cors = require("cors")


const allowedDomains = ["http://localhost:5001", "http://localhost:3000"]


const app = express()

app.use(cors())

app.get("/api/movie/omdbapi/search", async (req, res) => {

    const domain = req.headers.origin
    // console.log(domain)


    if (allowedDomains.includes(domain)) {
        const apiKey = process.env.OMDb_API_KEY
    
        const searchStr = req.query.s
    
        const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchStr}`
        try {
            const response = await fetch(url)
            const data = await response.json()
            res.send(data)
        } catch (error) {
            console.log(error)
        }
    } else {
        res.send({
            "Response": "False",
            "Error": "Movie not found!"
        })
    }

})

app.get("/api/movie/omdbapi/id", async (req, res) => {

    const domain = req.headers.origin
    // console.log(domain)


    if (allowedDomains.includes(domain)) {
        const apiKey = process.env.OMDb_API_KEY
    
        const searchStr = req.query.i
    
        const url = `http://www.omdbapi.com/?apikey=${apiKey}&i=${searchStr}&plot=full`
        try {
            const response = await fetch(url)
            const data = await response.json()
            res.send(data)
        } catch (error) {
            console.log(error)
        }
    } else {
        res.send({
            "Response": "False",
            "Error": "Movie not found!"
        })
    }

})


const PORT = process.env.PORT || 5001

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))