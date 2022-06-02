import knex from 'knex'

const db = knex({
  client: 'pg',
  connection: {
    host: 'ec2-34-227-120-79.compute-1.amazonaws.com',
    database: 'dfj652hdcfuujt',
    user: 'hweqremmxxphhr',
    port: 5432,
    password:
      '82dda0cb5f41981289143b937e71f3a06db0e0c1377a8bfabf2f65850d211c66',
    ssl: {
      rejectUnauthorized: false,
    },
  },
})

export default db
