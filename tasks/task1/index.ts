import readline from 'node:readline'

const reverseString = (str: string): string => str.split('').reverse().join('')

const rl = readline.createInterface({
  input: process.stdin,
})

rl.on('line', (input) => {
  console.log(reverseString(input))
})
