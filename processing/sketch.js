function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function setup() {
    createCanvas(800, 800);
    noLoop();
}

function draw () {
    background(15, 20, 30)

    for (let i = -100; i < width + 100; i += 200) {
        for (let j = -100; j < height + 100; j += 200) {
            noStroke();
            fill(getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255));
            rectMode(CENTER);
            rect(i, j, 200, 200);
            push();
            translate(i, j);
            scale(0.28);
            for (let n = 0; n < 30; n++) {
                stroke(getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255));
                for (let a = 0; a < 360; a += 2) {
                    let x1 = getRandomInt(50, 150);
                    let x2 = getRandomInt(150, 350);
                    push();
                    rotate(radians(a));
                    strokeCap(SQUARE);
                    strokeWeight(4);
                    line(x1, 0, x2, 0)
                    pop();
                }
            }
            pop();
        }
    }
}

function mouseClicked() {
    redraw();
}