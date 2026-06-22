# 🖥️ RecipeApp — Backend

The REST API server for RecipeApp, built with **Node.js**, **Express**, and **MongoDB (Mongoose)**. It serves recipes, categories, and favorites to the [RecipeApp mobile app](../frontend/README.md), and handles recipe image uploads to **AWS S3**.

## Features

- 📖 CRUD-style endpoints for **Recipes**, **Categories**, and **Favorites**
- 🖼️ Image upload endpoint (`/Recipe/UploadImage`) using **Multer** + **AWS S3**
- 🗄️ MongoDB persistence via **Mongoose** schemas
- 🌐 CORS-enabled JSON API
- ☁️ CI/CD pipeline to **Azure Web Apps** via GitHub Actions

## Tech Stack

- **Node.js** (ES Modules) + **Express**
- **MongoDB** + **Mongoose**
- **AWS SDK** (S3) for image storage
- **Multer** for handling multipart file uploads
- **dotenv** for environment configuration
- **Nodemon** for local development

## Project Structure

```
backend/
├── server.js                       # App entry point, DB connection, route mounting
├── routes/
│   ├── Recipe.js                    # /Recipe routes
│   ├── Favourites.js                # /Favourites routes
│   └── Category.js                  # /Category routes
├── Functions/
│   ├── Recipe/Functions.js           # Recipe business logic
│   ├── Favorite/Functions.js         # Favorites business logic
│   └── Category/Functions.js         # Category business logic
├── model/
│   ├── Recipe_Schema.js              # Recipe Mongoose schema
│   ├── Fav_Schema.js                 # Favorites Mongoose schema
│   └── Category_Schema.js            # Category Mongoose schema
├── AWS/
│   └── Setup.js                      # S3 client configuration
└── .github/workflows/                # Azure deployment workflow
```

## Prerequisites

- Node.js v18 or later
- npm
- A MongoDB connection string (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas))
- An AWS account with an S3 bucket and IAM credentials

## Installation

1. Clone the repository and move into the backend folder:
   ```bash
   git clone https://github.com/ebaadraheem/RecipeApp.git
   cd RecipeApp/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

Create a `.env` file in the `backend/` root directory:

```env
# Server
PORT=3000

# MongoDB Connection String
Mongoose_Connection_String=mongodb://localhost:27017/recipeapp

# AWS Configuration
AWS_BUCKET_NAME=your-aws-bucket-name
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_REGION=your-aws-region
```

### Environment Variables Explained

| Variable | Description |
|---|---|
| `PORT` | Port the Express server listens on (defaults to `3000` if unset; Azure injects its own at deploy time) |
| `Mongoose_Connection_String` | Full MongoDB connection URI, including database name |
| `AWS_BUCKET_NAME` | Name of the S3 bucket used to store recipe images |
| `AWS_ACCESS_KEY_ID` | IAM access key ID with S3 permissions |
| `AWS_SECRET_ACCESS_KEY` | IAM secret access key |
| `AWS_REGION` | AWS region of your S3 bucket (e.g. `us-east-1`) |

> ⚠️ Never commit your `.env` file. Add it to `.gitignore` if it isn't already.

## Running the Server

**Development** (auto-restarts on file changes via Nodemon):
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server starts on `http://localhost:3000` (or your configured `PORT`) and logs a confirmation once connected to MongoDB.

## API Endpoints

### Recipes — `/Recipe`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/Recipe/All` | Get all recipes |
| POST | `/Recipe/Add` | Add a new recipe |
| POST | `/Recipe/Delete` | Delete a recipe by `recipe_id` |
| POST | `/Recipe/User_Recipes` | Get recipes posted by a specific user (`id`) |
| POST | `/Recipe/UploadImage` | Upload a recipe image (multipart/form-data, field name: `file`) — stored in S3 |

### Favourites — `/Favourites`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/Favourites/All` | Get a user's favorite recipes (`user_id`) |
| POST | `/Favourites/Add` | Add a recipe to favorites (`user_id`, `recipe_id`) |
| POST | `/Favourites/Remove` | Remove a recipe from favorites (`user_id`, `recipe_id`) |

### Categories — `/Category`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/Category/All` | Get all categories |
| POST | `/Category/Add` | Add a new category |
| POST | `/Category/Remove` | Remove a category |

All responses follow the shape:
```json
{ "status": 200, "data": "..." }
```
or, on failure:
```json
{ "status": 404, "message": "Failed to fetch recipes" }
```

## Data Models

**Recipe**
```js
{ user_id, recipe_id, title, recipe, ingredients: [], category, type, image_url, posted_by }
```

**Favourites**
```js
{ user_id, recipe_ids: [String] }
```

**Category**
```js
{ category_id, category, image_url }
```

## Deployment

This repo includes a GitHub Actions workflow (`.github/workflows/main_recipeapp-server.yml`) that automatically builds and deploys to an **Azure Web App** on every push to `main`. To use it for your own deployment, configure these repository secrets in GitHub:

- `AZUREAPPSERVICE_CLIENTID_*`
- `AZUREAPPSERVICE_TENANTID_*`
- `AZUREAPPSERVICE_SUBSCRIPTIONID_*`

And set the matching environment variables (`Mongoose_Connection_String`, AWS credentials, etc.) in your Azure Web App's **Configuration → Application settings**.
