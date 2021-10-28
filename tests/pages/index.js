
import {useReport} from "../utils/useReport"
import {getOptions} from "../utils/getOptions"
import ReportChart from "../components/ReportChart"
import EmptyPlaceholder from "../components/EmptyPlaceholder"

function HomePage() {
  const [report, _] = useReport()

  const loadChart=()=>{
    if (!report){
      return (
      <section>
        <dv4-loader-timer>Loading chart...</dv4-loader-timer>
      </section>
      )
    }else if (report.length===0){
      return <EmptyPlaceholder />
    }else{
      return <ReportChart
        className="hc-chart-section"
        options={getOptions(report,60)} />
    }
  }

  return (
    <article>
      <h1>Todo api max. load tests by framework</h1>
      <p>
        Below are the results from the load tests for each api framework I tried.
        The chart shows the amount of requests handled by each api during the
        maximum server load for 30 seconds. <b>Higher score is better.</b>&nbsp;
        Load tests are performed with <a href="https://github.com/mcollina/autocannon" target="_new">autocannon</a>. The duration of load test can
        be changed in the configuration of autocannon scripts (autocannon/utils.js).
      </p><p>
        An simple table otput is available <a href="/table" target="_new">here</a>.
        All data generated by autocannon can be extracted <a href="/api/report" target="_new">from here</a>. Autocannon provides more stats but I choose to focus on
        the amount of handled requests because it is the most important
        metric for me.
      </p>
      <p>
        My conclusion: Actix (Rust) is clearly faster than other frameworks
        while flask api in Python is the slowest. The results might be
        different when api uses different database
        and maybe different database driver.
      </p>
      {loadChart()}
      <h3>How to reproduce the results?</h3>
      <p>
        You can clone this repo and run all load tests on your own. There is a shell
        script in the root of the repo that will run one round of tests for all api's once.
        Your figures will high likely be different. I excpect that running this benchmark on different machines
        and processors will provide us some interessting insights!
      </p>
    </article>
  )
}

export default HomePage