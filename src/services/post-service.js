import supabase from '../config/supabase.js'
import { keysToSnakeCase } from '../helpers/case-helper.js'

export default class PostService {
    static table = 'posts'

    static async getAll() {
        const { data, error } = await supabase.from(this.table).select('*')
        if (error) throw error
        return data
    }

    static async getById(id) {
        const { data, error } = await supabase
            .from(this.table)
            .select('*')
            .eq('id', id)
            .single()

        if (error) {
            if (error.code === 'PGRST116') return null // no se encontró
            throw error
        }

        return data
    }

    static async create(post) {
        const snakePost = keysToSnakeCase(post)
        const { data, error } = await supabase
            .from(this.table)
            .insert(snakePost)
            .select()
            .single()

        if (error) throw error
        return data
    }

    static async update(id, post) {
        const snakePost = keysToSnakeCase(post)
        const { data, error } = await supabase
            .from(this.table)
            .update(snakePost)
            .eq('id', id)
            .select()
            .single()

        if (error) {
            if (error.code === 'PGRST116') return null
            throw error
        }

        return data
    }

    static async delete(id) {
        const { data, error } = await supabase
            .from(this.table)
            .delete()
            .eq('id', id)
            .select()

        if (error) throw error
        return data && data.length > 0
    }
}
