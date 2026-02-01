# api-litacka

A simple API built over [Lítačka API](https://litackaapi.docs.apiary.io/#)

## Prerequisites

- **Node.js** (version 18.x or higher)
- **npm**

## Installation

1. **Clone the repository**
   
   ```bash
   git clone https://github.com/lstejskal/api-litacka.git
   cd api-litacka
   ```
   
2. **Install dependencies**
   ```bash
   npm install
   ```

## Setup

The application uses environment-specific configuration files. You need to set up your environment variables before running the app.

1. **Copy the example environment file**

   For development:
   ```bash
   cp .env.example .env.dev
   ```

   For testing:
   ```bash
   cp .env.example .env.test
   ```

2. **Configure environment variables**

   Edit the `.env.dev` (or `.env.test`) file with your settings:

   ```env
   PORT=3000
   API_KEY=your_api_key_here
   LITACKA_API_URL=http://private-264465-litackaapi.apiary-mock.com
   ```

   **Environment variables:**
   
   - `PORT` - The port on which the server runs (default: 3000)
   - `API_KEY` - API key for authentication (send it in `X-API-Key` header)
   - `LITACKA_API_URL` - The base URL for the Litacka API

## Running the Application

### Development Mode

To run the application in development mode with hot-reloading:

```bash
npm run dev
```

This will:
- Use the `.env.dev` configuration file
- Start the server with Node.js watch mode (auto-restarts on file changes)
- Run on the port specified in your `.env.dev` file (default: 3000)

### Standard Mode

To run the application in standard mode without hot-reloading:

```bash
npm start
```

This will use the `.env.dev` configuration file by default. For specific environment:

```bash
NODE_ENV=prod npm start
```

### Verify the Server is Running

You can test the API by opening your browser or using curl:
```bash
curl http://localhost:3000/up
```

## Documentation

For complete API documentation, see [api.yaml](api.yaml)

Convert to HTML:
```bash
npm install -g @redocly/cli
redocly build-docs api.yaml --output api.html
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/lstejskal/api-litacka/issues

