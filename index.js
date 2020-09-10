const express = require("express")
const fetch = require("node-fetch")

const app = express()


app.get("/", async (req, res) => {
    const url = "https://jsonplaceholder.typicode.com/posts/1"
    try {
        const response = await fetch(url)
        const data = await response.json()
        res.send(data)
    } catch (error) {
        console.log(error)
    }

})


const PORT = process.env.PORT || 5001

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))