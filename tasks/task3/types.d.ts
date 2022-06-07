declare namespace Model {
  export interface User {
    id: number
    login: string
    password: string
    age: number
    is_deleted: boolean
  }

  export type Permission =
    | 'READ'
    | 'WRITE'
    | 'DELETE'
    | 'SHARE'
    | 'UPLOAD_FILES'

  export interface Group {
    id: number
    name: string
    permissions: Permission[]
  }
}
