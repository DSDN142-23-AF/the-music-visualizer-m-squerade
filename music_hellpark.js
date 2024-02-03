let img_bg;
let img_orphie;
let img_spku;
let img_lam_1;
let img_lam_2;

const SCALE = 0.75;
const DIE_RADIUS_MIN = 50 * SCALE;
const DIE_RADIUS_MAX = 75 * SCALE;
const ORPHIE_WIDTH = 433 * SCALE;
const ORPHIE_HEIGHT = 561 * SCALE;
const SPKU_WIDTH = 429 * SCALE;
const SPKU_HEIGHT = 592 * SCALE;
const LAM_WIDTH = 542 * SCALE;
const LAM_HEIGHT = 569 * SCALE;
const DRUM_CX = 9 * SCALE; // relative to lam centre
const DRUM_CY = 89 * SCALE; // relative to lam centre

function draw_one_frame(words, vocal, drum, bass, other, counter) {
    angleMode(DEGREES);
    load_imgs_if_required();

    background(255,236,180); // cream   
    image(img_bg, 0, 0, canvasWidth, canvasHeight);

    // Draw Orphie (Vocals = Scale)
    let scale = map(vocal, 0, 100, SCALE, SCALE / 0.85);
    let orphie_width = ORPHIE_WIDTH * scale;
    let orphie_height = ORPHIE_HEIGHT * scale;
    push();
    imageMode(CENTER);
    translate(canvasWidth * 0.8, canvasHeight * 0.7);
    image(img_orphie, 0, 0, orphie_width, orphie_height);
    pop();

    // Draw Spku (Other = Rotate)
    let angle = map(other, 0, 100, -20, 20)
    let spku_width = SPKU_WIDTH * SCALE;
    let spku_height = SPKU_HEIGHT * SCALE;
    push();
    imageMode(CENTER);
    translate(canvasWidth * 0.2, canvasHeight * 0.7);
    rotate(angle);
    image(img_spku, 0, 0, spku_width, spku_height);
    pop();

    // Draw Silske (Bass = Translate)
    // TODO - ...

    // Draw Lam (Drums = image option + D20)
    let radius = map(drum, 0, 100, DIE_RADIUS_MIN, DIE_RADIUS_MAX);
    let die_roll = ceil(map(drum, 0, 100, 0, 20));
    let lam_width = LAM_WIDTH * SCALE;
    let lam_height = LAM_HEIGHT * SCALE;
    push();
    imageMode(CENTER);
    translate(canvasWidth * 0.4, canvasHeight * 0.5);
    image(drum > 45 ? img_lam_1 : img_lam_2, 0, 0, lam_width, lam_height);
    draw_die(DRUM_CX, DRUM_CY, radius, 10, DIE_RADIUS_MIN, '' + die_roll);
    pop();
}

function load_imgs_if_required() {
    if (!img_bg) {
        img_bg = loadImage('assets/Amona_BG.png'); // a/n: amona is a town in my campaign. a volcano exploded there
    }
    if (!img_orphie) {
        img_orphie = loadImage('assets/Orphie_Vocals.png'); // a/n: my daughter :)
    }
    if (!img_spku) {
        img_spku = loadImage('assets/Spku_Other_Flute.png');
    }
    if (!img_lam_1) {
        img_lam_1 = loadImage('assets/Lam_Drums_Clean.png');
    }
    if (!img_lam_2) {
        img_lam_2 = loadImage('assets/Lam_Drums_Armdown.png'); // TODO - arms DOWN!
    }
}

function draw_polygon(cx, cy, radius, sides) { 
    let aa = TWO_PI / sides;
    angleMode(RADIANS);
    strokeWeight(radius / 8);
    beginShape();
    for (let ii = 0; ii < sides; ii++) {
        vertex(cx + (radius * sin(ii * aa)), cy + (radius * cos(ii * aa)));
    }
    endShape(CLOSE);
}

function draw_die(cx, cy, radius, sides, text_size, die_roll) {
    fill('blue');
    stroke('red');
    draw_polygon(cx, cy, radius, sides);
    textSize(text_size);
    textAlign(CENTER, CENTER);
    noStroke();
    fill('green');
    text(die_roll, cx , cy);
}