const express = require("express");
const request = require("request-promise");
const cheerio = require("cheerio");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

async function mynimo() {
    let packages = [];
    const html = await request.get("https://www.mynimo.com/cebu-jobs");
    const $ = cheerio.load(html);
    $("div.css-j7qwjs.css-0").map((index, element) => {
        const title = $(element).find("div > p").text();
        // const paragraph = $(element).find("ul > li").text();
        const package = {
            title: title,
            // paragraph: paragraph,
        }
        packages.push(package);

    }).get();
    return packages;
}

async function main() {
    mynimo();
}

app.get("/", (req, res) => {
    res.send("Welcome to Tours API");
})

app.get("/jobs", async (req, res) => {
    try {
        const packages = await mynimo();
        res.json(packages);
    } catch (error) {
        res.json(error);
    }
});


app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));