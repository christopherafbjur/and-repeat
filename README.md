# &Repeat Coding Test

Dockerized Express/Postgres/Typescript API

## Installation

Run the following command in the project root. Note, Docker must obviously be installed.

```bash
  docker-compose up
```

## API Reference

#### Get all messages

```http
  GET http://localhost:5000/api/
```

#### Add a message

```http
  POST http://localhost:5000/api/
```

| Req body parameter | Type     | Description   |
| :----------------- | :------- | :------------ |
| `title`            | `string` | **Required**. |
| `text`             | `string` | **Required**. |

#### Update a message

```http
  PUT http://localhost:5000/api/:id
```

| Query parameter | Type     | Description   |
| :-------------- | :------- | :------------ |
| `id`            | `string` | **Required**. |

| Req body parameter | Type     | Description   |
| :----------------- | :------- | :------------ |
| `title`            | `string` | **Optional**. |
| `text`             | `string` | **Optional**. |

```http
  DELETE http://localhost:5000/api/:id
```

| Query parameter | Type     | Description   |
| :-------------- | :------- | :------------ |
| `id`            | `string` | **Required**. |
