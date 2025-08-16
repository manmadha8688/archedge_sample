import * as pdfjsLib from '../pdf-js/build/pdf.mjs';

// Setup ES module worker
pdfjsLib.GlobalWorkerOptions.workerPort = new Worker(
  new URL('../pdf-js/build/pdf.worker.mjs', import.meta.url),
  { type: 'module' }
);

let pdfDoc = null;
let pageNum = 1;
let isMobile = window.innerWidth <= 480;

const canvasLeft = document.getElementById('page-left');
const ctxLeft = canvasLeft.getContext('2d');

const canvasRight = document.getElementById('page-right');
const ctxRight = canvasRight.getContext('2d');

// Render single page
const renderPage = async (num, canvas, ctx) => {
  if (!pdfDoc || num < 1 || num > pdfDoc.numPages) return;

  const page = await pdfDoc.getPage(num);
  const cssWidth = canvas.clientWidth;
  const cssHeight = canvas.clientHeight;

  const dpi = window.devicePixelRatio || 1;
  const renderScale = dpi * 2;

  const viewport = page.getViewport({ scale: 1 });
  const scaleX = (cssWidth * renderScale) / viewport.width;
  const scaleY = (cssHeight * renderScale) / viewport.height;
  const scale = Math.max(scaleX, scaleY);

  const scaledViewport = page.getViewport({ scale });
  canvas.width = scaledViewport.width;
  canvas.height = scaledViewport.height;
  canvas.style.width = cssWidth + 'px';
  canvas.style.height = cssHeight + 'px';

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;
};

// Render left & right pages
const renderSpread = async () => {
  if (isMobile) {
    await renderPage(pageNum, canvasLeft, ctxLeft);
  } else {
    await renderPage(pageNum, canvasLeft, ctxLeft);
    await renderPage(pageNum + 1, canvasRight, ctxRight);
  }
  document.getElementById('page-num').textContent = `Page: ${pageNum} / ${pdfDoc.numPages}`;
};

// Flip next
const showNext = async () => {
  if (!pdfDoc) return;
  if (isMobile) {
    if (pageNum + 1 > pdfDoc.numPages) return;
    canvasLeft.style.zIndex = 10;
    canvasLeft.style.transform = 'rotateY(-180deg)';
    await new Promise(r => setTimeout(r, 600));
    pageNum += 1;
    await renderSpread();
    canvasLeft.style.zIndex = 1;
    canvasLeft.style.transform = 'rotateY(0deg)';
  } else {
    
   
    if (pageNum + 1 > pdfDoc.numPages) return; // prevent overflow

  canvasRight.style.transition = "transform 0.6s ease";
  canvasRight.style.zIndex = 10;

  // Step 1: Start flipping (0 → -90deg)
  canvasRight.style.transform = "rotateY(-190deg)";

  // Wait until half flip
  await new Promise(r => setTimeout(r, 500));

  // Step 2: Swap to next pages while hidden at 90°
  pageNum += 2;
  
   await renderPage(pageNum + 1, canvasRight, ctxRight);

  // Step 3: Continue flipping (-90deg → -180deg)
    canvasRight.style.transition = "transform 0.6s ease";


  // Step 4: Reset instantly back to 0deg for next flip cycle
  canvasRight.style.transition = "none";
  canvasRight.style.transform = "rotateY(0deg)";
   renderPage(pageNum, canvasLeft, ctxLeft); 
  canvasRight.style.zIndex = 1;

  
  document.getElementById('page-num').textContent = `Page: ${pageNum} / ${pdfDoc.numPages}`;

  }
};

// Flip previous
const showPrev = async () => {
  if (!pdfDoc || pageNum <= 1) return;
  if (isMobile) {
    canvasLeft.style.zIndex = 10;
    canvasLeft.style.transform = 'rotateY(180deg)';
    await new Promise(r => setTimeout(r, 600));
    pageNum -= 1;
    if (pageNum < 1) pageNum = 1;
    await renderSpread();
    canvasLeft.style.zIndex = 1;
    canvasLeft.style.transform = 'rotateY(0deg)';
  } else {
    canvasLeft.style.zIndex = 10;
    canvasLeft.style.transform = 'rotateY(180deg)';
    await new Promise(r => setTimeout(r, 600));
    pageNum -= 2;
    if (pageNum < 1) pageNum = 1;
    await renderSpread();
    canvasLeft.style.zIndex = 1;
    canvasLeft.style.transform = 'rotateY(0deg)';
  }
};

// Arrow click events
document.getElementById('prevArrow').addEventListener('click', showPrev);
document.getElementById('nextArrow').addEventListener('click', showNext);
canvasLeft.addEventListener('click', showPrev);
canvasRight.addEventListener('click', showNext);

// Resize handler
window.addEventListener('resize', () => {
  isMobile = window.innerWidth <= 480;
  renderSpread();
  resizeAndRender();
});

const resizeAndRender = async () => {
  const wrapperWidth = document.querySelector('.canvas-wrapper').clientWidth;
  const wrapperHeight = document.querySelector('.canvas-wrapper').clientHeight;
  canvasLeft.width = wrapperWidth * 0.45;
  canvasLeft.height = wrapperHeight;
  canvasRight.width = wrapperWidth * 0.45;
  canvasRight.height = wrapperHeight;
  await renderSpread();
};

// --- DYNAMIC PDF LOAD FUNCTION ---
export async function openPDF(filename) {
  const url = `/archedge_sample/assets/pdfs/${filename}.pdf`; // update path
  pdfDoc = await pdfjsLib.getDocument({ url, useSystemFonts: true }).promise;
  pageNum = 1;

  document.getElementById('flipbook-container').style.display = 'flex';
  await renderSpread();
}
