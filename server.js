/**
 * GradeVision AI - Express & MongoDB Backend API Server
 * ---------------------------------------------------
 * Provides MongoDB authentication, classroom management,
 * and AI answer key generation endpoints.
 */
console.log("THIS IS THE NEW SERVER FILE");
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gradevision';

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname)));

// MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Database successfully!');
  })
  .catch((err) => {
    console.log('⚠️ MongoDB Connection Warning:', err.message);
  });

// =======================
// MongoDB Schemas
// =======================

const UserSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['teacher', 'student'],
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    dept: {
      type: String,
      required: true
    },
    subject: String,
    regNo: String
  },
  {
    timestamps: true
  }
);

const ClassroomSchema = new mongoose.Schema(
  {
    teacherEmail: {
      type: String,
      required: true
    },
    teacherName: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    dept: {
      type: String,
      required: true
    },
    className: {
      type: String,
      required: true
    },
    section: {
      type: String,
      default: 'Sec A'
    },
    students: [
      {
        name: String,
        regNo: String,
        scriptUrl: String,
        score: Number,
        total: Number
      }
    ],
    questionPaperUrl: String,
    answerKeyUrl: String,
    aiAnswerKeyGenerated: String
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', UserSchema);
const Classroom = mongoose.model('Classroom', ClassroomSchema);

// =======================
// Authentication
// =======================

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { role, name, email, password, dept, subject, regNo } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        error: 'Email already registered'
      });
    }

    const user = new User({
      role,
      name,
      email,
      password,
      dept,
      subject,
      regNo
    });

    await user.save();

    res.json({
      message: 'User registered successfully',
      user
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({
      email,
      role
    });

    if (!user || user.password !== password) {
      return res.status(401).json({
        error: 'Invalid email or password'
      });
    }

    res.json({
      message: 'Login successful',
      user
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// =======================
// Classroom
// =======================

// Create Classroom
app.post('/api/classrooms/create', async (req, res) => {
  try {
    const classroom = new Classroom(req.body);

    await classroom.save();

    res.json({
      message: 'Classroom created successfully',
      classroom
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// Get Teacher Classrooms
app.get('/api/classrooms/teacher/:email', async (req, res) => {
  try {
    const classrooms = await Classroom.find({
      teacherEmail: req.params.email
    });

    res.json(classrooms);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// =======================
// AI Answer Key Generator
// =======================

app.post('/api/ai/generate-answer-key', (req, res) => {

  const generatedKey =
`[AI GENERATED MODEL ANSWER KEY & RUBRIC]

--------------------------------------------------

Subject Evaluation Standard

Q1: Definition & Core Principles (5 Marks)

Q2: Time & Space Complexity (5 Marks)

Q3: Algorithm Explanation (10 Marks)

Q4: Diagram + Conclusion (10 Marks)
`;

  res.json({
    generatedKey
  });

});

// =======================
// Frontend
// =======================

// Home Page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle Unknown Routes (Works in Express 5)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// =======================
// Start Server
// =======================

app.listen(PORT, () => {
  console.log(`🚀 GradeVision AI Backend running at http://localhost:${PORT}`);
});