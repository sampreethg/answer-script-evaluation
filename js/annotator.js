// CANVAS ANNOTATOR & INTERACTIVE SVG OVERLAY CONTROLLER

class CanvasAnnotator {
  constructor() {
    this.wrapper = document.getElementById('canvasWrapper');
    this.img = document.getElementById('answerSheetImage');
    this.svg = document.getElementById('annotationOverlay');
    this.currentZoom = 1.0;
    this.selectedQId = null;
  }

  renderAnnotations(questions) {
    if (!this.svg) return;
    this.svg.innerHTML = ''; // Clear existing annotations

    questions.forEach(q => {
      if (!q.bbox) return;

      const { x, y, w, h } = q.bbox;
      const statusClass = q.status === 'full' ? 'green' : (q.status === 'partial' ? 'yellow' : 'red');

      // Create SVG Rect for Bounding Box
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', x);
      rect.setAttribute('y', y);
      rect.setAttribute('width', w);
      rect.setAttribute('height', h);
      rect.setAttribute('rx', 6);
      rect.setAttribute('class', `bbox-rect ${statusClass} ${this.selectedQId === q.id ? 'selected' : ''}`);
      rect.setAttribute('data-qid', q.id);

      // Click Event to sync with right pane
      rect.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectQuestion(q.id);
      });

      // SVG Text Label (e.g. Q1: 5.0/5)
      const textLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textLabel.setAttribute('x', x + 8);
      textLabel.setAttribute('y', y + 20);
      textLabel.setAttribute('class', 'bbox-label');
      textLabel.textContent = `${q.qNum}: ${q.obtainedMarks}/${q.maxMarks} pts`;

      this.svg.appendChild(rect);
      this.svg.appendChild(textLabel);
    });
  }

  selectQuestion(qId) {
    this.selectedQId = qId;
    
    // Highlight bounding box on SVG
    const allRects = this.svg.querySelectorAll('.bbox-rect');
    allRects.forEach(r => {
      if (r.getAttribute('data-qid') === qId) {
        r.classList.add('selected');
      } else {
        r.classList.remove('selected');
      }
    });

    // Auto-scroll right pane rubric card into view
    const targetCard = document.getElementById(`card-${qId}`);
    if (targetCard) {
      document.querySelectorAll('.question-card').forEach(c => c.classList.remove('highlighted'));
      targetCard.classList.add('highlighted');
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  setZoom(factor) {
    this.currentZoom = Math.max(0.6, Math.min(2.0, factor));
    this.wrapper.style.transform = `scale(${this.currentZoom})`;
  }

  resetZoom() {
    this.currentZoom = 1.0;
    this.wrapper.style.transform = `scale(1.0)`;
  }
}

const canvasAnnotator = new CanvasAnnotator();

function zoomCanvas(multiplier) {
  canvasAnnotator.setZoom(canvasAnnotator.currentZoom * multiplier);
}

function resetCanvasZoom() {
  canvasAnnotator.resetZoom();
}
