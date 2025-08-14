const fs = require("fs");
const pdf = require("pdf-parse");

// Read PDF file into buffer
const dataBuffer = fs.readFileSync("../assets/test.pdf");

pdf(dataBuffer).then(function (data) {
  // Number of pages
  console.log("Pages:", data.numpages);

  // Info about the PDF
  console.log("Info:", data.info);

  // Full text content
  console.log("Text content:\n", data.text);
});
