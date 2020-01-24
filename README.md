# Multicore NodeJs Application

This is an application that simulates an example of a CPU-bound task that is able to use multiple CPU cores of the host. This is a feature that usually people don't implement until performance is really an issue (extremely high concurrency). It uses [cluster](https://nodejs.org/api/cluster.html) built-in node module to fork as many processes as possible. The master process is only responsible to act as a "load balancer", creating and delegating child processes.

## Usage

To use and test the application, simply run the following command in the cloned folder:

```
node index.js
```

To make the application run the task, make a REST call to the endpoint:

```
GET http://localhost:3000/sum
```

If you want to test if the child processes are really working on the demand, you can use a load test software such Apache JMeter to run concurrent requests.
