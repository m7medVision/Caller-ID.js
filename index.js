const axios = require('axios')  
const express = require('express')
var requestIp = require('request-ip')
const app = express()
const fs = require('fs')
const port = 3000 

  
app.get('/:code/:num/', async (req, res) => {
  const code = await req.params.code
  const num = await req.params.num
  const clientIp = requestIp.getClientIp(req)
  const { data } = await axios.get(`https://majhcc.pw/api/callerID/${code}/${num}`)
  console.log(`someone use api ==> number: ${num}`)
  res.send( data )
  fs.writeFile('log.txt', `${clientIp} ask ${num}+\n` ,{ flag: 'a+' }, err => {
    if (err) {
      console.error(err)
      return
    }
  })
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})