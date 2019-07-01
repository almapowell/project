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
    // ******

    getOneFilm: async (req, res) => {
        try {
            let db = req.app.get('db')
            let { video_id } = req.params
            let singleFilm = await db.get_one_film({ video_id })
            res.send(singleFilm)
        } catch (error) {
            console.log('Error fetching the video', error)
            res.status(500).send(error)
        }
    },
    
    createVideo: async (req, res) => {
        try {
            console.log('Hit back end!')
            let db = req.app.get('db')
            let { url } = req.body
            let film = await db.post_film({url})
            res.status(200).send(film)
        } catch (error) {
            console.log('Error creating video', error)
            res.status(500).send(error)
        }
    },
    // ****

    deleteVideo: async (req, res) => {
        try {
            let db = req.app.get('db')
            let { video_id } = req.params
            const videos = await db.delete_video({video_id})
            res.status(200).send(videos)
        } catch (error) {
            console.log('Error creating video', error)
            res.status(500).send(error)
        }
    }
}