import supabase from '../config/supabase.js'

export default class PostService {
  constructor() {
    this.table = 'posts'
  }

  async getAll() {
    const { data, error } = await supabase.from(this.table).select('*')
    if (error) throw error
    return data
  }

  async getById(id) {
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

  async create(post) {
    const { data, error } = await supabase
      .from(this.table)
      .insert(post)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async update(id, post) {
    const { data, error } = await supabase
      .from(this.table)
      .update(post)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }

    return data
  }

  async delete(id) {
    const { data, error } = await supabase
      .from(this.table)
      .delete()
      .eq('id', id)
      .select()

    if (error) throw error
    return data && data.length > 0
  }
}
