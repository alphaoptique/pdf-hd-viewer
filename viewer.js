const urlParams = new URLSearchParams(window.location.search);
const fileUrl = urlParams.get("file");

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.6.82/pdf.worker.min.js";

const canvas = document.getElementById("pdf-canvas");
const ctx = canvas.getContext("2d");

async function loadPDF(url) {
  const pdf = await pdfjsLib.getDocument(url).promise;
  const page = await pdf.getPage(1);

  const scale = 2; // HD simple
  const viewport = page.getViewport({ scale });

  canvas.width = viewport.width;
  canvas.height = viewport.height;

  await page.render({
    canvasContext: ctx,
    viewport: viewport
  }).promise;
}

loadPDF(fileUrl);
