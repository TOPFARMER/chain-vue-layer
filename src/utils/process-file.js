class ProcessFile {
  static quickDownload(content, filename) {
    var elemLink = document.createElement("a");
    elemLink.download = filename;
    elemLink.style.display = "none";

    var blob = new Blob([content]);
    elemLink.href = URL.createObjectURL(blob);
    document.body.appendChild(elemLink);
    elemLink.click();
    document.body.removeChild(elemLink);
  }

  static handleFileSelect(event) {
    let files = event.target.files; // FileList object
    let reader = new FileReader();
    console.log(files);
    let keyPair = JSON.parse(reader.readAsText(files[0]));

    console.log(keyPair.getPublic().encode("hex"));
    document
      .getElementById("files")
      .addEventListener("change", handleFileSelect, false);
  }
  static readFileAsync(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  static async handleFileDropOn(evt) {
    try {
      let files = evt.dataTransfer.files; // FileList object.    
      let content = await this.readFileAsync(files[0]);
      return JSON.parse(content);
    } catch (err) {
      console.log(err);
    }
    // return JSON.parse(reader.result);
  }

  static handleDragOver(event) {
    event.dataTransfer.dropEffect = "copy"; // Explicitly show this is a copy.
  }
}

module.exports = ProcessFile;
