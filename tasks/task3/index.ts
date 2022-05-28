import chalk from 'chalk'
import express, { json } from 'express'
import router from './routes'

const app = express()
const port = 12306

app.use(json())
app.use(router)
app.use((err: Error) => {
  console.error(err.stack)
})

app.listen(port, () => {
  console.log(chalk.greenBright(`http://localhost:${port}`))
})
