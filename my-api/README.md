# Welcome to My Api
***

## Task
The challenge was to build a backend API that allows users to interact with a dataset while implementing authentication, caching, and CRUD operations. The API needed to support both public and protected routes, pagination, and hosting on a cloud platform.

## Description
Creating a Node.js + Express API connected to MongoDB
Implementing JWT-based user authentication for protected operations
Adding CRUD operations on the topic dataset
Supporting GET requests with pagination
Using Redis caching for frequently requested data to improve performance
Hosting the API on a cloud provider with environment variables

## Live URL
> https://myapi-production-4415.up.railway.app

## Swagger Docs
> https://myapi-production-4415.up.railway.app/api-docs
## Installation
```bash
npm install
npm run seed
npm run dev
```

## Usage
## Usage

### Auth Endpoints
| Method | Route | Access |
|--------|-------|--------|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |

### Pokémon Endpoints
| Method | Route | Access |
|--------|-------|--------|
| GET | /api/pokemon | Public |
| GET | /api/pokemon/:id | Public |
| POST | /api/pokemon | Protected |
| PUT | /api/pokemon/:id | Protected |
| DELETE | /api/pokemon/:id | Protected |

### Example Requests

**Register:**
```json
POST /api/auth/register
{
  "username": "xatire",
  "email": "xatire777aliyeva@gmail.com",
  "password": "xatire12345"
}
```

**Login:**
```json
POST /api/auth/login
{
  "email": "xatire777aliyeva@gmail.com",
  "password": "xatire12345"
}
```

**Get Pokémon (public):**
```
GET /api/pokemon?page=1&limit=20&type=fire
```

**Get one Pokémon (public):**
```
GET /api/pokemon/1
```
``
./my_project argument1 argument2
```

### The Core Team
liyeva_x

<span><i>Made at <a href='https://qwasar.io'>Qwasar SV -- Software Engineering School</a></i></span>
<span><img alt='Qwasar SV -- Software Engineering School's Logo' src='https://storage.googleapis.com/qwasar-public/qwasar-logo_50x50.png' width='20px' /></span>
