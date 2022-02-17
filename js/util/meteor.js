(() => {
    const STAR_COUNT = (window.innerWidth + window.innerHeight) / 64;
    const STAR_SIZE = 8;
    const STAR_MIN_SCALE = 0.1;
    const OVERFLOW_THRESHOLD = 32;

    const canvas = document.querySelector('canvas#canvas-background');
    const context = canvas.getContext('2d');

    let scale = 1, width, height;
    let stars = [];
    let pointerX, pointerY;
    let velocity = {x: 0, y: 0, tx: 0, ty: 0, z: 0.0005};
    let touchInput = false;

    generate();
    resize();
    step();

    window.onresize = resize;
    window.onmousemove = onMouseMove;
    window.ontouchmove = onTouchMove;
    window.ontouchend = onMouseLeave;
    document.onmouseleave = onMouseLeave;

    function generate() {
        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push({
                x: 0, y: 0, z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
            });
        }
    }

    function placeStar(star) {
        star.x = Math.random() * width;
        star.y = Math.random() * height;
    }

    function recycleStar(star) {
        let direction = 'z';

        let vx = Math.abs(velocity.x), vy = Math.abs(velocity.y);

        if (1 < vx || 1 < vy) {
            let axis;

            if (vx > vy) {
                axis = Math.random() < vx / (vx + vy) ? 'h' : 'v';
            }
            else {
                axis = Math.random() < vy / (vx + vy) ? 'v' : 'h';
            }

            if ('h' === axis) {
                direction = 0 < velocity.x ? 'l' : 'r';
            }
            else {
                direction = 0 < velocity.y ? 't' : 'b';
            }
        }

        star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);

        if ('z' === direction) {
            star.z = 0.1;
            star.x = Math.random() * width;
            star.y = Math.random() * height;
        }
        else if ('l' === direction) {
            star.x = -OVERFLOW_THRESHOLD;
            star.y = height * Math.random();
        }
        else if ('r' === direction) {
            star.x = width + OVERFLOW_THRESHOLD;
            star.y = height * Math.random();
        }
        else if ('t' === direction) {
            star.x = width * Math.random();
            star.y = -OVERFLOW_THRESHOLD;
        }
        else if ('b' === direction) {
            star.x = width * Math.random();
            star.y = height + OVERFLOW_THRESHOLD;
        }
    }

    function resize() {
        scale = window.devicePixelRatio || 1;

        width = window.innerWidth * scale;
        height = window.innerHeight * scale;

        canvas.width = width;
        canvas.height = height;

        stars.forEach(placeStar);
    }

    function step() {
        context.clearRect(0, 0, width, height);

        update();
        render();
        requestAnimationFrame(step);
    }

    function update() {
        velocity.tx *= 0.96;
        velocity.ty *= 0.96;

        velocity.x += (velocity.tx - velocity.x) * 0.8;
        velocity.y += (velocity.ty - velocity.y) * 0.8;

        stars.forEach(star => {
            star.x += velocity.x * star.z;
            star.y += velocity.y * star.z;

            star.x += (star.x - width / 2) * velocity.z * star.z;
            star.y += (star.y - height / 2) * velocity.z * star.z;
            star.z += velocity.z;

            // recycle when out of bounds
            if (star.x < -OVERFLOW_THRESHOLD || star.x > width + OVERFLOW_THRESHOLD || star.y < -OVERFLOW_THRESHOLD || star.y > height + OVERFLOW_THRESHOLD) {
                recycleStar(star);
            }
        });
    }

    function render() {
        stars.forEach(star => {
            context.beginPath();
            context.lineCap = 'round';
            context.lineWidth = STAR_SIZE * star.z * scale;
            context.strokeStyle = 'rgba(255,255,255,' + (0.5 + 0.5 * Math.random()) + ')';

            context.beginPath();
            context.moveTo(star.x, star.y);

            let tailX = velocity.x * 2, tailY = velocity.y * 2;

            // stroke() wont work on an invisible line
            if (0.1 > Math.abs(tailX)) {tailX = 0.5;}
            if (0.1 > Math.abs(tailY)) {tailY = 0.5;}

            context.lineTo(star.x + tailX, star.y + tailY);
            context.stroke();
        });
    }

    function movePointer(x, y) {
        if ('number' === typeof pointerX && 'number' === typeof pointerY) {
            let ox = x - pointerX, oy = y - pointerY;

            velocity.tx = velocity.tx + (ox / 8) * scale * (touchInput ? 1 : -1);
            velocity.ty = velocity.ty + (oy / 8) * scale * (touchInput ? 1 : -1);
        }
        pointerX = x;
        pointerY = y;
    }

    function onMouseMove(event) {
        touchInput = false;
        movePointer(event.clientX, event.clientY);
    }

    function onTouchMove(event) {
        touchInput = true;
        movePointer(event.touches[0].clientX, event.touches[0].clientY, true);
        event.preventDefault();
    }

    function onMouseLeave() {
        pointerX = null;
        pointerY = null;
    }
})();
