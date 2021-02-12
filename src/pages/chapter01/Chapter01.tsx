import router from 'next/router'
import { invoice, plays } from './data'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'

interface aPerformance {
  id: number
  playID: any
  audience: number
}

interface play {
  name: string
  type: string
}

const Chapter01 = () => {
  const statement = (invoice: any, plays: any) => {
    const statementData = { ...invoice }

    console.log('statementData', statementData)
    return renderPlainText(statementData, plays)
  }

  const renderPlainText = (data: any, plays: any) => {
    const totalAmount = () => {
      let result = 0
      data.performances.map((perf: aPerformance) => {
        result += amountFor(perf)
      })
      return result
    }

    const totalVolumeCredits = () => {
      let volumeCredits = 0
      data.performances.map((perf: aPerformance) => {
        volumeCredits += volumeCreditsFor(perf)
      })

      return volumeCredits
    }

    const usd = (aNumber: number) => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(
        aNumber / 100
      )
    }

    const volumeCreditsFor = (aPerformance: aPerformance) => {
      //   포인트를 적립한다.
      let volumeCredits = 0
      volumeCredits += Math.max(aPerformance.audience - 30, 0)

      // 희극관객 5명마다 추가 포인트를 제공한다.
      if ('comedy' === playFor(aPerformance).type) volumeCredits += Math.floor(aPerformance.audience / 5)

      return volumeCredits
    }

    const playFor = (aPerformance: aPerformance) => plays[aPerformance.playID]

    const amountFor = (aPerformance: any) => {
      let thisAmount = 0
      switch (playFor(aPerformance).type) {
        case 'tragedy':
          thisAmount = 40000
          if (aPerformance.audience > 30) {
            thisAmount += 1000 * (aPerformance.audience - 30)
          }
          break

        case 'comedy':
          thisAmount = 30000
          if (aPerformance.audience > 20) {
            thisAmount += 10000 + 500 * (aPerformance.audience - 20)
          }
          thisAmount += 300 * aPerformance.audience
          break
        default:
          throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`)
      }

      return thisAmount
    }

    let result = `청구 내역 (고객명: ${data.customer})\n`

    data.performances.map((perf: aPerformance) => {
      result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience})석 \n`
    })

    result += `총액: ${usd(totalAmount())}\n`
    result += `적립 포인트: ${totalVolumeCredits()}점\n`
    console.log(result)
    return result
  }

  return (
    <>
      <IconButton
        color="primary"
        onClick={() => {
          router.push('/')
        }}
      >
        <HomeIcon />
      </IconButton>
      <h1>Chapter01... </h1>
      {statement(invoice, plays)}
    </>
  )
}

export default Chapter01
