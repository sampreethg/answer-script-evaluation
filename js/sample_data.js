// SAMPLE DATASETS FOR INSTANT JUDGING DEMO

// SVG Data URI Generator for realistic handwritten answer sheet mockups
function generateAnswerSheetSVG(title, subject, questionAnswers) {
  const svgLines = questionAnswers.map((qa, index) => {
    const yPos = 160 + (index * 130);
    return `
      <!-- Question ${qa.qNum} -->
      <text x="40" y="${yPos}" font-family="'Courier New', monospace" font-size="16" font-weight="bold" fill="#1e293b">Q${qa.qNum}) ${qa.title}</text>
      <text x="60" y="${yPos + 26}" font-family="'Brush Script MT', cursive, 'Comic Sans MS', sans-serif" font-size="20" fill="#0f172a">${qa.handwrittenSnippet1}</text>
      <text x="60" y="${yPos + 52}" font-family="'Brush Script MT', cursive, 'Comic Sans MS', sans-serif" font-size="20" fill="#0f172a">${qa.handwrittenSnippet2}</text>
      <line x1="40" y1="${yPos + 75}" x2="600" y2="${yPos + 75}" stroke="#cbd5e1" stroke-dasharray="4,4" />
    `;
  }).join('');

  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 900" width="650" height="900">
      <!-- Paper Background with lined sheet pattern -->
      <rect width="650" height="900" fill="#fcfbf7" rx="8" />
      
      <!-- Blue Margin Line -->
      <line x1="30" y1="0" x2="30" y2="900" stroke="#f87171" stroke-width="2" />
      
      <!-- Horizontal Lined Paper Rules -->
      ${Array.from({length: 32}).map((_, i) => `<line x1="0" y1="${80 + i*25}" x2="650" y2="${80 + i*25}" stroke="#e2e8f0" stroke-width="1" />`).join('')}

      <!-- Header Info -->
      <text x="40" y="45" font-family="'Courier New', monospace" font-size="18" font-weight="bold" fill="#1e293b">STUDENT EVALUATION SHEET</text>
      <text x="40" y="68" font-family="'Courier New', monospace" font-size="13" fill="#475569">Subject: ${subject} | ${title}</text>
      <line x1="30" y1="85" x2="650" y2="85" stroke="#94a3b8" stroke-width="1.5" />

      <!-- Handwritten Body Content -->
      ${svgLines}

      <!-- Teacher Stamp Placeholder -->
      <circle cx="560" cy="65" r="30" fill="none" stroke="#2563eb" stroke-width="2" stroke-dasharray="3 2" />
      <text x="542" y="70" font-family="sans-serif" font-size="10" font-weight="bold" fill="#2563eb">INTERNAL II</text>
    </svg>
  `;

  return "data:image/svg+xml;utf8," + encodeURIComponent(svgContent);
}

const SAMPLE_DATASETS = {
  cs201: {
    id: "cs201",
    studentName: "Rahul Sharma (USN: 1ST23CS084)",
    subject: "Data Structures & Algorithms (CS201)",
    totalScore: 44.5,
    maxScore: 50.0,
    grade: "Grade A+",
    imageSvg: generateAnswerSheetSVG(
      "Mid-Term II",
      "CS201 Data Structures",
      [
        { qNum: "1", title: "Define Stack Data Structure", handwrittenSnippet1: "A Stack is a LIFO linear data structure where elements", handwrittenSnippet2: "are inserted & deleted from top using push() & pop()." },
        { qNum: "2", title: "Time Complexity of Binary Search", handwrittenSnippet1: "Binary search divides search space by half each step.", handwrittenSnippet2: "Best case: O(1), Worst/Avg case complexity = O(log n)." },
        { qNum: "3", title: "Explain Queue Implementation using Array", handwrittenSnippet1: "Maintains front and rear pointers. Enqueue increments rear.", handwrittenSnippet2: "Dequeue increments front. Issue: Unused spaces behind front." },
        { qNum: "4", title: "AVL Tree Rotations & Balance Factor", handwrittenSnippet1: "Balance Factor BF = Height(Left Subtree) - Height(Right Subtree).", handwrittenSnippet2: "For LL imbalance we use Single Right Rotation." },
        { qNum: "5", title: "Dijkstra's Shortest Path Algorithm", handwrittenSnippet1: "Greedy algorithm to find shortest path from single source.", handwrittenSnippet2: "Uses min-priority queue with distance relaxation step." },
        { qNum: "6", title: "Infix to Postfix Conversion", handwrittenSnippet1: "Scans expression left to right using operator stack.", handwrittenSnippet2: "Expression: (A+B)*C becomes AB+C*." }
      ]
    ),
    questions: [
      {
        id: "q1",
        qNum: "Q1",
        section: "secA",
        title: "Define Stack & operations (Push, Pop)",
        maxMarks: 5,
        obtainedMarks: 5.0,
        status: "full",
        bbox: { x: 35, y: 140, w: 580, h: 90 },
        steps: [
          { desc: "LIFO Principle definition", pts: "2.0 / 2.0", matched: true },
          { desc: "Push() & Pop() operation mechanics", pts: "2.0 / 2.0", matched: true },
          { desc: "Stack overflow & underflow conditions", pts: "1.0 / 1.0", matched: true }
        ],
        reasoning: "Excellent answer. Correctly specified Last-In-First-Out rule and identified both boundary conditions.",
        keywords: [
          { word: "LIFO", matched: true },
          { word: "push()", matched: true },
          { word: "pop()", matched: true },
          { word: "Overflow", matched: true }
        ]
      },
      {
        id: "q2",
        qNum: "Q2",
        section: "secA",
        title: "Time Complexity of Binary Search",
        maxMarks: 5,
        obtainedMarks: 5.0,
        status: "full",
        bbox: { x: 35, y: 270, w: 580, h: 90 },
        steps: [
          { desc: "Divide and conquer explanation", pts: "2.0 / 2.0", matched: true },
          { desc: "Derivation of O(log n) recurrence", pts: "2.0 / 2.0", matched: true },
          { desc: "Best-case O(1) mention", pts: "1.0 / 1.0", matched: true }
        ],
        reasoning: "Full credit awarded. Clear step-by-step log base 2 reduction demonstrated.",
        keywords: [
          { word: "O(log n)", matched: true },
          { word: "Divide & Conquer", matched: true },
          { word: "Sorted Array", matched: true }
        ]
      },
      {
        id: "q3",
        qNum: "Q3",
        section: "secB",
        title: "Array Implementation of Circular Queue",
        maxMarks: 10,
        obtainedMarks: 8.5,
        status: "partial",
        bbox: { x: 35, y: 400, w: 580, h: 90 },
        steps: [
          { desc: "Front & Rear pointer mechanics", pts: "3.0 / 3.0", matched: true },
          { desc: "Modulo Arithmetic formula: (rear+1) % N", pts: "3.5 / 4.0", matched: true },
          { desc: "Full queue condition formula", pts: "2.0 / 3.0", matched: false }
        ],
        reasoning: "Minor deduction: Omitted explicit modulo formula for (front == (rear+1)%N) full queue check, though text logic is sound.",
        keywords: [
          { word: "Front & Rear", matched: true },
          { word: "(rear+1)%N", matched: true },
          { word: "Full Queue Condition", matched: false }
        ]
      },
      {
        id: "q4",
        qNum: "Q4",
        section: "secB",
        title: "AVL Tree Rotations & Balance Factor",
        maxMarks: 10,
        obtainedMarks: 7.0,
        status: "partial",
        bbox: { x: 35, y: 530, w: 580, h: 90 },
        steps: [
          { desc: "Balance Factor formula (-1, 0, +1)", pts: "3.0 / 3.0", matched: true },
          { desc: "Single Rotation (LL, RR) diagrams", pts: "3.0 / 4.0", matched: true },
          { desc: "Double Rotation (LR, RL) algorithm", pts: "1.0 / 3.0", matched: false }
        ],
        reasoning: "Deducted 3 marks: LR rotation diagram was incomplete and missing pivot node swap step.",
        keywords: [
          { word: "BF = Height(L) - Height(R)", matched: true },
          { word: "Single Rotation", matched: true },
          { word: "Double Rotation (LR)", matched: false }
        ]
      },
      {
        id: "q5",
        qNum: "Q5",
        section: "secB",
        title: "Dijkstra's Algorithm Derivation",
        maxMarks: 10,
        obtainedMarks: 9.5,
        status: "full",
        bbox: { x: 35, y: 660, w: 580, h: 90 },
        steps: [
          { desc: "Single-source greedy strategy", pts: "3.0 / 3.0", matched: true },
          { desc: "Distance relaxation formula d[u]+w(u,v) < d[v]", pts: "4.0 / 4.0", matched: true },
          { desc: "Priority Queue time complexity O((V+E) log V)", pts: "2.5 / 3.0", matched: true }
        ],
        reasoning: "Strong solution with accurate mathematical relaxation inequality.",
        keywords: [
          { word: "Greedy Choice", matched: true },
          { word: "Relaxation Step", matched: true },
          { word: "Min-Heap", matched: true }
        ]
      },
      {
        id: "q6",
        qNum: "Q6",
        section: "secB",
        title: "Infix to Postfix Stack Evaluation",
        maxMarks: 10,
        obtainedMarks: 9.5,
        status: "full",
        bbox: { x: 35, y: 790, w: 580, h: 90 },
        steps: [
          { desc: "Operator precedence rules", pts: "3.0 / 3.0", matched: true },
          { desc: "Expression step-by-step trace", pts: "4.0 / 4.0", matched: true },
          { desc: "Final postfix result string", pts: "2.5 / 3.0", matched: true }
        ],
        reasoning: "Accurate conversion table produced with correct operator precedence.",
        keywords: [
          { word: "Operator Precedence", matched: true },
          { word: "Postfix Output", matched: true }
        ]
      }
    ]
  },
  
  phy101: {
    id: "phy101",
    studentName: "Priya Nair (USN: 1ST23EC042)",
    subject: "Quantum Physics & Wave Mechanics (PHY101)",
    totalScore: 41.0,
    maxScore: 50.0,
    grade: "Grade A",
    imageSvg: generateAnswerSheetSVG(
      "Mid-Term II",
      "PHY101 Quantum Mechanics",
      [
        { qNum: "1", title: "Heisenberg Uncertainty Principle", handwrittenSnippet1: "States that position x and momentum p cannot be measured", handwrittenSnippet2: "simultaneously with absolute precision: dx * dp >= h / 4pi." },
        { qNum: "2", title: "De Broglie Wavelength Equation", handwrittenSnippet1: "Matter waves have wavelength lambda = h / p = h / (m*v).", handwrittenSnippet2: "Demonstrates wave-particle duality of matter." },
        { qNum: "3", title: "Time-Independent Schrodinger Wave Equation", handwrittenSnippet1: "H * psi = E * psi where H is Hamiltonian operator.", handwrittenSnippet2: "(-h^2 / 2m) d2psi/dx2 + V*psi = E*psi." }
      ]
    ),
    questions: [
      {
        id: "q1",
        qNum: "Q1",
        section: "secA",
        title: "Heisenberg Uncertainty Principle",
        maxMarks: 5,
        obtainedMarks: 5.0,
        status: "full",
        bbox: { x: 35, y: 140, w: 580, h: 90 },
        steps: [{ desc: "Uncertainty inequality formula", pts: "5.0 / 5.0", matched: true }],
        reasoning: "Exact formula and physical interpretation provided.",
        keywords: [{ word: "Δx Δp >= h/4π", matched: true }, { word: "Simultaneous measurement", matched: true }]
      },
      {
        id: "q2",
        qNum: "Q2",
        section: "secA",
        title: "De Broglie Wave-Particle Duality",
        maxMarks: 5,
        obtainedMarks: 4.5,
        status: "full",
        bbox: { x: 35, y: 270, w: 580, h: 90 },
        steps: [{ desc: "De Broglie equation λ = h / p", pts: "4.5 / 5.0", matched: true }],
        reasoning: "Great work, clearly explained momentum relationship.",
        keywords: [{ word: "λ = h/p", matched: true }]
      },
      {
        id: "q3",
        qNum: "Q3",
        section: "secB",
        title: "Schrodinger 1D Wave Equation Derivation",
        maxMarks: 10,
        obtainedMarks: 8.0,
        status: "partial",
        bbox: { x: 35, y: 400, w: 580, h: 90 },
        steps: [{ desc: "Hamiltonian operator formulation", pts: "8.0 / 10.0", matched: true }],
        reasoning: "Slight algebra error on potential energy V(x) sign.",
        keywords: [{ word: "Hψ = Eψ", matched: true }, { word: "Hamiltonian Operator", matched: true }]
      }
    ]
  }
};
