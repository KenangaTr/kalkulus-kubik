//navbar
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
menu.classList.toggle('active');
menuToggle.classList.toggle('open');
});
// Mendapatkan elemen kanvas dan konteks 2D
const canvas = document.getElementById("graph");
const ctx = canvas.getContext("2d");

// Fungsi untuk menggambar grafik fungsi kubik berdasarkan input pengguna
function drawGraph() {
    // Bersihkan kanvas sebelum menggambar
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Mengatur warna dan ketebalan garis grafik
    ctx.strokeStyle = "#007bff";
    ctx.lineWidth = 2;
    
    // Memulai jalur baru untuk grafik fungsi
    ctx.beginPath();
    
    for (let x = -canvas.width / 2; x < canvas.width / 2; x++) {
        // Skala titik x untuk kanvas
        const xValue = x / 20; 
        // Hitung nilai y dengan fungsi kubik dari input pengguna
        const yValue = cubicFunction(xValue);
        // Skala titik y dan pusatkan grafik di tengah kanvas
        const canvasX = x + canvas.width / 2; 
        const canvasY = -yValue * 20 + canvas.height / 2;
        
        // Menghubungkan titik-titik pada grafik
        if (x === -canvas.width / 2) {
            ctx.moveTo(canvasX, canvasY); // Mulai dari titik awal
        } else {
            ctx.lineTo(canvasX, canvasY);
        }
    }
    
    ctx.stroke(); // Menggambar jalur grafik
}

// Fungsi untuk menghitung nilai fungsi kubik f(x) = ax^3 + bx^2 + cx + d
function cubicFunction(x) {
    const a = parseFloat(document.getElementById("a").value);
    const b = parseFloat(document.getElementById("b").value);
    const c = parseFloat(document.getElementById("c").value);
    const d = parseFloat(document.getElementById("d").value);
    return a * x ** 3 + b * x ** 2 + c * x + d;
}

// Fungsi untuk mencari titik ekstrem
function findExtremes() {
    const a = parseFloat(document.getElementById("a").value);
    const b = parseFloat(document.getElementById("b").value);
    const c = parseFloat(document.getElementById("c").value);
    const d = parseFloat(document.getElementById("d").value);
    
    const delta = b * b - 3 * a * c;
    let resultText = "";
    
    if (delta > 0) {
        const x1 = (-b + Math.sqrt(delta)) / (3 * a);
        const x2 = (-b - Math.sqrt(delta)) / (3 * a);
        
        const y1 = cubicFunction(x1);
        const y2 = cubicFunction(x2);
        
        resultText = `Titik maksimum di koordinat (x = ${x1.toFixed(2)}, y = ${y1.toFixed(2)}) dan titik minimum di koordinat (x = ${x2.toFixed(2)}, y = ${y2.toFixed(2)})`;
    } else if (delta === 0) {
        const x = -b / (3 * a);
        const y = cubicFunction(x);
        resultText = `Hanya satu titik ekstrem di koordinat (x = ${x.toFixed(2)}, y = ${y.toFixed(2)})`;
    } else {
        resultText = "Tidak ada titik ekstrem riil";
    }
    
    document.getElementById("result").textContent = resultText;
}

// Menambahkan event listener untuk menggambar ulang grafik saat input berubah
document.querySelectorAll("#a, #b, #c, #d").forEach(input => {
    input.addEventListener("input", () => {
        drawGraph(); // Gambar ulang grafik dengan nilai baru
        findExtremes(); // Cari titik ekstrem dengan nilai baru
    });
});

// Gambar grafik awal saat halaman pertama kali dimuat
drawGraph();

let zoomLevel = 1; // Skala awal
const zoomFactor = 1.2; // Faktor zoom

// Fungsi untuk menggambar ulang grafik dengan zoom
function redrawGraphWithZoom() {
  const a = parseFloat(document.getElementById("a").value);
  const b = parseFloat(document.getElementById("b").value);
  const c = parseFloat(document.getElementById("c").value);
  const d = parseFloat(document.getElementById("d").value);

  // Reset transformasi kanvas
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Terapkan zoom
  ctx.scale(zoomLevel, zoomLevel);

  // Gambar ulang sumbu dan grafik
  drawAxes();
  drawCubic(a, b, c, d);
}

// Fungsi untuk zoom in dan zoom out
function zoom(direction) {
  if (direction === "in") {
    zoomLevel *= zoomFactor;
  } else if (direction === "out") {
    zoomLevel /= zoomFactor;
  }
  redrawGraphWithZoom();
}

// Fungsi untuk reset zoom
function resetZoom() {
  zoomLevel = 1;
  redrawGraphWithZoom();
}



