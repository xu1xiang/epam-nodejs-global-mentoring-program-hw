import db from '../db'

const Group = () => db.table<Model.Group>('groups')

class GroupModel {
  constructor() {
    db.schema.hasTable('groups').then((res) => {
      if (!res) {
        db.schema
          .createTable('groups', (table) => {
            table.increments('id').primary()
            table.string('name', 255).notNullable()
            table.specificType('permissions', 'text[]').notNullable()
          })
          .then()
      }
    })
  }

  async listGroups(limit = 10) {
    const result = await Group().select('*').limit(limit)
    return result
  }

  async getGroup(id: number) {
    const result = await Group().select('*').where('id', id).first()
    return result ?? null
  }

  async createGroup(data: Omit<Model.Group, 'id'>) {
    const result = await Group().insert(data).returning('id')
    const [{ id }] = result
    return (await this.getGroup(id))!
  }

  async updateGroup(id: number, params: Partial<Omit<Model.Group, 'id'>>) {
    const count = await Group().where('id', id).update(params)
    if (!count) {
      return null
    }
    return await this.getGroup(id)
  }

  async deleteGroup(id: number) {
    const count = await Group().where('id', id).delete()
    return Boolean(count)
  }
}

export const groupModel = new GroupModel()
