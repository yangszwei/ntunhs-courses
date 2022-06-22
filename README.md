# ntunhs-courses

![Uptime Robot status](https://img.shields.io/uptimerobot/status/m792062567-a7af76daf343d866dfeccd64)

北護大課程查詢系統

## Setup

### Docker

```shell
docker build -t ntunhs-courses .
docker run -d --name ntunhs-courses -p 3000:3000 ntunhs-courses
```

## Planned Features

- **Implement search functionality**
- View Modes (Next Semester / Past Courses)
- Personalized results based on ToR
- Confirm on selecting overlapping courses
- Save/Load course selection
- Cache search result in session storage
- Improve search filters
- Streamline user interface
- Basic PWA Support

## Links

[GitHub](https://github.com/yangszwei/ntunhs-courses)

[Website](https://ntunhs-courses.yangszwei.com/)
