import PostService from '../services/post-service.js'
import LogHelper from '../helpers/log-helper.js'

const svc = new PostService()

const PostController = {
    async getAll(req, res) {
        try {
            const posts = await svc.getAll()
            return res.status(200).json(posts)
        } catch (err) {
            await LogHelper.log(err)
            return res.status(500).send('Internal error')
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params
            const post = await svc.getById(id)
            if (!post) {
                return res.status(404).send('Post not found')
            }
            return res.status(200).json(post)
        } catch (err) {
            await LogHelper.log(err)
            return res.status(500).send('Internal error')
        }
    },

    async create(req, res) {
        try {
            const data = req.body
            if (!data || Object.keys(data).length === 0) {
                return res.status(400).send('Post data is required')
            }
            const newPost = await svc.create(data)
            return res.status(201).json(newPost)
        } catch (err) {
            await LogHelper.log(err)
            return res.status(500).send('Internal error')
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params
            const data = req.body
            if (!data || Object.keys(data).length === 0) {
                return res.status(400).send('Update data is required')
            }
            const updatedPost = await svc.update(id, data)
            if (!updatedPost) {
                return res.status(404).send('Post not found')
            }
            return res.status(200).json(updatedPost)
        } catch (err) {
            await LogHelper.log(err)
            return res.status(500).send('Internal error')
        }
    },

    async remove(req, res) {
        try {
            const { id } = req.params
            const deleted = await svc.delete(id)
            if (!deleted) {
                return res.status(404).send('Post not found')
            }
            return res.status(204).send()
        } catch (err) {
            await LogHelper.log(err)
            return res.status(500).send('Internal error')
        }
    },
}

export default PostController
