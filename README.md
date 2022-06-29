# ntunhs-courses

![Uptime Robot status](https://img.shields.io/uptimerobot/status/m792062567-a7af76daf343d866dfeccd64)

北護大課程查詢系統

## Setup

### Docker

```shell
docker build -t ntunhs-courses .
```

```shell
docker run -d --cap-add=SYS_ADMIN --init --name ntunhs-courses -p 3000:3000 ntunhs-courses
```

## Links

[GitHub](https://github.com/yangszwei/ntunhs-courses)

[Website](https://ntunhs-courses.yangszwei.com/)
