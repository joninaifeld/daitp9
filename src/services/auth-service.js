import supabase from '../config/supabase.js'
import jwtHelper from '../helpers/jwt-helper.js'
import HashHelper from '../helpers/hash-helper.js'
import LogHelper from '../helpers/log-helper.js'

export default class AuthService {
    constructor() {
        this.table = 'users'
    }

    async login(email, password) {
        const { data, error } = await supabase
            .from(this.table)
            .select('username, full_name, email, pfp, bio, verified, followers, following')
            .eq('email', email)
            .single()

        if (error && error.code !== 'PGRST116') {
            throw new Error('Error logging in')
        }

        if (!data) {
            throw new Error('Invalid credentials')
        }

        const matches = HashHelper.compare(password, data.password)
        if (!matches) {
            throw new Error('Invalid credentials')
        }

        const token = jwtHelper.generate({ userId: data.id, email: data.email })
        return { data, token }
    }

    async register(username, fullName, email, password) {
        const isExisting = await this.isUserExisting(email)
        if (isExisting) {
            throw new Error('Email already exists')
        }
        const hashed = HashHelper.hash(password)
        if (!hashed) {
            throw new Error('Error processing password')
        }

        const { data, error } = await supabase
            .from(this.table)
            .insert({ username, full_name: fullName, email, password: hashed })
            .select('username, full_name, email, pfp, bio, verified, followers, following')
            .single()

        if (error) {
            throw new Error('Error registering user')
        }

        const token = jwtHelper.generate({ userId: data.id, email: data.email })
        return { data, token }
    }

    async isUserExisting(email) {
        const { data, error } = await supabase
            .from(this.table)
            .select('*')
            .eq('email', email)
            .single()
        if (error && error.code !== 'PGRST116') {
            throw new Error('Error fetching user by email')
        }
        return !!data
    }
}