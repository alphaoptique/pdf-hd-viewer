pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.6.82/pdf.worker.min.js";

const canvas = document.getElementById("pdf-canvas");
const ctx = canvas.getContext("2d");

document.getElementById("file-input").addEventListener("change", async (e) => {
  const file = e.target.files[0];

  const fileReader = new FileReader();

  fileReader.onload = async function () {
    const typedarray = new Uint8Array(this.result);

    const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
    const page = await pdf.getPage(1);

    const scale = 2;
    const viewport = page.getViewport({ scale });

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
      canvasContext: ctx,
      viewport: viewport
    }).promise;
  };

  fileReader.readAsArrayBuffer(file);
});
