# hapi.user.project.task

A simple NodeJS project that features an API around User, Project and Task models.
I did it to introduce myself to the HapiJs framework.

### Install Dependencies and Start

```shell script
$ yarn install
$ yarn start
```

or, with `docker-compose` (in dev-mode by default)

```shell script
$ docker-compose up --build
```

### What's Included

+ Open/Close router
+ Sequelize models and migrations
+ Integration tests with `@hapi/lab`
+ `Dockerfile` for docker containerization

### What's not Included

+ Authentication
+ OpenAPI documentation
+ API filtering or GraphQL

### How to Configure

Configure using optional `.env` file or any variant supported by [env-cmd](https://www.npmjs.com/package/env-cmd)
or your favorite way to define environment variable.

Which environment variables are available are all collected and eventually processed at `src/env.js`
and I believe their name are straightforward.

Note that the `DEBUG` environment variable that controls logging uses package name from `package.json`.
For example, if the package name is `corona`, you can use `DEBUG=corona:*` to show logging only from the current package an nothing else.

Note also that a debug logging from `src/api/route.js` at `38:43` will start by `corona:src/api/route:debug {38:43}`.
I think this kinda goto improvement will facilitate debugging/tracing behaviours.

### License

This' under MIT license.

### Contributions

I hold in high esteem remarks, comments, and questions.
Feel comfortable opening an issue or reaching out.

Thanks,
<br/>
Salathiel Genese
<br>
salathiel@genese.name
