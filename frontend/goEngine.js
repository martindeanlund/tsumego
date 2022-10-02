class GridNode {
	
  constructor(x, y, color) {
    this.x = x;
	this.y = y;
	this.color = color;
  }
}

class Group {
	
  constructor(node) {
    this.nodes = [node];
	this.liberties = getAdjacentGridNodes(node).filter((node) => node.color == null);
  }
  
  removeLiberty(x, y) {
	this.liberties = this.liberties.filter((liberty) => !(liberty.x == x && liberty.y == y));
	if (this.liberties.length < 1) {
	  return this.capture();
	}
	return [];
  }
  
  capture() {
	var captures = [];
	this.nodes.forEach(function(node) {
		grid[node.x][node.y] = null;
		captures.push(node);
	});
    groups.splice(groups.indexOf(this), 1);
	return captures;
  }
  
  merge(newGroup) {
	  newGroup.liberties = newGroup.liberties.concat(this.liberties);
	  newGroup.nodes = newGroup.nodes.concat(this.nodes);
	  groups.splice(groups.indexOf(this), 1);
	  return newGroup;
  }
}

var grid = Array.from(Array(9), () => new Array(9));
var groups = [];
var lastLine = 'i';
var gridMax = lastLine.charCodeAt() - 'a'.charCodeAt();

function getAdjacentGridNodes(node) {
  var results = []
  if (node.x != 0)
    results.push(new GridNode(node.x - 1, node.y, grid[node.x - 1][node.y]));
  if (node.x != gridMax)
    results.push(new GridNode(node.x + 1, node.y, grid[node.x + 1][node.y]));
  if (node.y != 0)
    results.push(new GridNode(node.x, node.y -1, grid[node.x][node.y - 1]));
  if (node.y != gridMax)
    results.push(new GridNode(node.x, node.y + 1, grid[node.x][node.y + 1]));
  return results;
}

function findGroup(x, y) {
  var results = [];
  results = groups.filter(function(group) {
	  return group.nodes.filter((node) => node.x == x && node.y == y).length > 0;
  });
  if (results.length > 0) {
	  return results[0];
  }
  return null;
}

function move(char_x, char_y, color) {
  var x = char_x.charCodeAt() - 'a'.charCodeAt();
  var y = char_y.charCodeAt() - 'a'.charCodeAt();
  var captures = [];
  if (grid[x][y] != null) {
    console.log('Error!');
  } else {
    grid[x][y] = color;
	node = new GridNode(x, y, color);
	adjacents = getAdjacentGridNodes(node);
    var friends = [];
	var foes = [];
	adjacents.forEach(function(adjacent) {
	  console.log(adjacent);
	  if (adjacent.color && adjacent.color != color)
	    foes.push(findGroup(adjacent.x, adjacent.y));
	  else if (adjacent.color && adjacent.color == color)
	    friends.push(findGroup(adjacent.x, adjacent.y));
	});
		
    foes.forEach(function(foe) {
		captures = captures.concat(foe.removeLiberty(x, y));
	});
	  
    var newGroup = new Group(node);
    groups.push(newGroup);
	
    for (i=0;i<friends.length;i++) {
	  newGroup = friends[i].merge(newGroup);
	}
	
	captures = captures.concat(newGroup.removeLiberty(x, y));
	
	return captures.map((node) => "" + String.fromCharCode('a'.charCodeAt() + node.x) + String.fromCharCode('a'.charCodeAt() + node.y));
  }
}