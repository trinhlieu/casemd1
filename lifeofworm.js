let canvas = document.getElementById('game');

let context = canvas.getContext('2d');


let size = 10;

let worm = {

    x: 0,

    y: 0,

    dx: size,

    dy: 0,

    cells: [],

    maxCells: 1,

};
let count = 0;

let apple = {

    x: 200,

    y: 200,

};


function getRandomInt(min, max) {

    return Math.floor(Math.random() * (max - min)) + min;

}



function loop() {

    requestAnimationFrame(loop);


    if (++count < 4) {

        return;

    }


    count = 0;

    context.clearRect(0, 0, canvas.width, canvas.height);


    worm.x += worm.dx;

    worm.y += worm.dy;


    if (worm.x < 0) {

        worm.x = canvas.width - size;

    } else if (worm.x >= canvas.width) {

        worm.x = 0;

    }


    if (worm.y < 0) {

        worm.y = canvas.height - size;

    } else if (worm.y >= canvas.height) {

        worm.y = 0;

    }


    worm.cells.unshift({x: worm.x, y: worm.y});


    if (worm.cells.length > worm.maxCells) {

        worm.cells.pop();

    }


    context.fillStyle = 'red';

    context.fillRect(apple.x, apple.y, size - 1, size - 1);



    context.fillStyle = 'green';

    worm.cells.forEach(function (cell, index) {

        context.fillRect(cell.x, cell.y, size - 1, size - 1);



        if (cell.x === apple.x && cell.y === apple.y) {

            worm.maxCells+=8;


            apple.x = getRandomInt(0, 25) * size;

            apple.y = getRandomInt(0, 25) * size;

        }



        for (let i = index + 1; i < worm.cells.length; i++) {


            if (cell.x === worm.cells[i].x && cell.y === worm.cells[i].y) {

                worm.x = 160;

                worm.y = 160;

                worm.cells = [];

                worm.maxCells = 1;

                worm.dx = size;

                worm.dy = 0;


                apple.x = getRandomInt(0, 25) * size;

                apple.y = getRandomInt(0, 25) * size;

            }

        }

    });

}


document.addEventListener('keydown', function (e) {


    if (e.keyCode === 38 && worm.dx === 0) {

        worm.dx = -size;

        worm.dy = 0;

    } else if (e.keyCode === 37 && worm.dy === 0) {

        worm.dy = -size;

        worm.dx = 0;

    } else if (e.keyCode === 40 && worm.dx === 0) {

        worm.dx = size;

        worm.dy = 0;

    } else if (e.keyCode === 39 && worm.dy === 0) {

        worm.dy = size;

        worm.dx = 0;

    }

});


requestAnimationFrame(loop);