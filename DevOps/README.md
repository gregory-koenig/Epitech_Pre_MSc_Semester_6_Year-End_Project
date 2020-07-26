# Dashboard

## Mise en place de l'environnement

**1. Installation des dépendances**

- Dépendances NodeJS

```bash
$ docker-compose run --rm server npm install
```

- Dépendances React

```bash
$ docker-compose run --rm front npm install
```

**2. Lancement de l'application**

```bash
$ docker-compose up
```

**3. Lancement des tests**

- Test NodeJS avec Jest

```bash
$ docker-compose run --rm server npm test
```

- Test React avec react-scripts test

```bash
$ docker-compose run --rm front npm test
```

## Ressources disponibles

- Tester l'accès à l'API : [localhost sur port 8080](127.0.0.1:8080)

```bash 
$ curl 127.0.0.1:8080/api/test/all
```

- Accéder au dashboard : [localhost sur port 3000](127.0.0.1:3000)