import Image from 'next/image'
import router from 'next/router'

const Main = () => {
  return (
    <div>
      <button
        onClick={() => {
          router.push('/chapter01')
        }}
      >
        chapter 01
      </button>
    </div>
  )
}

export default Main
