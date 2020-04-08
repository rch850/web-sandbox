import { useEffect } from 'react'
import Head from 'next/head'
import fetch from 'node-fetch'
import Chart from 'chart.js'

const populations = [5286, 1263, 1241, 2316, 981, 1090, 1864, 2877, 1946, 1952, 7330, 6255, 13822, 9177, 2246, 1050, 1143, 774, 817, 2063, 1997, 3659, 7537, 1791, 1412, 2591, 8813, 5484, 1339, 935, 560, 680, 1898, 2817, 1370, 736, 962, 1352, 706, 5107, 819, 1341, 1757, 1144, 1081, 1614, 1448]

export async function getStaticProps() {
  const res = await fetch('https://www.stopcovid19.jp/data/covid19japan-all.json')
  const json = await res.json()
  return {
    props: {
      days: json
    }
  }
}

function buildChartData(day) {
  const labels = day.area.map(a => a.name_jp)
  const npatients = day.area.map(a => a.npatients)
  const npatientsPerPopl = day.area.map((a, i) => a.npatients / populations[i] * 100)
  const ncurrentpatients = day.area.map(a => a.ncurrentpatients)
  return {
    labels,
    datasets: [{
      label: '10万人あたりの感染者数',
      // data: ncurrentpatients,
      // data: npatients,
      data: npatientsPerPopl,
      borderWidth: 1
    }]
  }
}

const Home = ({ days }) => {
  useEffect(() => {
    const ctx = document.getElementById('canvas').getContext('2d')
    let day = 0

    const myChart = new Chart(ctx, {
      type: 'horizontalBar',
      data: buildChartData(days[day]),
      options: {
        title: {
          display: true,
          text: days[day].lastUpdate
        }
      }
    })

    let intervalId = setInterval(() => {
      day++
      if (day >= days.length) {
        clearInterval(intervalId)
        return
      }
      const newData = buildChartData(days[day])
      newData.datasets[0].data.forEach((value, index) => {
        myChart.data.datasets[0].data[index] = value
      })
      myChart.options.title.text = days[day].lastUpdate
      myChart.update()
    }, 1000)
  })
  return (
  <div className="container">
    <Head>
      <title>COVID-19 Chart</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1 className="title">
        都道府県別の感染者数推移
      </h1>

      <canvas id="canvas" width="300" height="600"/>

      <div>
        出典<br></br>
        <a href="https://github.com/code4sabae/covid19">都道府県別、日別の感染者数</a><br></br>
        <a href="https://www.e-stat.go.jp/dbview?sid=0003312316">人口推計 平成30年10月1日現在人口推計 - e-Stat</a><br></br>
      </div>
    </main>

    <footer>
      <a
        href="https://zeit.co?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by <img src="/zeit.svg" alt="ZEIT Logo" />
      </a>
    </footer>

    <style jsx>{`
      .container {
        min-height: 100vh;
        padding: 0 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      main {
        padding: 5rem 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      footer {
        width: 100%;
        height: 100px;
        border-top: 1px solid #eaeaea;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      footer img {
        margin-left: 0.5rem;
      }

      footer a {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      .title a {
        color: #0070f3;
        text-decoration: none;
      }

      .title a:hover,
      .title a:focus,
      .title a:active {
        text-decoration: underline;
      }

      .title {
        margin: 0;
        line-height: 1.15;
        font-size: 2rem;
      }

      .title,
      .description {
        text-align: center;
      }

      .description {
        line-height: 1.5;
        font-size: 1.5rem;
      }

      code {
        background: #fafafa;
        border-radius: 5px;
        padding: 0.75rem;
        font-size: 1.1rem;
        font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
          DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
      }

      .grid {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;

        max-width: 800px;
        margin-top: 3rem;
      }

      .card {
        margin: 1rem;
        flex-basis: 45%;
        padding: 1.5rem;
        text-align: left;
        color: inherit;
        text-decoration: none;
        border: 1px solid #eaeaea;
        border-radius: 10px;
        transition: color 0.15s ease, border-color 0.15s ease;
      }

      .card:hover,
      .card:focus,
      .card:active {
        color: #0070f3;
        border-color: #0070f3;
      }

      .card h3 {
        margin: 0 0 1rem 0;
        font-size: 1.5rem;
      }

      .card p {
        margin: 0;
        font-size: 1.25rem;
        line-height: 1.5;
      }

      @media (max-width: 600px) {
        .grid {
          width: 100%;
          flex-direction: column;
        }
      }
    `}</style>

    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  </div>
  )
}

export default Home
