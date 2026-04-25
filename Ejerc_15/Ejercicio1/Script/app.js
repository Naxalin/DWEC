const dropzone = document.getElementById("drop-zone");
const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");
const procesar = document.getElementById("process-btn");
const downloads = document.getElementById("downloads");

let images = [];

dropzone.addEventListener("click", () => fileInput.click());

["dragover", "drop"].forEach(event => dropzone.addEventListener(event, e => e.preventDefault()));

dropzone.addEventListener("dragover", () => dropzone.classList.add("dragover"));
dropzone.addEventListener("dragleave", () => dropzone.classList.remove("dragover"));

dropzone.addEventListener("drop", e => {
    dropzone.classList.remove("dragover");
    handleFiles(e.dataTransfer.files);
});

fileInput.addEventListener("change", () => handleFiles(fileInput.files));

function handleFiles(files){
    [...files].forEach(file => {
        if(!file.type.startsWith("image/")) return;
        images.push(file);

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = e => {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.style.width = "100px";
            img.style.height = "100px";
            img.style.objectFit = "cover";
            preview.appendChild(img);
        };
    });
}

procesar.addEventListener("click",() => {
    downloads.innerHTML = "";
    const waterMark = document.getElementById("watermark").value;
    const maxWidth = parseInt(document.getElementById("max-width").value || 0);
    const format = document.getElementById("output-format").value;

    images.forEach(element => {
        const reader = new FileReader();
        reader.readAsDataURL(element);
        reader.onload = e => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                let width = img.width;
                let height = img.height;

                if(width > 0 && height > 0 && maxWidth > 0 && width > maxWidth){
                    const scale = maxWidth / width;
                    width = maxWidth;
                    height = height * scale;
                }

                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");

                ctx.drawImage(img,0,0,width,height);

                if(waterMark){
                    ctx.font = `${Math.floor(width/20)}px Arial`;
                    ctx.fillStyle = "rgba(255,255,255,0.7)";
                    ctx.fillText(waterMark, 10, height - 10);
                }

                const url = canvas.toDataURL(format);
                const link = document.createElement("a");
                const ext = format === "image/png" ? "png" : "jpg";
                link.href = url;
                link.download = `editada-${element.name.split(".")[0]}.${ext}`;
                link.textContent = `Descargar ${element.name}`;
                downloads.appendChild(link);
            };
        };
    });
});
