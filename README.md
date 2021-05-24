# Todo API load tests

Testing various api technologies and learning how to use them.

## Disclaimer

My experience with some of used technologies is limited. The scores might not reflect the full potential of the language or used library. Although these solutions seem reasonably simple there are still a lot of factors that influence the scores. All feedback, advice and contribution is welcome. I am interested in bringing all of used technologies to their maximum performance and increase my knowledge.

## Background

I primarily used nodejs and express to serve data to my frontends in the past. Over the time I have seen alternative solutions my clients used for developing the api's for web applications. I see a number of interesting alternatives to nodejs/express in 2020. My goal is to test populair and performant approaches for building api's in the open source world, covering programming languages I already know (JavaScript, Python) and 2 new languages. I selected Go and Rust because these are modern languages and web oriented. I discarded Java, C++, PHP and many others based on my personal preference. During my investigation I came across discussions about the performance of various api libraries. That brought me to idea to create this repo with all api solutions I am interested in and to perform load tests on each of them. For load tests I used [autocannon](https://github.com/mcollina/autocannon).

Api server is an important part of the backend solution. Another important part is the database. I use identical PostgreSQL docker container with all api's. Postgres is well supported in all technologies I want to test and quite popular and performant.

## Performance overview

Below it the overview of tested techologies and my personal opinion. The performance is rated on 5-point scale: excellent, very good, good, fair and poor. Note! that **I have not rated any of api's to have poor performance**. The ease of creating the api is rated on 4-point scale: easy, fair, hard and very hard. Rust was without doubt the hardest api for me to develop. For me was Golang lot easier to learn.

| Api              | Langauge       | Library     | Performance | Ease | Size MB\*\* | My Rank |
| ---------------- | -------------- | ----------- | ----------- | ---- | ----------- | ------- |
| todo-actix-api   | Rust           | actix-web   | excellent   | hard | 10 - 80     | 1       |
| todo-dotnet-api  | C# dotnet MS   | Entity      | fair        | hard | 215 - 1000  | 5       |
| todo-express-api | NodeJS         | express     | good/fair   | easy | 40 - 200    | 3       |
| todo-fast-api    | Python         | fastapi     | very/good   | fair | 300         | 2       |
| todo-fastify-api | NodeJS         | fastify     | excellent   | easy | 40 - 200    | 1       |
| todo-fiber-api   | Golang         | fiber       | very/good   | fair | 16          | 2       |
| todo-flask-api   | Python         | flask       | fair        | easy | 70          | 4       |
| todo-hasura-api  | Haskel/GraphQL | hasura      | fair        | easy | ??          | 4       |
| todo-mux-api     | Golang         | net/http    | good        | hard | 14          | 3       |
| todo-nanoexpress | NodeJS         | nanoexpress | excellent   | easy | 160 - 210   | 1       |
| todo-oak-api     | Deno           | oak         | very good   | fair | 130         | 2       |
| todo-polka-api   | NodeJS         | polka       | very good   | fair | 40 - 200    | 2       |

\*\* Docker image size produced by Dockerfile used for the benchmark run. Minimal image size is achieved using alpine but it has impact on the maximum performance of node libraries (fastify and express). It seems that maximal performance with node libraries and reasonable image size is achieved using node-debian-slim as base image.

### Links to used libraries

- `Golang`: Default [net/http](https://golang.org/pkg/net/http/) library is used and [fiber](https://github.com/gofiber/fiber) which advertise itself to be very fast and uses kind-of-express-way approach (easy to switch from NodeJS/Express).
- `Rust`: [Actix-web](https://github.com/actix/actix-web) is popular in Rust world and achieves the highest performance scores in the [benchmark](https://www.techempower.com/benchmarks/#section=data-r0&hw=ph&test=composite&a=2). In my load tests too it is the fastest api library.
- `NodeJS`: [Polka](https://github.com/lukeed/polka) seem to be advertised as the fastest NodeJS web server. [Express](https://expressjs.com/) is used as a benchmark to Polka and as most popular node api server. Later is [nanoexpress](https://github.com/nanoexpress/nanoexpress) added as new fast solution. Last node library added is [fastify](https://www.fastify.io/). It achieved excellent results!
- `Deno`: It is new technology recently moved to version 1. Most popular choice medio 2020 seem to be [Oak](https://github.com/oakserver/oak) http server.
- `Python`: [Flask](https://flask.palletsprojects.com/en/1.1.x/) is popular basic web server widely used. [FastApi](https://github.com/tiangolo/fastapi) is marked as the fastest python library for api's. My tests confirm that FastApi is significantly faster than flask.
- `GraphQL`: is alternative approach to standard REST api architecture. All other api's use REST approach. [Hasura](https://hasura.io/docs/1.0/graphql/manual/index.html) api, which is Haskel/GraphQL/Postgres implementation, implements the GraphQL endpoint and offers basic CRUD operations out of the box. It was quite easy to implement basic CRUD operations with Hasura. The performance is lower, which I expected, and the amount of traffic is significantly higher, which was surpring to me.
- `dotnet core (C#)`: I created dotnet core api using Udemy training. It uses modern async approach. However is uses Entity framework and MSSQL as backend instead of Postgres. The performance was bellow my expectations. I assume that performance bottleneck is MSSQL but I have not had time (yet) to swap MSSQL with Postgres. In addition, I am not sure how many dotnet users do use Postgres. I assume that mainstram approach with C# is to use MSSQL, and that exactly why I choose MSSQL. It is more practical benchmark instead of searching for max performance. Anyway I expected better results from compiled, strongly typed language (again I think MSSQL is the performance bottleneck).

## What these load test results mean actually (?)

Load tests of each solution give the `combined performance result` which include:

- the efficiency of used language (JavaScript, Python, Go, Rust, Haskel)
- the efficiency of http library and the router (tls/https is not used)
- the efficiency of library used to communicate with PostgreSQL (db driver)
- the efficiency of machine running the load tests
- how well composed Docker containers (Linux Alpine or Debian OS) perform on the test machine

## Conclusion

I runned load tests on 4 machines (2 laptops and 2 desktop) for all api's. All machines use Linux OS (Ubuntu/Linux Mint). The results are saved in the separate branches with the name of the machine (eg. dell-xps-2018...). I noticed slight differences in the ranking between used hardware/machine. This is a bit surprising. It looks to me that different programming languages and libraries utilize specific hardware better. The biggest difference I noticed is performance difference between Intel machines and AMD Ryzen machine. Actix and Dotnet show better performance on the Intel processors.

In addition, my knowledge of specific library is limited and can influence the scores. As an example the performance of FastApi significantly improved (from 50k to 90k) after tweaking api for the number of workers used on a specific machine (dell-xps-2018). Similair fluctuations in actix-api were also caused by experimenting with the number of used workers. I also noticed that the different number of workers produces the highest score on different machines/hardware. Setting number of workers to higher number does not yield the better score all the time.

The absolute scores/numbers per machine are different, but `rust api using actix-web is clearly one of the fastest and python/flask, hasura and dotnet are the slowest`. NodeJS (polka, express), Deno (oak) and Golang api's (fiber and standard http/mux) are in the middle of the chart. Surprisingly Python FastAPI seem to be performing very close to Golang and NodeJS/Deno api's after I optimized the number of workers. There might be some room to improve performance of Golang api's too but my knowledge of Golang at the moment is fairly limited.

The scores from my dell-xps-2018 laptop are shown in the image below. An interactive version of this chart with more scores is available on `http://localhost:3000` (NextJS app) after runing `npm run dev` in the tests folder. Of course this means that you first need to clone this repo locally on your machine :-).

<br/><br/>

<img src="tests/report/dell-xps-2018-i7-8550U-lm19.png">
Benchmark results on Dell XPS i7-8550U (Linux Mint 19)
<br/><br/>

Based on the load tests outcomes and my experience trying the new languages Golang and Rust I decided to invest more time in learning Rust rather than Golang. But I must admit that Golang seem to be easier to learn and faster in compiling than Rust.

Another pleasent surprise is Fastify. It performs very well, on AMD Ryzen machine it maches the rust-actix api performance and on Intel seem to be the second best performer in most cases. It is becoming very populair in the Node community and with good reason. Definetly word checking it if you are using node ecosystem.

<br/><br/>

<img src="tests/report/lm20-2020-R9-3900X.png">
Benchmark results on AMD Ryzen 9 3900X machine (Linux Mint 20)

<br/><br/>

## Development

This repo requires `docker and docker-compose` to run todo api's. For running load test and viewing simple table results you need `nodejs and npm`.

Running the load tests for the first time will require more time than the subsequent runs because all docker images need to be downloaded to your local machine.

The easiest way to run load tests on Linux/Mac is to use test-round.sh bash script. The script will create required containers in the background, run the test and then cleanup containers and the volumes used. You might need to make the script executable first.

```bash
# make executable (if needed)
sudo chmod +x test-round.sh
```

## How this repo works

Each todo\* folder contains complete api solution. All api's are functionally identical. They perform simple CRUD operations on Postgres database (todo_db). Each api folder has readme file where you can read how to start the api and run load test.

1. install npm dependencies for load tests and test report webpage.

```bash
# go to tests folder
cd tests
# install dependencies
npm install
# go back to root
cd ../
```

2. run tests using test-round.sh bash script (`Linux/MacOS only`): this script will run one round of 30 sec. load tests for all api's. You should run at least 3-5 rounds to have more reliable results for your machine.

```bash
# run test-round shell script (linux/MacOS)
./test-round.sh
```

## Contribution

All contributions are more than welcome as I am interested in bringing all of the used technologies to maximum performance and increase my knowledge.

If you want to contribute the scores of your machine please do so. I can create a new branch with your machine name. Based on my experience with running the api's on three different machines I expect that results on some other machines (and OS-es) could be quite different.
