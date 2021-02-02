importScripts(
  "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.3.0/jspdf.umd.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.13/jspdf.plugin.autotable.min.js"
);

function generatePDF(data) {
  const doc = new self.jspdf.jsPDF();
  doc.autoTable(data);

  // returning blob
  const blob = doc.output("blob");
  postMessage(blob);
}

onmessage = function (event) {
  generatePDF(event.data);
};
