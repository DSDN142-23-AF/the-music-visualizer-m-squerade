let img_bg_1;
let img_bg_2;
let img_bg_3;
let img_karas;
let img_orphie;
let img_spku;
let img_lam_1;
let img_lam_2;
let img_silske;
let img_nobody;
let die_roll = 20;

const SCALE = 0.75;
const KARAS_SPEED = 15.0; // screen traverse, in seconds
const DIE_RADIUS_MIN = 65 * SCALE;
const DIE_RADIUS_MAX = 75 * SCALE;
const KARAS_HEIGHT = 267 * SCALE * 0.6;
const KARAS_WIDTH = 320 * SCALE * 0.6;
const ORPHIE_WIDTH = 433 * SCALE * 1.1;
const ORPHIE_HEIGHT = 561 * SCALE * 1.1;
const SPKU_WIDTH = 429 * SCALE;
const SPKU_HEIGHT = 592 * SCALE;
const LAM_WIDTH = 542 * SCALE;
const LAM_HEIGHT = 569 * SCALE;
const SILSKE_HEIGHT = 641 * SCALE * 0.9;
const SILSKE_WIDTH = 369 * SCALE * 0.9;
const NOBODY_HEIGHT = 408 * SCALE;
const NOBODY_WIDTH = 681 * SCALE;

const DRUM_CX = 9 * SCALE; // relative to lam centre
const DRUM_CY = 110 * SCALE; // relative to lam centre

function draw_one_frame(words, vocal, drum, bass, other, counter) {
    angleMode(DEGREES);
    load_imgs_if_required();

    background(0, 0, 0); // black
    if (counter < KARAS_SPEED) {
        image(img_bg_1, 0, 0, canvasWidth, canvasHeight);
    } else if (counter < KARAS_SPEED + 2.0) {
        image(img_bg_2, 0, 0, canvasWidth, canvasHeight);
    } else { // counter >= KARAS_SPEED + 2.0
        image(img_bg_3, 0, 0, canvasWidth, canvasHeight);
    }

    // Draw Karas (Counter = Translate)
    let xx = ((counter / KARAS_SPEED) * (canvasWidth + KARAS_WIDTH)) - (KARAS_WIDTH / 2);
    push();
    imageMode(CENTER);
    translate(xx, canvasHeight * 0.1);
    image(img_karas, 0, 0, KARAS_WIDTH, KARAS_HEIGHT);
    pop();

    // Draw Orphie (Vocals = Scale)
    let scale = map(vocal, 0, 100, SCALE, SCALE / 0.85);
    let orphie_width = ORPHIE_WIDTH * scale;
    let orphie_height = ORPHIE_HEIGHT * scale;
    push();
    imageMode(CENTER);
    translate(canvasWidth * 0.83, canvasHeight * 0.7);
    image(img_orphie, 0, 0, orphie_width, orphie_height);
    pop();

    // Draw Spku (Other = Rotate)
    let angle = map(other, 0, 100, -20, 20);
    push();
    imageMode(CENTER);
    translate(canvasWidth * 0.2, canvasHeight * 0.7);
    rotate(angle);
    image(img_spku, 0, 0, SPKU_WIDTH, SPKU_HEIGHT);
    pop();

    // Draw Silske (Bass = Translate)
    let dxy = map(bass, 0, 100, -10, 10);
    push();
    imageMode(CENTER);
    translate((canvasWidth * 0.65) + dxy, (canvasHeight * 0.5) + dxy);
    image(img_silske, 0, 0, SILSKE_WIDTH, SILSKE_HEIGHT);
    pop();

    // Draw Lam (Drums = image option + D20)
    push();
    imageMode(CENTER);
    if (drum > 70) { // beat
        push();
        translate(canvasWidth * 0.4, canvasHeight * 0.5);
        image(img_lam_1, 0, 0, LAM_WIDTH, LAM_HEIGHT);
        draw_die(DRUM_CX, DRUM_CY, DIE_RADIUS_MAX, 10, DIE_RADIUS_MIN, '' + die_roll);    
        pop();
        push();
        translate(canvasWidth * 0.53, canvasHeight * 0.8);
        image(img_nobody, 0, -20, NOBODY_WIDTH, NOBODY_HEIGHT);
        pop();
        die_roll = ceil(random(20));
    } else { // not beat
        push();
        translate(canvasWidth * 0.4, canvasHeight * 0.5);
        image(img_lam_2, 0, 0, LAM_WIDTH, LAM_HEIGHT);
        draw_die(DRUM_CX, DRUM_CY, DIE_RADIUS_MIN, 10, DIE_RADIUS_MIN, '' + die_roll);    
        pop();
        push();
        translate(canvasWidth * 0.53, canvasHeight * 0.8);
        image(img_nobody, 0, 0, NOBODY_WIDTH, NOBODY_HEIGHT);
        pop();
    }
    pop();

    //Draw Karas.. TODO; counter make him fly across the screen
}

function load_imgs_if_required() {
    if (!img_bg_1) {
        img_bg_1 = loadImage('assets/Amona_BG_NoErrupt.png');
    }
    if (!img_bg_2) {
        img_bg_2 = loadImage('assets/Amona_BG_Errupt.png');
    }
    if (!img_bg_3) {
        img_bg_3 = loadImage('assets/Amona_BG.png');
    }
    if (!img_karas) {
        img_karas = loadImage('assets/Karas_Foreground.png'); 
    }
    if (!img_orphie) {
        img_orphie = loadImage('assets/Orphie_Vocals.png'); 
    }
    if (!img_spku) {
        img_spku = loadImage('assets/Spku_Other_Flute.png'); 
    }
    if (!img_lam_1) {
        img_lam_1 = loadImage('assets/Lam_Drums_Clean.png'); 
    }
    if (!img_lam_2) {
        img_lam_2 = loadImage('assets/Lam_Drums_Armdown.png');
    }
    if (!img_silske) {
        img_silske = loadImage('assets/Silske_Bass.png'); 
    }
    if (!img_nobody) {
        img_nobody = loadImage('assets/Nobody_Foreground.png'); 
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
    fill('#f62b03');
    stroke('#f62b03');
    draw_polygon(cx, cy, radius, sides);
    textSize(text_size);
    textAlign(CENTER, CENTER);
    noStroke();
    fill('#f0e4d4');
    text(die_roll, cx , cy);
}