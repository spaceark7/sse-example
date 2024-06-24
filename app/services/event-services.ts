
export class EventServices {
  static async handler(clients: any[], userId: string, res: any) {
    try {
      if (!userId) {
        return;
      }
       const newClient = {
         id: userId,
         time: new Date(),
         res
       }

        clients.push(newClient)
       console.log('EventServices:handle:clients', clients)
        return clients

    } catch (error) {
      console.log('EventServices:handler:error',error)
    }
  }

  static async removeClient(userId: string, clients?: any[]) {
    try {
      if (!clients) {
        return
      }
      clients = clients.filter((client) => client.id !== userId)
    } catch (error) {
      console.log('EventServices:removeClient:error',error)
    }
  }

  static  notifyClients(clients: any[], data: any) {
    console.log('EventServices:notifyClients:clients', clients)
    try {
      clients.forEach((client) => {
         if (client) {
           client.res.write(`data: ${JSON.stringify(data)}\n\n`)
         } else {
           // Optionally, handle the case where client.res is undefined
           console.error(
             'EventServices:notifyClients:Client response object is undefined.'
           )
         }
      })
    } catch (error) {
      console.log('EventServices:notifyClients:error',error)
    }
  }

  static  async addNotification(notifications: any[], data: any) {
    try {
      notifications.push(data)
      return notifications
    } catch (error) {
      console.log('EventServices:addNotification:error',error)
    }
  }
}