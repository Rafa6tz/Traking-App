const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.use(require('./routes/userRoute'))
app.use(require('./routes/clientRoute'))
app.use(require('./routes/supplierRoute'))
app.use(require('./routes/barCodeRoute'))

app.listen(3000, () => console.log('Server is running'))