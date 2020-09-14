require('dotenv').config()
const express = require("express")
const fetch = require("node-fetch")
const cors = require("cors")


const allowedDomains = ["http://localhost:5001", "http://localhost:3000"]


const app = express()

app.use(cors())

app.get("/api/movie/omdbapi", async (req, res) => {

    const domain = req.headers.origin
    // console.log(domain)


    if (allowedDomains.includes(domain)) {
        const apiKey = process.env.OMDb_API_KEY
    
        const queryParams = Object.entries(req.query).map(([key, value]) => `${key}=${value}`).join("&")
    
        const url = `http://www.omdbapi.com/?apikey=${apiKey}&${queryParams}`
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