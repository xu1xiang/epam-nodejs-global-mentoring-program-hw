import { v4 as uuid } from 'uuid'

export type User = {
  id: string
  login: string
  password: string
  age: number
  isDeleted: boolean
}

const userList: User[] = []

export const listUser = async (limit: number) => {
  return userList.slice(0, limit)
}

export type CreateBody = Omit<User, 'id' | 'isDeleted'>
export const createUser = async (data: CreateBody): Promise<User> => {
  const { login, password, age } = data
  const raw = {
    id: uuid(),
    login,
    password,
    age,
    isDeleted: false,
  }
  userList.push(raw)
  return raw
}

export const getUser = async (id: string): Promise<User | null> => {
  return userList.find((item) => item.id === id) ?? null
}

export type UpdateBody = Partial<Omit<User, 'id' | 'login' | 'isDeleted'>>
export const updateUser = async (id: string, data: UpdateBody) => {
  const index = userList.findIndex((item) => item.id === id)
  if (index === -1) {
    return
  }

  const raw = userList[index]
  const result: User = {
    ...raw,
    ...data,
  }
  userList.splice(index, 1, result)
  return result
}

export const deleteUser = async (id: string) => {
  const index = userList.findIndex((item) => item.id === id)
  if (index === -1) {
    return
  }
  const { isDeleted, ...rest } = userList[index]
  const result = {
    ...rest,
    isDeleted: true,
  }
  userList.splice(index, 1, result)
}
