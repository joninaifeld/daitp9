import supabase from '../config/supabase.js'
import LogHelper from '../helpers/log-helper.js'
import { keysToSnakeCase } from '../helpers/case-helper.js'

export default class UserService {
    static table = 'users'

    static async getPerfil(userId) {
        const { data, error } = await supabase
            .from(this.table)
            .select('*')
            .eq('id', userId)
            .single()

        if (error) {
            if (error.code === 'PGRST116') {
                return null
            }
            throw new Error('Error fetching user profile')
        }

        return data
    }

    static async updatePerfil(userId, updates) {
        const snakeUpdates = keysToSnakeCase(updates)
        const { data, error } = await supabase
            .from(this.table)
            .update(snakeUpdates)
            .eq('id', userId)
            .select()
            .single()

        if (error) {
            if (error.code === 'PGRST116') {
                return null
            }
            throw new Error('Error updating user profile')
        }

        return data
    }
}
