# 🎮 Pokémon API

A REST API built with Node.js + Express providing full CRUD on a Pokémon dataset (1010 entries), with JWT authentication, pagination, Redis caching, and Swagger documentation.

---

## 🌐 Live URL

> https://your-deployed-url-here.com

---

## 📬 Postman Collection

> https://your-postman-collection-link-here

---

## 🚀 Features

- ✅ User registration & login (JWT)
- ✅ GET Pokémon (public, paginated, filterable by type)
- ✅ POST / PUT / DELETE Pokémon (protected)
- ✅ Redis caching (60s TTL)
- ✅ Swagger UI at `/api-docs`
- ✅ 1010+ Pokémon seeded from PokéAPI

---

## ⚙️ Environment Variables

Create a `.env` file at the root of the project:

```
PORT=3000
DATABASE_URL=your_mongodb_connection_string
REDIS_URL=your_redis_connection_string
JWT_SECRET=your_secret_key
```

| Variable       | Description                              |
|----------------|------------------------------------------|
| `PORT`         | Port to run the server (default 3000)    |
| `DATABASE_URL` | MongoDB Atlas connection string          |
| `REDIS_URL`    | Upstash Redis connection string          |
| `JWT_SECRET`   | Any long random string for signing JWTs  |

---

## 🛠 Setup

```bash
git clone https://github.com/your-username/my-api
cd my-api
npm install
cp .env.example .env
# Fill in your .env values
npm run seed      # Populate the database (takes ~2 min)
npm run dev       # Start the server
```

---

## 📖 API Endpoints

### Auth
| Method | Route               | Access  |
|--------|---------------------|---------|
| POST   | /api/auth/register  | Public  |
| POST   | /api/auth/login     | Public  |

### Pokémon
| Method | Route              | Access    |
|--------|--------------------|-----------|
| GET    | /api/pokemon       | Public    |
| GET    | /api/pokemon/:id   | Public    |
| POST   | /api/pokemon       | Protected |
| PUT    | /api/pokemon/:id   | Protected |
| DELETE | /api/pokemon/:id   | Protected |

### Query Parameters for GET /api/pokemon
- `page` — page number (default: 1)
- `limit` — items per page (max: 20)
- `type` — filter by type, e.g. `fire`, `water`

---

## 📄 Swagger Docs

Visit `http://localhost:3000/api-docs` after starting the server.

---

## ☁️ Deployment (Render)

1. Push code to GitHub
2. Create a free account at [render.com](https://render.com)
3. New → Web Service → connect your repo
4. Set Build Command: `npm install`
5. Set Start Command: `node src/index.js`
6. Add all environment variables under "Environment"
7. Deploy!
