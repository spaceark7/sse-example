import { EventServices } from '../services/event-services'
import { NextFunction, Request, Response, response } from 'express'


export class EventController {
  static async subscribeEvents(
    req: Request,
    res: Response,
    next: NextFunction,
    clients: any[],
    notifications: any[]
  ) {
    const {userId} = req.params
    console.log('userId', userId)

    //* Writeheads
    const headers = {
        'Content-Type': 'text/event-stream',
        Connection: 'keep-alive',
        'Cache-Control': 'no-cache'
      }
    res.writeHead(200, headers)
    const data = `data: ${JSON.stringify(notifications)}\n\n`
    res.write(data)

    try {
      // const _clients = await EventServices.handler(clients, userId, res)
       const newClient = {
         id: userId,
         res
       }

       clients.push(newClient)

      req.on('close', () => {
        console.log('Connection closed')
        EventServices.removeClient(userId, clients)
      })

      // res.status(200).json(
      //   ResponseDTO({
      //     data: data,
      //     instanceName: 'Get All Transaction',
      //     status: HTTP_RESPONSE_STATUS.OK,
      //     method: HTTP_METHOD.GET
      //   })
      // )
    } catch (error) {
      next(error)
    }
  }

  static async addNotification( req: Request,
    res: Response,
    next: NextFunction,
    clients: any[],
    notifications: any[]) {
      try {
          await EventServices.addNotification(notifications, req.body)
          res.status(200).json({
            message: 'Notification added',
          })
           EventServices.notifyClients(clients, notifications,)
      } catch (error) {
        next(error)
      }
    
    }
}
