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

  // 값이 바뀌지 않는 변수는 매개변수로 전달
  const amountFor = (perf: any, play: any) => {
    // 변수 초기화
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

    // 함수 안에서 값이 바뀌는 변수 반환
    return thisAmount
  }

  const statement = (invoice: any, plays: any) => {
    let totalAmount = 0
    let volumeCredits = 0
    let results = `청구 내역 (고객명: ${invoice.customer})\n`
    const format = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'KRW', maximumFractionDigits: 2 })
      .format

    invoice.performances.map((perf: any) => {
      const play = plays[perf.playID]

      // 위에서 추출한 함수를 이용
      let thisAmount = amountFor(perf, play)

      //   포인트를 적립한다.
      volumeCredits += Math.max(perf.audience - 30, 0)

      // 희극관객 5명마다 추가 포인트를 제공한다.
      if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5)

      // 청구 내역을 출력한다.
      results += `${play.name}: ${format(thisAmount / 100)} (${perf.audience})석 \n`
      totalAmount += thisAmount
    })
    results += `총액: ${format(totalAmount / 100)}\n`
    results += `적립 포인트: ${volumeCredits}점\n`
    console.log(results)
    return (
      <div>
        <span>{results}</span>
      </div>
    )
  }

  return (
    <>
      <h1>Chapter01... </h1>
      {statement(invoice, plays)}
    </>
  )
}

export default Chapter01
