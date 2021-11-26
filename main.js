var file = document.getElementById("file");
var i1 = document.getElementById("i1");
var c1 = document.getElementById("c1");
var findSkin = document.getElementById("findSkin");
var btxt = document.getElementById("btxt");
var r1 = document.getElementById("r1");
var a1 = document.getElementById("a1");
var b1 = document.getElementById("b1");

var fileReader = new FileReader();
file.addEventListener("change", readimg);
fileReader.addEventListener("load", loadimg);

function readimg() {
    fileReader.readAsDataURL(file.files[0]); 
    i1.style.display = "block";
    c1.style.display = "none";
    a1.style.display = "none";
    b1.style.display = "none";
    r1.style.display = "none";
    btxt.style.display = "none";
    f1.value = null;
}
function loadimg() {
    i1.src = fileReader.result;
    a1.src = fileReader.result;
    r1.value = btxt.value = 0;
}
function rangepro() {
    btxt.value = r1.value;
    skinWhite(r1.value); 
}
function textpro() {
    r1.value = btxt.value;
    skinWhite(btxt.value);
}

function skinChangeRGB() {
    c1.width = i1.width;
    c1.height = i1.height;
    var c2d = c1.getContext("2d");
    c2d.drawImage(i1, 0, 0);
    var imgData = c2d.getImageData(0, 0, c1.width, c1.height);
    for (var i = 0; i < imgData.data.length; i += 4) {
        //Set to YCBCR
        var Yy = 0.299 * imgData.data[i] + 0.587 * imgData.data[i + 1] + 0.114 * imgData.data[i + 2]
        var Cb = -0.169 * imgData.data[i] - 0.331 * imgData.data[i + 1] + 0.499 * imgData.data[i + 2] + 128
        var Cr = 0.499 * imgData.data[i] - 0.418 * imgData.data[i + 1] - 0.0813 * imgData.data[i + 2] + 128
        imgData.data[i] = Yy + 1.402 * (Cr - 128);
        imgData.data[i + 1] = Yy - 0.344 * (Cb - 128) - 0.714 * (Cr - 128);
        imgData.data[i + 2] = Yy + 1.772 * (Cb - 128);

        //Skin Colour Detect
        if (Cr > 135 & Cr < 180 & Cb > 85 & Cb < 135 & Yy > 80) {
            imgData.data[i] = Yy + 1.402 * (Cr - 128);
            imgData.data[i + 1] = Yy - 0.344 * (Cb - 128) - 0.714 * (Cr - 128);
            imgData.data[i + 2] = Yy + 1.772 * (Cb - 128);
        }

        else {
            imgData.data[i] = 0;  //紅
            imgData.data[i + 1] = 0//綠
            imgData.data[i + 2] = 0 //藍	
        }
    }
    c2d.putImageData(imgData, 0, 0);
    i1.style.display = "block";
    c1.style.display = "block";
    b1.style.display = "none";
}

function skinWhite(bright) {
    b1.width = a1.width;
    b1.height = a1.height;
    var c2d = b1.getContext("2d");
    c2d.drawImage(a1, 0, 0);
    var imgData = c2d.getImageData(0, 0, b1.width, a1.height);
    for (var i = 0; i < imgData.data.length; i += 4) {
        //Set to YCBCR
        var Yy = 0.299 * imgData.data[i] + 0.587 * imgData.data[i + 1] + 0.114 * imgData.data[i + 2]
        var Cb = -0.169 * imgData.data[i] - 0.331 * imgData.data[i + 1] + 0.499 * imgData.data[i + 2] + 128
        var Cr = 0.499 * imgData.data[i] - 0.418 * imgData.data[i + 1] - 0.0813 * imgData.data[i + 2] + 128
        imgData.data[i] = Yy + 1.402 * (Cr - 128);
        imgData.data[i + 1] = Yy - 0.344 * (Cb - 128) - 0.714 * (Cr - 128);
        imgData.data[i + 2] = Yy + 1.772 * (Cb - 128);

        //Skin Colour Detect
        var bright = parseInt(bright)
        if (Cr > 135 & Cr < 180 & Cb > 85 & Cb < 135 & Yy > 80) {
            Yy = Yy + bright; //Add Brightness
            imgData.data[i] = Yy + 1.402 * (Cr - 128);
            imgData.data[i + 1] = Yy - 0.344 * (Cb - 128) - 0.714 * (Cr - 128);
            imgData.data[i + 2] = Yy + 1.772 * (Cb - 128);
        }
    }
    c2d.putImageData(imgData, 0, 0);
    i1.style.display = "block";
    c1.style.display = "block";
    b1.style.display = "block";
}

function whiteBtn() {
    r1.style.display = "block";
    btxt.style.display = "block";
}

