import { useContext } from 'react'
import NotificationContext from '../NotificationContextProvider'

const Notification = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  console.log(notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
