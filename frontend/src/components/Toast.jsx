import { useToast } from '../hooks/useToast'
import '../style/toast.css'

const Toast = () => {
  const { toast, visible } = useToast()

  if (!toast) return null;

  return (
    <div className={`toast toast-${toast.type} ${visible ? 'slide-in' : 'slide-out'}`}>
      {toast.message}
    </div>
  )
}

export default Toast