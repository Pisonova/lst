
# LST (Letná škola Trojstenu)

## Development setup (Linux)

### Backend

You need to have installed on your computer:
- docker
- virtualenv

Prepare environment:

```
cd lst
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
```

Prepare database:

```
docker compose up postgres --detach
python manage.py migrate
```

Start the development server:
`python manage.py runserver`

### Frontend

Install `node` and `npm`, recommended way is using [nvm](https://github.com/nvm-sh/nvm).

In the frontend directory:
- to install dependencies `npm install`
- to create static build run `npm run build`
- to start a development server run `npm start`
