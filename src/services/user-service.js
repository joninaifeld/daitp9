import supabase from '../config/supabase.js'
import LogHelper from '../helpers/log-helper.js'

export default class UserService {
    constructor() {
        this.table = 'users'
    }

    async getPerfil(userId) {
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

    async updatePerfil(userId, updates) {
        const { data, error } = await supabase
            .from(this.table)
            .update(updates)
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
