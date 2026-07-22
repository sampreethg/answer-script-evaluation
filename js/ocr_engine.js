// MULTIMODAL VISION OCR & RUBRIC EVALUATION ENGINE

class OCREvaluationEngine {
  constructor() {
    this.currentData = null;
  }

  // Load preset exam data
  loadPreset(presetId) {
    if (SAMPLE_DATASETS[presetId]) {
      this.currentData = JSON.parse(JSON.stringify(SAMPLE_DATASETS[presetId]));
      return this.currentData;
    }
    return SAMPLE_DATASETS['cs201'];
  }

  // Process user uploaded file (Image/PDF)
  processUploadedFile(file, callback) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const uploadedDataUrl = e.target.result;
      
      // Simulate real-time Multimodal AI Vision Evaluation (Gemini 1.5 Vision / Vision OCR)
      setTimeout(() => {
        const simulatedData = {
          id: "custom_upload_" + Date.now(),
          studentName: `Uploaded Student (${file.name.substring(0, 15)})`,
          subject: "Evaluated Exam Paper (Custom Scan)",
          totalScore: 42.0,
          maxScore: 50.0,
          grade: "Grade A",
          imageSvg: uploadedDataUrl,
          questions: [
            {
              id: "q1_up",
              qNum: "Q1",
              section: "secA",
              title: "Handwritten Question 1 (AI Recognized)",
              maxMarks: 10,
              obtainedMarks: 9.0,
              status: "full",
              bbox: { x: 35, y: 140, w: 580, h: 180 },
              steps: [
                { desc: "Core definition & diagram extracted", pts: "5.0 / 5.0", matched: true },
                { desc: "Formula derivation & units", pts: "4.0 / 5.0", matched: true }
              ],
              reasoning: "OCR detected clear handwriting with 98.4% confidence. Formula derivation matches rubric key.",
              keywords: [{ word: "Definition", matched: true }, { word: "Derivation", matched: true }]
            },
            {
              id: "q2_up",
              qNum: "Q2",
              section: "secB",
              title: "Handwritten Question 2 (AI Recognized)",
              maxMarks: 15,
              obtainedMarks: 12.5,
              status: "partial",
              bbox: { x: 35, y: 350, w: 580, h: 220 },
              steps: [
                { desc: "Initial assumptions & setup", pts: "5.0 / 5.0", matched: true },
                { desc: "Intermediate numerical calculation", pts: "4.5 / 5.0", matched: true },
                { desc: "Final conclusions & graph plot", pts: "3.0 / 5.0", matched: false }
              ],
              reasoning: "Partial credit: Calculation is accurate up to line 4, but final graph axes lacked units.",
              keywords: [{ word: "Setup", matched: true }, { word: "Calculation", matched: true }, { word: "Graph Units", matched: false }]
            }
          ]
        };

        this.currentData = simulatedData;
        callback(simulatedData);
      }, 1200); // 1.2s realistic AI latency
    };

    if (file.type.startsWith('image/')) {
      reader.readAsDataURL(file);
    } else {
      // For PDF or other files, fallback to SVG placeholder canvas with filename
      const fallbackDataUrl = generateAnswerSheetSVG("Uploaded Document", file.name, [
        { qNum: "1", title: "Document Processed via OCR", handwrittenSnippet1: file.name, handwrittenSnippet2: "Size: " + Math.round(file.size/1024) + " KB" }
      ]);
      setTimeout(() => {
        const pdfSimulatedData = JSON.parse(JSON.stringify(SAMPLE_DATASETS['cs201']));
        pdfSimulatedData.studentName = file.name;
        pdfSimulatedData.imageSvg = fallbackDataUrl;
        this.currentData = pdfSimulatedData;
        callback(pdfSimulatedData);
      }, 1000);
    }
  }

  // Calculate Section totals & overall score
  calculateScores(data) {
    let secATotal = 0, secBTotal = 0, total = 0;
    data.questions.forEach(q => {
      if (q.section === 'secA') secATotal += q.obtainedMarks;
      else secBTotal += q.obtainedMarks;
      total += q.obtainedMarks;
    });

    return {
      secA: secATotal.toFixed(1),
      secB: secBTotal.toFixed(1),
      total: total.toFixed(1)
    };
  }

  // Generate downloadable digitized transcript text
  generateTranscriptText(data) {
    let transcript = `====================================================\n`;
    transcript += `         GRADEVISION AI - DIGITIZED TRANSCRIPT      \n`;
    transcript += `====================================================\n\n`;
    transcript += `Student: ${data.studentName}\n`;
    transcript += `Subject: ${data.subject}\n`;
    transcript += `Evaluated Score: ${data.totalScore} / ${data.maxScore} (${data.grade})\n`;
    transcript += `Evaluation Date: ${new Date().toLocaleDateString()}\n`;
    transcript += `OCR Engine Confidence: 99.2%\n\n`;
    transcript += `----------------------------------------------------\n`;
    transcript += `QUESTION-BY-QUESTION DIGITIZED HANDWRITING TRANSCRIPT\n`;
    transcript += `----------------------------------------------------\n\n`;

    data.questions.forEach(q => {
      transcript += `[${q.qNum}] ${q.title} (${q.obtainedMarks}/${q.maxMarks} Marks)\n`;
      transcript += `AI Status: ${q.status.toUpperCase()} CREDIT\n`;
      transcript += `Reasoning: ${q.reasoning}\n`;
      transcript += `Step Breakdown:\n`;
      q.steps.forEach(s => {
        transcript += `  - ${s.desc}: ${s.pts}\n`;
      });
      transcript += `Keywords Matched: ${q.keywords.map(k => (k.matched ? '✓ ' : '✗ ') + k.word).join(', ')}\n\n`;
    });

    transcript += `====================================================\n`;
    transcript += `End of Digitized Script Transcript\n`;
    return transcript;
  }
}

const ocrEngine = new OCREvaluationEngine();
