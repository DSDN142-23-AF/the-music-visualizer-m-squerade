let img_bg;
let img_orphie;
const DIE_RADIUS_MIN = 40;
const DIE_RADIUS_MAX = 60;
const SCALE = 0.75;
const RAW_SIZE_ORPHIE_WIDTH = 433;
const RAW_SIZE_ORPHIE_HEIGHT = 561;

function load_imgs_if_required() {
    if (!img_bg) {
        img_bg = loadImage('assets/Amona_BG.png');
    }
    if (!img_orphie) {
        img_orphie = loadImage('assets/Orphie_Vocals.png');
    }
}

function draw_one_frame(words, vocal, drum, bass, other,counter) {
    load_imgs_if_required();

    background(255,236,180); // cream
    
    image(img_bg, 0, 0, canvasWidth, canvasHeight);

    let radius = map(drum, 0, 100, DIE_RADIUS_MIN, DIE_RADIUS_MAX);
    draw_die(canvasWidth / 2, canvasHeight - DIE_RADIUS_MAX, radius, 10, DIE_RADIUS_MIN);

    let scale = map(vocal, 0, 100, SCALE * 0.9, SCALE / 0.9);
    let orphie_width = RAW_SIZE_ORPHIE_WIDTH * scale;
    let orphie_height = RAW_SIZE_ORPHIE_HEIGHT * scale;
    image(img_orphie, (canvasWidth * 0.8) - (orphie_width / 2), (canvasHeight * 0.7) - (orphie_height / 2), orphie_width, RAW_SIZE_ORPHIE_HEIGHT * scale);
}


function draw_polygon(cx, cy, radius, sides) { 
    // my dad helped me with this function :)
    let aa = TWO_PI / sides;
    angleMode(RADIANS);
    strokeWeight(radius / 8);
    beginShape();
    for (let ii = 0; ii < sides; ii++) {
        vertex(cx + (radius * sin(ii * aa)), cy + (radius * cos(ii * aa)));
    }
    endShape(CLOSE);
}

function draw_die(cx, cy, radius, sides, text_size) {
    fill('blue');
    stroke('red');
    draw_polygon(cx, cy, radius, sides);
    textSize(text_size);
    textAlign(CENTER, CENTER);
    noStroke();
    fill('green');
    text('1', cx , cy);
}