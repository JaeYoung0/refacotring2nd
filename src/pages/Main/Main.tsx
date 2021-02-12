import Image from 'next/image'
import router from 'next/router'
import Button from '@material-ui/core/Button'

const Main = () => {
  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          router.push('/chapter01')
        }}
      >
        chapter 01
      </Button>
    </div>
  )
}

export default Main
