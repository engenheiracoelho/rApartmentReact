import debug from 'debug'
import { detect } from 'detect-browser'

const log = debug('speak')
const browser = detect()

export const speak = (text: string) => {
  if (!window.speechSynthesis || window.speechSynthesis.speaking) {
    log('speechSynthesis not available')
    return
  }

  return new Promise((resolve, reject) => {
    const ssu = new SpeechSynthesisUtterance(text)
    const iosTrigger = document.getElementById('ios-speak') as HTMLButtonElement
    ssu.lang = 'en-US'

    if (browser!.os === 'iOS') {
      log('speak for Safari iOS')

      const customSpeak = (e: MouseEvent) => {
        e.preventDefault()
        window.speechSynthesis.speak(ssu)
      }

      iosTrigger.addEventListener('click', customSpeak)
      iosTrigger.click()
      iosTrigger.removeEventListener('click', customSpeak)
      setTimeout(() => {
        resolve()
      }, 2000)
    } else {
      ssu.onend = () => {
        resolve()
      }
      window.speechSynthesis.speak(ssu)
    }
  })
}
