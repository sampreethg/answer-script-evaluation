// FACULTY GRADE MATRIX & CLASS ANALYTICS CONTROLLER

const MOCK_STUDENTS_MATRIX = [
  { id: "1ST23CS084", name: "Rahul Sharma", q1: 5.0, q2: 5.0, q3: 8.5, q4: 7.0, q5: 9.5, q6: 9.5, secA: 10.0, secB: 34.5, total: 44.5, grade: "A+" },
  { id: "1ST23CS012", name: "Ananya Roy", q1: 5.0, q2: 4.5, q3: 9.0, q4: 8.0, q5: 10.0, q6: 9.0, secA: 9.5, secB: 36.0, total: 45.5, grade: "A+" },
  { id: "1ST23CS045", name: "Vikram Malhotra", q1: 4.0, q2: 4.0, q3: 6.5, q4: 4.0, q5: 7.5, q6: 8.0, secA: 8.0, secB: 26.0, total: 34.0, grade: "B+" },
  { id: "1ST23CS091", name: "Snehil Verma", q1: 5.0, q2: 5.0, q3: 10.0, q4: 9.0, q5: 9.5, q6: 10.0, secA: 10.0, secB: 38.5, total: 48.5, grade: "O (Outstanding)" },
  { id: "1ST23CS103", name: "Tanvi Kulkarni", q1: 3.5, q2: 4.0, q3: 7.0, q4: 5.0, q5: 6.0, q6: 7.5, secA: 7.5, secB: 25.5, total: 33.0, grade: "B+" },
  { id: "1ST23CS114", name: "Aditya Hegde", q1: 5.0, q2: 4.0, q3: 8.0, q4: 6.5, q5: 8.5, q6: 9.0, secA: 9.0, secB: 32.0, total: 41.0, grade: "A" }
];

function renderFacultyMatrix(students = MOCK_STUDENTS_MATRIX) {
  const tbody = document.getElementById('matrixTableBody');
  if (!tbody) return;

  tbody.innerHTML = students.map(s => `
    <tr>
      <td><code>${s.id}</code></td>
      <td><strong>${s.name}</strong></td>
      <td>${s.q1}</td>
      <td>${s.q2}</td>
      <td>${s.q3}</td>
      <td><span class="${s.q4 < 6 ? 'text-warning' : ''}">${s.q4}</span></td>
      <td>${s.q5}</td>
      <td>${s.q6}</td>
      <td>${s.secA}</td>
      <td>${s.secB}</td>
      <td class="total-score-cell">${s.total} / 50</td>
      <td><span class="grade-pill grade-a">${s.grade}</span></td>
      <td>
        <button class="btn btn-secondary" style="padding: 4px 10px; font-size: 0.75rem;" onclick="inspectStudentScript('${s.id}')">
          <i data-lucide="eye"></i> Inspect
        </button>
      </td>
    </tr>
  `).join('');

  lucide.createIcons();
}

function filterFacultyMatrix() {
  const query = document.getElementById('studentSearchInput').value.toLowerCase();
  const filtered = MOCK_STUDENTS_MATRIX.filter(s => 
    s.name.toLowerCase().includes(query) || s.id.toLowerCase().includes(query)
  );
  renderFacultyMatrix(filtered);
}

function exportFacultyMatrixCSV() {
  let csv = "Student ID,Student Name,Q1(5),Q2(5),Q3(10),Q4(10),Q5(10),Q6(10),Sec A Total,Sec B Total,Total Score(50),Grade\n";
  MOCK_STUDENTS_MATRIX.forEach(s => {
    csv += `"${s.id}","${s.name}",${s.q1},${s.q2},${s.q3},${s.q4},${s.q5},${s.q6},${s.secA},${s.secB},${s.total},"${s.grade}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `GradeVision_Faculty_Matrix_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function renderAnalyticsChart() {
  const container = document.getElementById('questionPerformanceChart');
  if (!container) return;

  const chartData = [
    { q: "Q1", avgPct: 94, label: "Q1 Stack (5)" },
    { q: "Q2", avgPct: 90, label: "Q2 BinSearch (5)" },
    { q: "Q3", avgPct: 81, label: "Q3 Queue (10)" },
    { q: "Q4", avgPct: 59, label: "Q4 AVL (10)" },
    { q: "Q5", avgPct: 87, label: "Q5 Dijkstra (10)" },
    { q: "Q6", avgPct: 89, label: "Q6 Postfix (10)" }
  ];

  container.innerHTML = chartData.map(d => `
    <div class="chart-bar-group">
      <div class="bar-fill" style="height: ${d.avgPct}%;">
        <span class="bar-val">${d.avgPct}%</span>
      </div>
      <span class="bar-label">${d.q}</span>
    </div>
  `).join('');
}
