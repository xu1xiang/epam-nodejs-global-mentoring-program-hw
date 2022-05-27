import csv from 'csvtojson'
import { createWriteStream } from 'node:fs'
import path from 'node:path'

const rs = csv().fromFile(path.join(__dirname, '1.csv'))
const ws = createWriteStream(path.join(__dirname, '1.txt'), {
  highWaterMark: 10,
})

rs.on('data', (chunk) => {
  if (!ws.write(chunk)) {
    console.log('pause')
    rs.pause()
  }
}).on('error', (err) => {
  console.error(err)
})

ws.on('drain', () => {
  console.log('drain')
  rs.resume()
}).on('error', (err) => {
  console.error(err)
})
