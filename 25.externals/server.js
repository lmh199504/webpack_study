const express = require('express')

const app = express()

app.use(express.static('dist',{maxAge:1000 * 3600}))

app.listen(3000,()=>{
	console.log('server is running....')
})