let cam;
let r, g, b;
let w, h;
let bottom;
let moveActivated = false;

function setup() {
  createCanvas(windowWidth - 1, windowHeight - 1);
  //trasparenza fra i riquadri
  blendMode(ADD);
  pixelDensity(1);
  bottom = height * 0.9;
  mouseX = width / 2;
  mouseY = height / 2;

  //grandezza riquadri
  h = floor(height / 2);
  w = floor(h * 4 / 2);

  cam = createCapture(VIDEO);
  cam.size(w, h);
  cam.hide();

  r = createImage(w, h);
  g = createImage(w, h);
  b = createImage(w, h);

  r.loadPixels();
  g.loadPixels();
  b.loadPixels();
}

function draw() {
  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    pixels[i + 0] = 0;
    pixels[i + 1] = 0;
    pixels[i + 2] = 0;
    pixels[i + 3] = 0;
  }
  updatePixels();
  background(0);

  //effetti RGB webcam
  cam.loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    r.pixels[i + 0] = 255;
    r.pixels[i + 1] = 0;
    r.pixels[i + 2] = 0;
    r.pixels[i + 3] = pixels[i + 0];

    g.pixels[i + 0] = 0;
    g.pixels[i + 1] = 255;
    g.pixels[i + 2] = 0;
    g.pixels[i + 3] = pixels[i + 1];

    b.pixels[i + 0] = 0;
    b.pixels[i + 1] = 0;
    b.pixels[i + 2] = 255;
    b.pixels[i + 3] = pixels[i + 2];

  }

  r.updatePixels();
  g.updatePixels();
  b.updatePixels();

  //cursore con croce
  if (moveActivated) {
    cursor(CROSS);
    let offsetX = mouseX - width / 2;
    let offsetY = mouseY - height / 2;
    image(r, width / 2 - w / 2 - abs(offsetX), height / 2 - h / 2 - offsetY, w, h);
    image(g, width / 2 - w / 2 + abs(offsetX), height / 2 - h / 2 - offsetY, w, h);
    image(b, width / 2 - w / 2 + offsetX, height / 2 - h / 2 + offsetY, w, h);

    //cursore con mano che indica
  } else {
    cursor(HAND);
    image(r, width / 2 - w, height / 2 - h, w, h);
    image(g, width / 2, height / 2 - h, w, h);
    image(b, width / 2 - w, height / 2, w, h);

  }

  //testo "clicca per attivare l'effetto 3d"
  if (frameCount < 60 * 5) {
    fill(255);
    textAlign(RIGHT, BOTTOM);
    textSize(height / 35);
    text("CLICCA PER CREARE L'EFFETTO 3D!", width - height / 20, height - (height / 20));

  //cliccare sulla scritta "3D effect"per creare l'effetto
  } else {
    fill(255, 56);
    if (mouseY > bottom) {
      fill(255);
    }
    textAlign(RIGHT, BOTTOM);
    textSize(height / 45);
    text("3D EFFECT", width - height / 20, height - (height / 20));
  }
}

//cliccare il mouse per attivare l'effetto
function mousePressed() {
  moveActivated = !moveActivated;
}

function windowResized() {
  resizeCanvas(windowWidth - 1, windowHeight - 1);
  h = floor(height / 2);
  w = floor(h * 4 / 3);
}

//premere un tasto qualsiasi per webcam senza effetti
function keyPressed() {
  mouseX = width / 2;
  mouseY = height / 2;
  moveActivated = !moveActivated;
}
