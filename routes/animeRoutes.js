import express, { Router } from "express";
import axios from "axios";

const router = express.Router();

router.get("/", (req, res) => {
    res.render("index");
});

router.post("/search", async(req, res) => {
    const searchQuery = req.body.query;

    const query =` 
    query($search: String) {
        Page(perPage: 8){
            media(search: $search, type:ANIME){
                id
                title {
                    romaji
                    english
                }
                description(asHtml : false)
                coverImage {
                    large
                }
            }
        }
    }
   `;
   
   try {
    const response = await axios.post("https://graphql.anilist.co", {
        query: query,
        variables: {search : searchQuery},
    });

    const animeList = response.data.data.Page.media;
    res.render("result", { animeList});
   } catch(error){
    console.error(error.message);
    res.render("error", { message: "Something went wrong fetching data!"});
   }
});

export default router;