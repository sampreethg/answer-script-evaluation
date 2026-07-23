let activeRole = 'teacher';
let activeMode = 'signin';
let currentUser = null;

document.addEventListener('DOMContentLoaded', () => {
  switchAuthRole('teacher');
  setAuthMode('signin');
});

function switchAuthRole(role) {
  activeRole = role;
  const tBtn = document.getElementById('tabTeacherBtn');
  const sBtn = document.getElementById('tabStudentBtn');

  if (role === 'teacher') {
    tBtn.classList.add('active');
    sBtn.classList.remove('active');
  } else {
    sBtn.classList.add('active');
    tBtn.classList.remove('active');
  }
  updateFieldsVisibility();
}

function setAuthMode(mode) {
  activeMode = mode;
  const signinBtn = document.getElementById('btnSigninMode');
  const regBtn = document.getElementById('btnRegisterMode');
  const submitLabel = document.getElementById('submitBtnLabel');

  if (mode === 'signin') {
    signinBtn.classList.add('active');
    regBtn.classList.remove('active');
    submitLabel.innerText = "Sign In to Dashboard";
  } else {
    regBtn.classList.add('active');
    signinBtn.classList.remove('active');
    submitLabel.innerText = "Complete New Registration";
  }
  updateFieldsVisibility();
  lucide.createIcons();
}

function updateFieldsVisibility() {
  const tFields = document.getElementById('teacherRegisterFields');
  const sFields = document.getElementById('studentRegisterFields');
  const emailInput = document.getElementById('emailInput');

  if (activeMode === 'register') {
    if (activeRole === 'teacher') {
      tFields.style.display = 'flex';
      sFields.style.display = 'none';
      emailInput.value = "teacher.sqlite@siet.edu";
    } else {
      sFields.style.display = 'flex';
      tFields.style.display = 'none';
      emailInput.value = "student.sqlite@siet.edu";
    }
  } else {
    tFields.style.display = 'none';
    sFields.style.display = 'none';
    emailInput.value = activeRole === 'teacher' ? "prof.anitha@siet.edu" : "rahul.sharma@siet.edu";
  }
}

async function handleAuthSubmit(event) {
  event.preventDefault();
  const email = document.getElementById('emailInput').value.trim();
  const password = document.getElementById('passwordInput').value.trim();

  if (activeMode === 'register') {
    let payload = { role: activeRole, email, password };

    if (activeRole === 'teacher') {
      payload.name = document.getElementById('tNameInput').value.trim() || 'Prof. Anitha M';
      payload.dept = document.getElementById('tDeptInput').value.trim() || 'CSE Dept';
      payload.subject = document.getElementById('tSubjectInput').value.trim() || 'Data Structures';
    } else {
      payload.name = document.getElementById('sNameInput').value.trim() || 'Rahul Sharma';
      payload.regNo = document.getElementById('sRegNoInput').value.trim() || '1ST23CS084';
      payload.dept = document.getElementById('sDeptInput').value.trim() || 'CSE Dept';
      payload.subject = 'Student Portal';
    }

    try {
      const res = await fetch('/api/sqlite/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      currentUser = res.ok ? data.user : payload;
      openDashboardView();
    } catch (err) {
      currentUser = payload;
      openDashboardView();
    }

  } else {
    try {
      const res = await fetch('/api/sqlite/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: activeRole })
      });
      const data = await res.json();
      currentUser = res.ok ? data.user : { role: activeRole, name: 'Prof. Anitha M', dept: 'CSE Dept', subject: 'Data Structures', email };
      openDashboardView();
    } catch (err) {
      currentUser = { role: activeRole, name: 'Prof. Anitha M', dept: 'CSE Dept', subject: 'Data Structures', email };
      openDashboardView();
    }
  }
}

function quickDemoLogin(role) {
  switchAuthRole(role);
  setAuthMode('signin');
  if (role === 'teacher') {
    currentUser = { role: 'teacher', name: 'Prof. Anitha M', dept: 'CSE Dept', subject: 'Data Structures & Algorithms', email: 'prof.anitha@siet.edu' };
  } else {
    currentUser = { role: 'student', name: 'Rahul Sharma (Reg: 1ST23CS084)', dept: 'CSE Dept', subject: 'Student Portal', email: 'rahul.sharma@siet.edu' };
  }
  openDashboardView();
}

function openDashboardView() {
  document.getElementById('headerTeacherName').innerText = currentUser.name || 'Prof. Anitha M';
  document.getElementById('headerTeacherSubject').innerText = currentUser.subject || 'Data Structures';
  document.getElementById('headerTeacherDept').innerText = currentUser.dept || 'CSE Dept';
  document.getElementById('dashboardAppView').style.display = 'flex';
}

function logoutToLoginScreen() {
  document.getElementById('dashboardAppView').style.display = 'none';
}