import Image from 'next/image'
import router from 'next/router'
// import { invoice } from './invoice.js'
// import { plays } from './plays.js'

// const invoice = {
//     "customer":"BigCo"
// }

const Chapter01 = () => {
  const invoice = {
    customer: 'BigCo',
    performances: [
      {
        playID: 'hamlet',
        audience: 55,
      },
      {
        playID: 'aslike',
        audience: 35,
      },
      {
        playID: 'othello',
        audience: 40,
      },
    ],
  }

  const plays = {
    hamlet: { name: 'Hamlet', type: 'tragedy' },
    aslike: { name: 'As You Like It', type: 'comedy' },
    othello: { name: 'Othello', type: 'tragedy' },
  }

  const statement = (invoice: any, plays: any) => {
    let totalAmount = 0
    let volumeCredits = 0
    let results = `청구 내역 (고객명: ${invoice.customer}\n`
    const format = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
      .format

    invoice.performances.map((perf: any) => {
      const play = plays[perf.playID]
      let thisAmount = 0

      switch (play.type) {
        case 'tragedy':
          thisAmount = 40000
          if (perf.audience > 30) {
            thisAmount += 1000 * (perf.audience - 30)
          }
          break

        case 'comedy':
          thisAmount = 30000
          if (perf.audience > 20) {
            thisAmount += 10000 + 500 * (perf.audience - 20)
          }
          thisAmount += 300 * perf.audience
          break
        default:
          throw new Error(`알 수 없는 장르: ${play.type}`)
      }

      //   포인트를 적립한다.
      volumeCredits += Math.max(perf.audience - 30, 0)

      // 희극관객 5명마다 추가 포인트를 제공한다.
      if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5)

      // 청구 내역을 출력한다.
      results += `총액: ${format(totalAmount / 100)}\n`
      results += `적립 포인트: ${volumeCredits}점\n`
      console.log(results)
      return results
    })
  }

  return (
    <div>
      This is Chapter01...
      {statement(invoice, plays)}
    </div>
  )
}

export default Chapter01
