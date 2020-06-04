const { Engine, Render, Runner, World, Bodies, } = Matter;
const engine = Engine.create();
const { world } = engine;

//создаем канвас область
const cells = 3;
const width = 600;
const height = 600;

const render = Render.create({
	element: document.body,
	engine: engine,
	options: {
		wireframes: false,
		width: width,
		height: height
	}

});

Render.run(render);
Runner.run(Runner.create(), engine);


//создаем прямоугольник
//walls
const walls = [
	Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true }),
	Bodies.rectangle(width / 2, height, width, 40, { isStatic: true }),
	Bodies.rectangle(0, height / 2, 40, height, { isStatic: true }),
	Bodies.rectangle(width, height / 2, 40, width, { isStatic: true }),
];

World.add(world, walls);

//!MAZE GENERATION

const shuffle = (arr)=>{
	let counter = arr.length;
	while(counter> 0){
		const index = Math.floor(Math.random()*counter);
		counter--;
		const temp = arr [counter];
		arr[counter] = arr [index];
		arr[index] = temp;
	}
	return arr;
}
/*
|_|_|_|
|_|_|_|
|_|_|_|
*/
const grid = Array(cells).fill(null).map(() => Array(cells).fill(false));

const verticals = Array(cells).fill(null).map(() => Array(cells - 1).fill(false))
const horizontals = Array(cells - 1).fill(null).map(() => Array(cells).fill(false))

const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

const stepThroughCell = (row, column) => {
	// If i have visted the cell at [row, column], then return
	if (grid[row][column]) {
		return;
	}
	// Mark this cell as being visited
	grid[row][column] = true;
	// Assemble randomly-ordered list of neighbors
	const neighbors = shuffle([
		[row - 1, column, 'up'],
		[row, column + 1, 'right'],
		[row + 1, column, 'down'],
		[row, column - 1, 'left']
	]);
	// For each neighbor....

	for(let neighbor of neighbors){
		const [nextRow, nextColumn, direction] = neighbor;
		// See if that neighbor is out of bounds
		if(nextRow<0|| nextRow>=cells || cells || nextColumn <0 || nextColumn >= cells){
			continue;
		}
		// If we have visited that neighbor, continue to next neighbor
		if(grid[nextRow][nextColumn]){
			continue;
		}
		// Remove a wall from either horizontals or verticals

		if(direction === 'left'){
			verticals[row][column-1]=true;
		}else if(direction==='right'){
			verticals[row][column] = true;
		}

	}
	// Visit that next cell 
}


stepThroughCell(startRow, startColumn)
console.log(grid)

