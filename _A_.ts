//Método Pathfiding A*

var findShortestPath = function(startCoordinates, grid) {
    var distanceFromTop = startCoordinates[0];
    var distanceFromLeft = startCoordinates[1];

    var location = {
        distanceFromTop: distanceFromTop,
        distanceFromLeft: distanceFromLeft,
        path: [],
        status: 'Inicio'
    };

    var queue = [location];

    while (queue.length > 0) {
        var currentLocation = queue.shift();

        // Busca arriba
        var newLocation = exploreInDirection(currentLocation, 'Arriba', grid);
        if (newLocation.status == 'Meta') {
            return newLocation.path;
        } else if (newLocation.status == 'Valido') {
            queue.push(newLocation);
        }

        // Busca a la derecha
        var newLocation = exploreInDirection(currentLocation, 'Derecha', grid);
        if (newLocation.status == 'Meta') {
            return newLocation.path;
        } else if (newLocation.status == 'Valido') {
            queue.push(newLocation);
        }

        // Busca abajo
        var newLocation = exploreInDirection(currentLocation, 'Abajo', grid);
        if (newLocation.status == 'Meta') {
            return newLocation.path;
        } else if (newLocation.status == 'Valido') {
            queue.push(newLocation);
        }

        // Busca a la izquierda
        var newLocation = exploreInDirection(currentLocation, 'Izquierda', grid);
        if (newLocation.status == 'Meta') {
            return newLocation.path;
        } else if (newLocation.status == 'Valido') {
            queue.push(newLocation);
        }
    }

    return false;

};


var locationStatus = function(location, grid) {
    var gridSize = grid.length;
    var dft = location.distanceFromTop;
    var dfl = location.distanceFromLeft;

    if (location.distanceFromLeft < 0 ||
        location.distanceFromLeft >= gridSize ||
        location.distanceFromTop < 0 ||
        location.distanceFromTop >= gridSize) {

        return 'Invalido';
    } else if (grid[dft][dfl] == 'Meta') {
        return 'Meta';
    } else if (grid[dft][dfl] != 'Vacio') {
        return 'bloqueado';
    } else {
        return 'Valido';
    }
};


// Explores the grid from the given location in the given
// direction
var exploreInDirection = function(currentLocation, direction, grid) {
    var newPath = currentLocation.path.slice();
    newPath.push(direction);

    var dft = currentLocation.distanceFromTop;
    var dfl = currentLocation.distanceFromLeft;

    if (direction == 'Arriba') {
        dft -= 1;
    } else if (direction == 'Derecha') {
        dfl += 1;
    } else if (direction == 'Abajo') {
        dft += 1;
    } else if (direction == 'Izquierda') {
        dfl -= 1;
    }

    var newLocation = {
        distanceFromTop: dft,
        distanceFromLeft: dfl,
        path: newPath,
        status: 'desconocido'
    };
    newLocation.status = locationStatus(newLocation, grid);

    if (newLocation.status == 'Valido') {
        grid[newLocation.distanceFromTop][newLocation.distanceFromLeft] = 'Visitado';
    }

    return newLocation;
};


var gridSize = 4;
var grid = [];
for (var i=0; i<gridSize; i++) {
    grid[i] = [];
    for (var j=0; j<gridSize; j++) {
        grid[i][j] = 'Vacio';
    }
}


grid[0][0] = "Inicio";
grid[2][2] = "Meta";

grid[1][1] = "Bloque";
grid[1][2] = "Bloque";
grid[1][3] = "Bloque";
grid[2][1] = "Bloque";

console.log(findShortestPath([0,0], grid));

