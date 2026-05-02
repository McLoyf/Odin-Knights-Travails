function isValidPosition([x, y]) {
    return x >= 0 && x <= 7 && y >= 0 && y <= 7;
}

function getKnightMoves([x, y]) {
    const knightOffsets = [
        [1, 2],
        [2, 1],
        [2, -1],
        [1, -2],
        [-1, -2],
        [-2, -1],
        [-2, 1],
        [-1, 2],
    ];

    return knightOffsets.map(([dx, dy]) => [x + dx, y + dy]).filter(isValidPosition);
}

function samePos(pos1, pos2) {
    return pos1[0] === pos2[0] && pos1[1] === pos2[1];
}

function positionKey([x, y]) {
    return `${x}, ${y}`;
}

function knightMoves(start, target) {
    const queue = [
        {
            position: start,
            path: [start],
        },
    ];

    const visited = new Set();
    visited.add(positionKey(start));

    while (queue.length > 0) {
        const current = queue.shift();

        if (samePos(current.position, target)) {
            return current.path;
        }

        const moves = getKnightMoves(current.position);

        for (const move of moves) {
            const key = positionKey(move);

            if (!visited.has(key)) {
                visited.add(key);

                queue.push({
                    position: move,
                    path: [...current.path, move],
                });
            }
        }
    }
    
    return null;
}

function printKnightMoves(start, target) {
    const path = knightMoves(start, target);

    console.log(`You made it in ${path.length - 1} moves! Here's your path:`);

    for (const position of path) {
        console.log(position);
    }
}

printKnightMoves([3, 3], [4, 3]);