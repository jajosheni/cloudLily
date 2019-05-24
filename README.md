# cloud Lily

<a href="https://github.com/jajosheni/LilyTheExplorer"><img src="https://img.shields.io/badge/mobile-app-a4c639 .svg"/></a>
<img src="https://img.shields.io/badge/node-JS-68a063.svg"/>
<img src="https://img.shields.io/badge/express-JS-gray.svg"/>
<img src="https://img.shields.io/badge/mongo-DB-589636.svg"/>
<img src="https://img.shields.io/badge/jade-PUG-brown.svg"/>
<p align="left">
<img width="375px" src="https://raw.githubusercontent.com/jajosheni/jajosheni.github.io/master/assets/sitepics/cloudlily.png">
</p>

### Installation

```console
$ npm install
```
### Start Server
```console
$ npm start
```

### Implemented API
``` URL = /api ```

```
ADVERTS:
  GET   /articles           | List adverts by params(check out the controller file)
  POST  /articles           | Create an advert
  GET   /articles/:id       | Get article by id
```


```
USERS:
  GET   /users/?user=USERNAME&password=PASSWORD | Authenticate User
  GET   /users/all                              | List all users
  POST  /users                                  | Create a user
  PUT   /users                                  | Update a user's password
```