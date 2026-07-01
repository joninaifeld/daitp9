import PostService from '../services/post-service.js'
import LogHelper from '../helpers/log-helper.js'

export default class PostController {
    static async getAll(req, res) {
        try {
            const posts = await PostService.getAll()
            return res.status(200).json(posts)
        } catch (err) {
            await LogHelper.log(err)
            return res.status(500).send('Internal error')
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params
            const post = await PostService.getById(id)
            if (!post) {
                return res.status(404).send('Post not found')
            }
            return res.status(200).json(post)
        } catch (err) {
            await LogHelper.log(err)
            return res.status(500).send('Internal error')
        }
    }

    static async create(req, res) {
        try {
            const data = req.body
            if (!data || Object.keys(data).length === 0) {
                return res.status(400).send('Post data is required')
            }
            const newPost = await PostService.create(data)
            return res.status(201).json(newPost)
        } catch (err) {
            await LogHelper.log(err)
            return res.status(500).send('Internal error')
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params
            const data = req.body
            if (!data || Object.keys(data).length === 0) {
                return res.status(400).send('Update data is required')
            }
            const updatedPost = await PostService.update(id, data)
            if (!updatedPost) {
                return res.status(404).send('Post not found')
            }
            return res.status(200).json(updatedPost)
        } catch (err) {
            await LogHelper.log(err)
            return res.status(500).send('Internal error')
        }
    }

    static async remove(req, res) {
        try {
            const { id } = req.params
            const deleted = await PostService.delete(id)
            if (!deleted) {
                return res.status(404).send('Post not found')
            }
            return res.status(204).send()
        } catch (err) {
            await LogHelper.log(err)
            return res.status(500).send('Internal error')
        }
    }
}
