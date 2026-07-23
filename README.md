# 🎓 GradeVision AI
> **Automated Multimodal AI-Powered Answer Sheet Evaluation & Grading Platform**  
> *Built for modern academic institutions, faculty evaluation, and instant student diagnostic feedback.*
---
## 📌 Executive Summary
**GradeVision AI** is a full-stack, AI-assisted handwritten exam evaluation system built to revolutionize how educational institutions grade physical answer scripts. 
By combining **Multimodal Computer Vision**, **Handwriting OCR (Optical Character Recognition)**, and **Semantic Rubric Matching**, GradeVision AI digitizes physical paper scans, highlights exact handwritten answer regions using color-coded SVG bounding boxes, and calculates step-wise marks against standardized model answer keys.
---
## ✨ Key Features & Highlights
### 1. 🔍 Dual-Pane Interactive Answer Evaluator
* **SVG Bounding Box Canvas:** Renders spatial bounding coordinates (`[X, Y, Width, Height]`) directly over scanned answer sheets.
* **Color-Coded Status Tokens:**
  * 🟢 **Green (`FULL_CREDIT`):** Perfect answer match against model key criteria.
  * 🟡 **Yellow (`PARTIAL_CREDIT`):** Concept correct, missing minor step or formula detail.
  * 🔴 **Red (`ERROR`):** Incorrect logic, omitted definition, or missing step.
* **Bi-Directional Event Synchronization:** Clicking an SVG bounding box on the paper image auto-scrolls the DOM to highlight its rubric card on the right panel (and vice versa).
### 2. ✏️ Human-in-the-Loop (HITL) Faculty Override
* **Live Score Adjustment:** Faculty can click **"Re-Evaluate"** on any question to adjust marks, append custom teacher notes, and trigger real-time total score recalculation without reloading the page.
### 3. 📊 Consolidated Faculty Grade Matrix & Class Register
* **Institutional Tabular Register:** Maps USN/Register Numbers, Question-wise marks ($Q1 \dots Q6$), total percentages, and letter grades ($A+, A, B$, etc.).
* **Real-time Filter & Search:** Sub-millisecond text search algorithm filtering students by name or USN.
* **1-Click CSV Data Export:** Serializes grade tables into downloadable `.csv` register files.
### 4. 📷 Direct Optical Web Camera Scanner
* Integrated browser camera scanner via HTML5 `getUserMedia` API for instant paper scanning directly from laptop webcams.
### 5. 📑 Student Transcript & PDF Print Engine
* **Digitized OCR Text Transcript:** Allows students to view, copy, or download extracted text as a `.txt` file.
* **Print-Ready PDF Receipts:** Custom `@media print` CSS engine for generating paper/PDF evaluation reports.
* ---
## 🛠️ Technology Stack & Architecture
| Layer | Technology | Purpose |
| --- | --- | --- |
| **Frontend UI** | HTML5, Vanilla JavaScript (ES6+) | Single Page Application (SPA) with custom glassmorphism design system & SVG canvas rendering |
| **Backend REST API** | Node.js, Express.js (`server.js`) | Express HTTP REST server handling authentication, user sessions, and static asset delivery |
| **Database Engine** | SQLite3 (`gradevision.db`) | Local relational database for persistent user storage with `email` UNIQUE constraints |
| **Fallback Storage** | `localStorage` / IndexedDB Sync | Client-side sync engine ensuring zero-downtime offline demonstrations |
| **AI / Machine Learning** | Python 3.x (`ai_evaluator_model.py`) | Multimodal Vision AI pipeline for handwriting OCR, bounding box calculation, and semantic scoring |
---
## 🏗️ System Architecture & Execution Flow
```
[ Physical Answer Sheet / Camera Frame ]
                   │
                   ▼
[ Handwriting OCR & Layout Detection Engine ]
                   │
                   ▼
[ Spatial Bounding Box Coordinate Calculation ]
                   │
                   ▼
[ Semantic Rubric Matcher & Keyword Extractor ]
                   │
                   ▼
[ Dual-Pane Interactive UI (SVG Canvas + Live Feedback) ]
                   │
                   ▼
[ Faculty Override & Matrix Analytics Sync (SQLite / LocalStorage) ]
```
---
## 📂 Project Directory Structure
```
gradevision-ai/
├── index.html                # Main Login & Authentication Page
├── dashboard.html            # Faculty Master Evaluation Dashboard
├── student_dashboard.html    # Student Portal & Digitized Transcript View
├── styles.css                # Global Glassmorphism CSS Design Tokens & Layout Rules
├── server.js                 # Node.js + Express + SQLite Database Backend Server
├── ai_evaluator_model.py     # Python Multimodal Vision AI Evaluation Pipeline Script
├── gradevision.db            # Local Relational SQLite Database File
├── package.json              # Node.js Dependency Manifest
└── js/
    ├── app.js                # Frontend Login Controller & REST API Fetch Engine
    ├── annotator.js          # SVG Bounding Box Canvas Renderer & Bi-directional Sync
    ├── dashboard_faculty.js  # Faculty Matrix Table, Search Filter & CSV Exporter
    ├── ocr_engine.js         # Camera Scanner & Optical Digitizing Script
    └── sample_data.js        # Seed Data & Demo Student Evaluation Payloads
```
---
## 🚀 Quick Start & Installation Guide
### Prerequisites
* **Node.js** (v14.0 or higher)
* **npm** (v6.0 or higher)
* **Python** (v3.8 or higher, optional for AI script runner)
### Step 1: Clone or Navigate to Directory
```bash
cd scratch/gradevision-ai
```
### Step 2: Install Node.js Dependencies
```bash
npm install
```
### Step 3: Start Backend Express + SQLite Database Server
```bash
node server.js
```
> Server will start at: `http://localhost:5000`
### Step 4: Open Application in Browser
Open `http://localhost:5000` or launch [index.html](file:///C:/Users/SASI/.gemini/antigravity/scratch/gradevision-ai/index.html) directly in your browser.
---
## 🔑 Default Seed Demo Credentials
| Role | Email ID | Default Password | Notes |
| --- | --- | --- | --- |
| **Faculty / Teacher** | `prof.anitha@siet.edu` | `password123` | Data Structures & Algorithms Portal |
  ```
### 2. User Sign In
`POST /api/sqlite/login`
* **Request Body:**
  ```json
  {
    "email": "prof.anitha@siet.edu",
    "password": "password123",
    "role": "teacher"
  }
  ```
* **Response (200 OK):**
  ```json
  {
    "message": "SQLite Authentication Verified",
    "user": { "id": 1, "name": "Prof. Anitha M", "role": "teacher", "dept": "CSE Dept" }
  }
  ```
---
## 📄 License
This project is open-source under the **MIT License**. Built for the Hackathon.
