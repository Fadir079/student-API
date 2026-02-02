# Student Management API

## Project Overview
A RESTful API for managing student records built with Node.js, Express.js, and MongoDB. This API provides complete CRUD operations for student data with proper error handling, validation, and security best practices.

## Group Members
1. Member 1
2. Member 2
3. Member 3
4. Member 4
5. Member 5

## Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Environment Management**: dotenv
- **CORS**: cors middleware
- **Development**: nodemon

## Project Features
- ✅ Full CRUD operations for students
- ✅ MongoDB Atlas integration
- ✅ Environment variable configuration
- ✅ Try-catch error handling on all endpoints
- ✅ Input validation
- ✅ Proper HTTP status codes
- ✅ CORS enabled
- ✅ Health check endpoint

## Student Schema
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  role: String (enum: ['student', 'admin'], default: 'student'),
  enrollmentNumber: String (required, unique),
  course: String (required),
  gpa: Number (0-4.0, default: 0),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## Environment Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account
- Render account (for deployment)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd API
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Update the MongoDB connection string
   ```bash
   cp .env.example .env
   ```

4. **Edit `.env` file with your credentials:**
   ```
   MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/student_db?retryWrites=true&w=majority
   PORT=5000
   NODE_ENV=development
   ```

5. **Run the application**
   - **Development mode** (with auto-reload):
     ```bash
     npm run dev
     ```
   - **Production mode**:
     ```bash
     npm start
     ```

6. **Verify the API is running**
   - Visit: `http://localhost:5000`
   - You should see a welcome message

## API Endpoints Documentation

### Base URL
- **Local**: `http://localhost:5000`
- **Deployed**: `https://your-render-app-url.onrender.com`

### Health Check
```
GET /api/health
```
**Response** (200 OK):
```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2024-02-02T10:30:00.000Z"
}
```

### 1. Create a New Student
```
POST /api/students
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "enrollmentNumber": "STU001",
  "course": "Computer Science",
  "gpa": 3.8,
  "role": "student"
}
```
**Response** (201 Created):
```json
{
  "success": true,
  "message": "Student created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "enrollmentNumber": "STU001",
    "course": "Computer Science",
    "gpa": 3.8,
    "role": "student",
    "createdAt": "2024-02-02T10:30:00.000Z",
    "updatedAt": "2024-02-02T10:30:00.000Z"
  }
}
```

### 2. Get All Students
```
GET /api/students
```
**Response** (200 OK):
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "enrollmentNumber": "STU001",
      "course": "Computer Science",
      "gpa": 3.8,
      "role": "student",
      "createdAt": "2024-02-02T10:30:00.000Z",
      "updatedAt": "2024-02-02T10:30:00.000Z"
    }
  ]
}
```

### 3. Get a Single Student by ID
```
GET /api/students/:id
```
**Example**: `GET /api/students/507f1f77bcf86cd799439011`

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "enrollmentNumber": "STU001",
    "course": "Computer Science",
    "gpa": 3.8,
    "role": "student",
    "createdAt": "2024-02-02T10:30:00.000Z",
    "updatedAt": "2024-02-02T10:30:00.000Z"
  }
}
```

### 4. Update a Student by ID
```
PUT /api/students/:id
Content-Type: application/json

{
  "name": "Jane Doe",
  "gpa": 3.9
}
```
**Example**: `PUT /api/students/507f1f77bcf86cd799439011`

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Student updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Jane Doe",
    "email": "john@example.com",
    "enrollmentNumber": "STU001",
    "course": "Computer Science",
    "gpa": 3.9,
    "role": "student",
    "createdAt": "2024-02-02T10:30:00.000Z",
    "updatedAt": "2024-02-02T10:35:00.000Z"
  }
}
```

### 5. Delete a Student by ID
```
DELETE /api/students/:id
```
**Example**: `DELETE /api/students/507f1f77bcf86cd799439011`

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Student deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Jane Doe",
    "email": "john@example.com",
    "enrollmentNumber": "STU001",
    "course": "Computer Science",
    "gpa": 3.9,
    "role": "student",
    "createdAt": "2024-02-02T10:30:00.000Z",
    "updatedAt": "2024-02-02T10:35:00.000Z"
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Please provide all required fields: name, email, enrollmentNumber, course"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Student not found"
}
```

### 409 Conflict
```json
{
  "success": false,
  "message": "Student with this email or enrollment number already exists"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Error creating student: {error message}"
}
```

## Project Structure
```
API/
├── config/
│   └── database.js          # MongoDB connection configuration
├── models/
│   └── Student.js           # Mongoose Student schema
├── controllers/
│   └── studentController.js # Business logic for CRUD operations
├── routes/
│   └── students.js          # API route definitions
├── server.js                # Main application entry point
├── package.json             # Project dependencies
├── .env.example             # Environment variable template
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## Deployment on Render.com

### Step 1: Prepare Repository
- Ensure all files are committed to GitHub
- `.env` file should NOT be pushed (use `.env.example` instead)

### Step 2: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up and log in
3. Click "New +"

### Step 3: Deploy Node.js Service
1. Select "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: student-api (or your preferred name)
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### Step 4: Add Environment Variables
1. In Render dashboard, go to Environment
2. Add the following variables:
   ```
   MONGODB_URI=your-mongodb-connection-string
   PORT=5000
   NODE_ENV=production
   ```

### Step 5: Deploy
1. Click "Create Web Service"
2. Wait for deployment (2-3 minutes)
3. Once live, you'll get a public URL

### Step 6: Test Deployed API
- Visit: `https://your-render-app-url.onrender.com/api/health`
- Test endpoints with the same documentation above

## Testing the API

### Using cURL
```bash
# Create student
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","enrollmentNumber":"STU001","course":"CS"}'

# Get all students
curl http://localhost:5000/api/students

# Get single student
curl http://localhost:5000/api/students/507f1f77bcf86cd799439011

# Update student
curl -X PUT http://localhost:5000/api/students/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","gpa":3.9}'

# Delete student
curl -X DELETE http://localhost:5000/api/students/507f1f77bcf86cd799439011
```

### Using Postman
1. Import the API endpoints into Postman
2. Set base URL to your server
3. Test each endpoint with provided examples

## GitHub Collaboration Workflow

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd API
   ```

2. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make changes and commit**
   ```bash
   git add .
   git commit -m "Add: Description of changes"
   ```

4. **Push to GitHub**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request** on GitHub for code review

## Important Notes

- **Security**: Never commit `.env` file. Always use `.env.example` as template
- **Database**: Use MongoDB Atlas for database hosting
- **Deployment**: Use Render.com for production deployment
- **Error Handling**: All endpoints include try-catch blocks
- **Validation**: Input validation is implemented for all fields
- **Status Codes**: Proper HTTP status codes used (201, 200, 400, 404, 409, 500)

## Troubleshooting

### MongoDB Connection Error
- Check MONGODB_URI in `.env`
- Ensure IP is whitelisted in MongoDB Atlas
- Verify network connectivity

### Port Already in Use
```bash
# Change PORT in .env to different port (e.g., 5001)
```

### Dependencies Not Installed
```bash
npm install
```

### Deployed API Not Working
- Check Render environment variables
- Check Render logs: `https://dashboard.render.com`
- Verify MongoDB connection is correct

## License
ISC

## Support
For issues or questions, please contact the group members or instructor.

---

**Deployment URL**: [Add your Render URL here]  
**GitHub Repository**: [Add your GitHub URL here]  
**Last Updated**: February 2, 2024
