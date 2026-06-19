# Quiz Builder Backend

A scalable, modular backend API for building and managing quizzes, questions, and answers. Built with NestJS, Sequelize, and PostgreSQL.

## Architectural Highlights

This project was intentionally designed with a Domain-Driven Modular Architecture. Rather than putting all logic into a single monolith structure, the application is divided into self-contained feature modules:

- `QuizzesModule`: Manages the core quiz entities and aggregates.
- `QuestionsModule`: Handles the specific logic, validation, and typing (Single Choice, Multiple Choice, Text Input) for questions.
- `AnswersModule`: Manages the atomic answer entities and correctness validation.

Why this matters: This approach makes the codebase highly predictable and incredibly comfortable to expand. If we need to add a `UsersModule` for authentication or an `AttemptsModule` for tracking user scores in the future, they can be plugged into the existing ecosystem with minimal friction or risk of circular dependencies.

---

## Installation & Setup

Clone the repository:

```bash
git clone https://github.com/KurenkovMaxgit/quiz-builder-backend.git
```

Navigate to the project directory:

```bash
cd quiz-builder-backend
```

Install dependencies:

```bash
npm install
```

Configure your environment variables:

```bash
cp .env.example .env
# Open .env and update your POSTGRES database credentials
```

Start the development server (runs with hot-reload):

```bash
npm run start:dev
```

## API Documentation

Once the server is running, the Swagger API documentation is available at:
http://localhost:8060/api (Update the port)

## Database Management

In development mode, this project utilizes Sequelize's synchronize: true to automatically generate and alter database schemas based on the TypeScript models.

_(Note: For production environments, a formal migration strategy using the Sequelize CLI should be implemented to ensure data safety)._

## Future Improvements (Roadmap)

Due to strict time constraints during the task completing, a few core features were intentionally deferred. These are the top priorities for the next steps:

### Core Features & Architecture

* Automated Evaluation & Analytics: Expanding the backend to process user submissions, calculate scores based on question types, and store attempt history for analytics and reporting.

* Pagination & Filtering: The current GET /quizzes endpoint returns all records. Implementing pagination is crucial for performance as the database grows.

* Production Migrations: Transitioning away from auto-sync to trackable Sequelize migration files to ensure zero-downtime database updates.

### Security & Privacy

* Authentication & Authorization: Securing endpoints using JWTs so only authorized creators can build or mutate quizzes, while allowing standard users to submit attempts.

* API Hardening: Implementing rate limiting, secure HTTP headers, and strict CORS policies to protect against malicious traffic.

* Data Privacy Compliance: Ensuring any collected user data or quiz attempt history adheres to GDPR/CCPA standards, including data anonymization strategies.

### Testing & Infrastructure

* Automated Testing: Unit Tests: Need to be written for the service layer to lock down the complex question validation logic.

    * E2E Tests: Need to be established to ensure the cascading database saves (Quiz -> Questions -> Answers) remain completely stable.

* CI/CD Pipeline: Setting up GitHub Actions to automatically run linting and tests on every pull request, ensuring broken code never merges.

* Containerization & Deployment: Fully Dockerizing the application for predictable staging environments and seamless deployment to cloud providers.
