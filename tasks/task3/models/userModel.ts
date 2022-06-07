import db from '../db'

const User = () => db.table<Model.User>('users')

class UserModel {
  constructor() {
    db.schema.hasTable('users').then((res) => {
      if (!res) {
        db.schema
          .createTable('users', (table) => {
            table.increments('id').primary()
            table.string('login', 255).notNullable()
            table.string('password', 255).notNullable()
            table.integer('age').checkBetween([4, 130])
            table.boolean('is_deleted').defaultTo(false).notNullable()
          })
          .then()
      }
    })
  }

  async listUsers(limit = 10) {
    const result = await User().select('*').limit(limit)
    return result
  }

  async createUser(data: Omit<Model.User, 'id' | 'is_deleted'>) {
    const result = await User().insert(data).returning('id')
    const [{ id }] = result
    return (await this.getUser(id))!
  }

  async getUser(id: number) {
    const result = await User().select('*').where('id', id).first()
    return result ?? null
  }

  async updateUser(
    id: number,
    params: Partial<Omit<Model.User, 'id' | 'login' | 'is_deleted'>>
  ) {
    const count = await User().where('id', id).update(params)
    if (!count) {
      return null
    }
    return await this.getUser(id)
  }

  async deleteUser(id: number) {
    const count = await User().where('id', id).update({ is_deleted: true })
    return Boolean(count)
  }
}

export const userModel = new UserModel()
