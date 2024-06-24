import express  from 'express'
import cors from 'cors'
import { EventController } from './controllers/event-controller'

const app = express()

app.use(cors())
app.use(express.json())

//* Public
app.get('/', (req, res) => {
  res.json({
    message: 'SSE Server example!'
  })
})

let clients: any[] = []
let notifications: any[] = []

app.get('/notifications/:userId', (req, res, next) => EventController.subscribeEvents(
  req,
  res,
  next,
  clients,
  notifications
))
app.post('/add-notifications', (req, res, next) => EventController.addNotification(
  req,
  res,
  next,
  clients,
  notifications
)
)

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})