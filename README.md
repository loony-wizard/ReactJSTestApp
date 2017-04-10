# ReactJS Test Application

## Запуск приложения

Если не поставлен json-server, то пишем команду в корневой папке проекта, где лежит package.json

```
npm install -g json-server
```

```
json-server db.json
```

Далее открываем в браузере

```
http://localhost:3000/
```

## Что делает приложение
Приложение позволяет редактировать экземпляры двух разных моделей: Department(name) и Employee(firstName, lastName, departmentId)

## Использованный стек технологий:

* ReactJS
* React-redux
* React-router
* Gulp
* Webpack
* Babel
* Bootstrap
* SASS
* json-server