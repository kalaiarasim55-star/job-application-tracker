# Smart Job Application Tracker

A Full Stack Job Application Tracking System built 
with Spring Boot REST API backend and React JS frontend.
Helps job seekers track their applications, update 
status, and view dashboard statistics.

## Tech Stack
- *Backend:* Java 21, Spring Boot 3.5.15, MySQL
- *Security:* Spring Security, JWT Authentication
- *Database:* MySQL, Spring Data JPA, Hibernate
- *Frontend:* React JS, Axios, React Router DOM
- *Tools:* Maven, Postman, Git

## Features
- User Registration and Login with JWT
- Add and manage job applications
- Track status: Applied, Shortlisted, 
  Interview, Offered, Rejected
- Dashboard with application statistics
- Update and delete applications
- Secure REST APIs with JWT token
- BCrypt password encryption

## Project Structure
job-application-tracker/
├── backend/          Spring Boot REST API
└── frontend/         React JS Frontend
## How to Run

### Backend
- Create MySQL database: jobtracker
- Update application.properties password
- Run JobtrackerApplication.java
- Runs on localhost:8080
### Frontend
- cd frontend
- npm install
- npm start
- Runs on localhost:3000
## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register |
| POST | /api/auth/login | Login |
| POST | /api/jobs/add | Add job |
| GET | /api/jobs/all | Get all jobs |
| PUT | /api/jobs/update/{id} | Update status |
| DELETE | /api/jobs/delete/{id} | Delete job |
| GET | /api/jobs/dashboard | Statistics |

## Author
- Kalaiarasi M
- kalaiarasim55@gmail.com
- linkedin.com/in/kalaiarasi-m-14089725
