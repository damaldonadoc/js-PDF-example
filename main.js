window.onload = () => {
  // TODO: replace with https://github.com/eligrey/FileSaver.js
  const saveFile = (function () {
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";

    return function (data, fileName) {
      const url = window.URL.createObjectURL(data);
      a.href = url;
      a.download = fileName;
      a.click();

      window.URL.revokeObjectURL(url);
    };
  })();

  const data = (() => {
    const d = {
      head: [["Year", "Make", "Model", "Description", "Price"]],
      body: [
        ["1997", "Ford", "E350", "ac, abs, moon", "3000.00"],
        ["1999", "Chevyr", "Venture", "Extended Edition", "4900.00"],
        ["1999", "Chevy,Venture", "Extended Edition, Very Large", "5000.00"],
        ["1996", "Jeep", "Grand Cherokee", "moon roof, loaded", "4799.00"],
      ],
    };

    for (i = 0; i < 100000; i++) {
      d.body.push(["1997", "Ford", "E350", "ac, abs, moon", "3000.00"]);
    }
    return d;
  })();

  const nonBlockingPDFDownload = () => {
    var worker;

    if (typeof Worker !== "undefined") {
      if (typeof worker == "undefined") {
        worker = new Worker("worker.js");
      }

      // send data to the worker
      worker.postMessage(data);

      worker.onmessage = function (event) {
        const blob = event.data;
        saveFile(blob, "mypdf.pdf");
        worker.terminate(); // Terminates the worker.
      };
    } else {
      console.log("Sorry, your browser does not support Web Workers...");
    }
  };

  function blockingPDFdonwload() {
    const doc = new self.jspdf.jsPDF();
    doc.autoTable(data);
    doc.save("blocking");
  }

  ///////////////////////
  //// btn listeners ////
  //////////////////////
  document
    .getElementById("blockingDownload")
    .addEventListener("click", blockingPDFdonwload);

  document
    .getElementById("nonBlockingDownload")
    .addEventListener("click", nonBlockingPDFDownload);

  ///////////////
  //// clock ////
  //////////////
  const showClock = () => {
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var milli = date.getMilliseconds(); // 0 - 999

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    var time = h + ":" + m + ":" + s + ":" + milli;
    document.getElementById("clock").innerText = time;
    document.getElementById("clock").textContent = time;

    setTimeout(showClock, 100);
  };

  showClock();
};
