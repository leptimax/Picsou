# Picsou

A little program permitting to check and follow comptability in real time 

## Installation (DEV)

`Picsou` nécessite la dépendances suivante :

- Cluster Opensearch

### Dépendances

En mode développement, l'utilisation de la configuration https://github.com/flavienbwk/opensearch-docker-compose est recommandée.

OpenDashboard est accessible sur https://localhost:5601/ (l: admin p: admin)

### Dépot Picsou

Cloner le projet Picsou.

Configurer un `.env` de développement local (`cp .env.example .env`):

```

BASE_ELASTIC_URL=https://172.17.0.1:9200
ELASTICSEARCH_INDEX=Picsou
ELASTICSEARCH_INDEX_PATTERN=Picsou*

```

Assurez-vous tout d'abord de lancer OpenSearch depuis son dossier (`docker-compose up -d`), puis lancer l'application globale : `docker-compose up -d`

L'application est alors accessible sur http://127.0.0.1:10132/ (**sans https**).

## Sécurité

## Licence
