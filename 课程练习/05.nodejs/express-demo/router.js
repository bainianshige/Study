app
  .get('/', function (req, res) {
    // res.end('hello world')

    res.send('hello world')
  })

  .get('/login', (req, res) => {
    res.send(`
    <!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><title>Document</title></head><body><h1>hello login</h1></body></html>
    `)
  })
