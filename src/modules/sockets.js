import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
window.Pusher = Pusher

const serv = '103.23.199.134'
const port = 6001

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'liveharry_key',
  cluster: 'mt1',
  wsHost: serv,
  wsPort: port,
  forceTLS: false,
  disableStats: true,
  enabledTransports: ['ws']
  // authEndpoint: SERV + '/api/broadcasting/auth',
  // auth: {
  //   headers: {
  //     Authorization: 'Bearer ' + getLocalToken()
  //   }
  // }

})

// const laravelEcho = window.Echo

const notifchanel = window.Echo.channel('public.notif.1')
const notifchannel = window.Echo.channel('notif')

export { notifchannel, notifchanel }
