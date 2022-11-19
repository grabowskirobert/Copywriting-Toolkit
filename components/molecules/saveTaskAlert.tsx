import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import PopupWrapper from '../atoms/PopupWrapper'

export default function SaveTaskAlert() {
  return (
    <PopupWrapper>
      <AiOutlineLoading3Quarters size={60} />
    </PopupWrapper>
  )
}
