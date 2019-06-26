module.exports = {
    getAllFilms: async (req, res) => {
        try {
            let db = req.app.get('db')
            let films = await db.get_films()
            console.log('Here are your films', films)
            res.send(films)
        } catch (error) {
            console.log('Error fetching the videos', error)
            res.status(500).send(error)
        }
    },

    getOneFilm: async (req, res) => {
        try {
            let db = req.app.get('db')
            let singleFilm = await db.get_one_film()
            res.send(singleFilm)
        } catch (error) {
            console.log('Error fetching the video', error)
            res.status(500).send(error)
        }
    }

    
}