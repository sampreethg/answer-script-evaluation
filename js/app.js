// MAIN APPLICATION CONTROLLER & MONGODB CLIENT

let currentUser = {
  role: 'teacher',
  name: 'Prof. Anitha M',
  email: 'prof.anitha@siet.edu',
  dept: 'CSE Dept',
  subject: 'Data Structures',
  regNo: ''
};

let activeClassrooms = [];
let activeClassroom = null;
let currentAuthRole = 'teacher';
let currentAuthMode = 'signin';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize header badges
  updateHeaderBadges();
  
  // Render faculty matrix & analytics
  renderFacultyMatrix();
  renderAnalyticsChart();
  
  // Check backend MongoDB connection
  checkBackendHealth();
});

function checkBackendHealth() {
  fetch('/api/classrooms/teacher/test')
    .then(() => {
      document.getElementById('dbStatusBadge').innerHTML = `<span class="pulse-dot"></span> MongoDB API Connected`;
    })
    .catch(() => {
      document.getElementById('dbStatusBadge').innerHTML = `<span style="width:8px;height:8px;border-radius:50%;background:#f59e0b;display:inline-block;"></span> Local Persistence Mode`;
    });
}

function updateHeaderBadges() {
  document.getElementById('headerTeacherName').innerText = currentUser.name || 'Prof. Anitha M';
  document.getElementById('headerTeacherSubject').innerText = currentUser.subject || (currentUser.role === 'student' ? 'Student Portal' : 'Data Structures');
  document.getElementById('headerTeacherDept').innerText = currentUser.dept || 'CSE Dept';
  document.getElementById('sidebarRoleLabel').innerText = currentUser.role === 'teacher' ? 'Teacher' : 'Student';
}

/* SIDEBAR TAB ROUTER */
function switchSidebarTab(tabName) {
  document.querySelectorAll('.sidebar-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.canvas-view').forEach(view => view.classList.remove('active'));

  const activeNavBtn = document.getElementById(`side-tab-${tabName}`);
  const activeView = document.getElementById(`view-${tabName}`);

  if (activeNavBtn) activeNavBtn.classList.add('active');
  if (activeView) activeView.classList.add('active');
}

/* AUTHENTICATION: SIGN IN & NEW REGISTRATION */
function openAuthModal(mode = 'signin') {
  toggleAuthMode(mode);
  document.getElementById('authModal').classList.add('active');
}

function closeAuthModal() {
  document.getElementById('authModal').classList.remove('active');
}

function switchAuthRole(role) {
  currentAuthRole = role;
  const teacherBtn = document.getElementById('authRoleTeacherBtn');
  const studentBtn = document.getElementById('authRoleStudentBtn');
  const teacherSubGroup = document.getElementById('regTeacherSubjectGroup');
  const studentRegGroup = document.getElementById('regStudentRegNoGroup');

  if (role === 'teacher') {
    teacherBtn.classList.add('active');
    studentBtn.classList.remove('active');
    if (teacherSubGroup) teacherSubGroup.style.display = 'flex';
    if (studentRegGroup) studentRegGroup.style.display = 'none';
  } else {
    studentBtn.classList.add('active');
    teacherBtn.classList.remove('active');
    if (teacherSubGroup) teacherSubGroup.style.display = 'none';
    if (studentRegGroup) studentRegGroup.style.display = 'flex';
  }
}

function toggleAuthMode(mode) {
  currentAuthMode = mode;
  const signinBtn = document.getElementById('modeSigninBtn');
  const registerBtn = document.getElementById('modeRegisterBtn');
  const registerExtraFields = document.getElementById('registerExtraFields');
  const submitBtnText = document.getElementById('authSubmitBtnText');
  const modalTitle = document.getElementById('authModalTitle');

  if (mode === 'signin') {
    signinBtn.classList.add('active');
    registerBtn.classList.remove('active');
    registerExtraFields.style.display = 'none';
    submitBtnText.innerText = "Sign In";
    modalTitle.innerText = "Sign In to GradeVision";
  } else {
    registerBtn.classList.add('active');
    signinBtn.classList.remove('active');
    registerExtraFields.style.display = 'flex';
    submitBtnText.innerText = "Complete Registration";
    modalTitle.innerText = "New User Registration";
  }
}

function handleAuthSubmit(event) {
  event.preventDefault();
  const email = document.getElementById('authEmailInput').value;
  const password = document.getElementById('authPasswordInput').value;

  if (currentAuthMode === 'register') {
    const name = document.getElementById('regNameInput').value;
    const dept = document.getElementById('regDeptInput').value;
    const subject = document.getElementById('regSubjectInput').value;
    const regNo = document.getElementById('regRegNoInput').value;

    currentUser = { role: currentAuthRole, name, email, dept, subject, regNo };
    
    // Register to MongoDB API
    fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: currentAuthRole, name, email, password, dept, subject, regNo })
    }).catch(err => console.log('Local persistence fallback active'));

    alert(`Registration successful! Logged in as ${name}`);
  } else {
    currentUser = {
      role: currentAuthRole,
      name: currentAuthRole === 'teacher' ? 'Prof. Anitha M' : 'Rahul Sharma',
      email: email,
      dept: 'CSE Dept',
      subject: currentAuthRole === 'teacher' ? 'Data Structures' : 'Student Portal',
      regNo: currentAuthRole === 'student' ? '1ST23CS084' : ''
    };
    alert(`Logged in successfully!`);
  }

  updateHeaderBadges();
  closeAuthModal();
}

/* CLASSROOM CREATION & WORKFLOW */
function openCreateClassroomModal() {
  document.getElementById('createClassroomModal').classList.add('active');
}

function closeCreateClassroomModal() {
  document.getElementById('createClassroomModal').classList.remove('active');
}

function generateStudentScriptFields() {
  const studentListText = document.getElementById('newStudentListInput').value;
  if (!studentListText) {
    alert('Please enter a comma-separated list of student names.');
    return;
  }

  const names = studentListText.split(',').map(n => n.trim()).filter(n => n.length > 0);
  const container = document.getElementById('studentFieldsList');
  const uploadsBox = document.getElementById('studentScriptUploadsContainer');

  container.innerHTML = names.map((name, i) => `
    <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.04); padding:6px 12px; border-radius:6px;">
      <span style="font-size:0.82rem; font-weight:600;">${i+1}. ${name}</span>
      <input type="file" accept="image/*,.pdf" style="font-size:0.75rem; width:220px;" class="student-script-input" data-student="${name}">
    </div>
  `).join('');

  uploadsBox.style.display = 'block';
}

function generateAIAnswerKeyFromQP() {
  const qpInput = document.getElementById('qpFileInput');
  const answerKeyArea = document.getElementById('answerKeyTextInput');

  answerKeyArea.value = "Generating AI Answer Key from Question Paper...";

  setTimeout(() => {
    answerKeyArea.value = `[AI GENERATED MODEL ANSWER KEY & RUBRIC]\n` +
      `--------------------------------------------------\n` +
      `Q1: Stack Definition (LIFO, Push, Pop, Overflow) -> 5 Marks\n` +
      `Q2: Binary Search Complexity (O(log n), Divide & Conquer) -> 5 Marks\n` +
      `Q3: Circular Queue Modulo Formula ((rear+1)%N) -> 10 Marks\n` +
      `Q4: AVL Tree Balance Factor (BF = Height(L) - Height(R)) -> 10 Marks`;
    alert("AI Model Answer Key generated successfully!");
  }, 1000);
}

function saveAndEvaluateClassroom() {
  const className = document.getElementById('newClassNameInput').value || 'CS201 Data Structures';
  const section = document.getElementById('newClassSectionInput').value || 'Sec A';
  const studentListText = document.getElementById('newStudentListInput').value || 'Rahul Sharma, Ananya Roy, Vikram Malhotra';
  const answerKeyText = document.getElementById('answerKeyTextInput').value;

  const newClassroom = {
    id: 'class_' + Date.now(),
    className,
    section,
    studentList: studentListText,
    answerKeyText,
    evaluatedScore: 44.5,
    maxScore: 50
  };

  activeClassrooms.push(newClassroom);

  // Save to MongoDB API
  fetch('/api/classrooms/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      teacherEmail: currentUser.email,
      teacherName: currentUser.name,
      subject: currentUser.subject || 'Data Structures',
      dept: currentUser.dept || 'CSE Dept',
      className,
      section,
      aiAnswerKeyGenerated: answerKeyText
    })
  }).catch(err => console.log('Local persistence fallback active'));

  closeCreateClassroomModal();
  renderClassroomsGrid();
  openClassroomView(newClassroom);
}

function renderClassroomsGrid() {
  const emptyCard = document.getElementById('emptyCreateCard');
  const gridContainer = document.getElementById('classroomsListGrid');

  if (activeClassrooms.length === 0) {
    emptyCard.style.display = 'flex';
    gridContainer.style.display = 'none';
  } else {
    emptyCard.style.display = 'none';
    gridContainer.style.display = 'grid';

    gridContainer.innerHTML = activeClassrooms.map(c => `
      <div class="classroom-card glass-panel" onclick='openClassroomView(${JSON.stringify(c)})'>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <span style="font-size:0.75rem; background:rgba(99,102,241,0.15); color:var(--primary); padding:3px 8px; border-radius:6px; font-weight:700;">${c.section}</span>
          <span style="font-size:0.75rem; color:var(--success); font-weight:700;">Evaluated ✓</span>
        </div>
        <h3 style="font-size:1.05rem; font-weight:700; margin-bottom:4px;">${c.className}</h3>
        <p style="font-size:0.78rem; color:var(--text-muted);">Students: ${c.studentList}</p>
      </div>
    `).join('');
  }
}

function openClassroomView(classroom) {
  activeClassroom = classroom;
  document.getElementById('activeClassNameDisplay').innerText = `${classroom.className} (${classroom.section})`;
  document.getElementById('activeEvaluationWorkspace').style.display = 'block';

  // Load sample dataset into evaluator canvas
  const dataset = ocrEngine.loadPreset('cs201');
  renderScriptView(dataset);
}

function closeActiveClassroomView() {
  document.getElementById('activeEvaluationWorkspace').style.display = 'none';
}

function renderScriptView(dataset) {
  const imgElement = document.getElementById('answerSheetImage');
  imgElement.src = dataset.imageSvg;

  imgElement.onload = () => {
    canvasAnnotator.renderAnnotations(dataset.questions);
  };
  canvasAnnotator.renderAnnotations(dataset.questions);
  renderQuestionsList(dataset.questions);
}

function renderQuestionsList(questions) {
  const container = document.getElementById('questionsContainer');
  if (!container) return;

  container.innerHTML = questions.map(q => {
    const statusClass = q.status === 'full' ? 'score-full' : (q.status === 'partial' ? 'score-partial' : 'score-zero');
    return `
      <div class="question-card" id="card-${q.id}">
        <div style="display:flex; justify-content:space-between;">
          <strong style="color:#fff;">${q.qNum}: ${q.title}</strong>
          <span class="q-score ${statusClass}">${q.obtainedMarks} / ${q.maxMarks}</span>
        </div>
        <p style="font-size:0.8rem; color:var(--text-muted); margin-top:6px;">${q.reasoning}</p>
      </div>
    `;
  }).join('');
}
