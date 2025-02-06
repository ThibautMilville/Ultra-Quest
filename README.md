# Ultra-Quest

Ultra Quest is a web application built with React (frontend) and NestJS (backend).

## Project Structure

The project is organized into two main directories:
- `frontend/`: React application
- `backend/`: NestJS application

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run start:dev
```

The backend server will run on `http://localhost:4000`.

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend application will run on `http://localhost:3000`.

## Available Scripts

### Backend

- `npm run start:dev`: Start the backend in development mode
- `npm run build`: Build the backend application
- `npm run start`: Start the backend in production mode
- `npm run test`: Run backend tests
- `npm run lint`: Run ESLint

### Frontend

- `npm start`: Start the frontend development server
- `npm run build`: Build the frontend for production
- `npm test`: Run frontend tests
- `npm run eject`: Eject from Create React App

## API Documentation

The backend API is configured with CORS enabled for `http://localhost:3000` and supports the following HTTP methods:
- GET
- POST
- PUT
- DELETE
- PATCH

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary to Ultra Times.