class GridNode {
	
  constructor(x, y, color) {
    this.x = x;
	this.y = y;
	this.color = color;
  }
}

class Group {
	
  constructor(node, color) {
	this.color = color;
    this.nodes = [node];
	this.liberties = getAdjacentGridNodes(node).filter((n) => grid[n.x][n.y] != color);
  }
  
  healthCheck() {
	var openLiberty = this.liberties.find(g => grid[g.x][g.y] == null);
	if (openLiberty == null) {
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
	  this.liberties.splice(this.liberties.indexOf(this.liberties.find((lib) => lib.x == newGroup.nodes[0].x && lib.y == newGroup.nodes[0].y)), 1);
	  newGroup.liberties = newGroup.liberties.concat(this.liberties);
	  newGroup.nodes = [...new Set(newGroup.nodes.concat(this.nodes))];
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
	node = new GridNode(x, y);
	adjacents = getAdjacentGridNodes(node);
    var friends = [];
	var foes = [];
	adjacents.forEach(function(adj) {
	  if (grid[adj.x][adj.y] && grid[adj.x][adj.y] != color)
	    captures = captures.concat(findGroup(adj.x, adj.y).healthCheck());
	  else if (grid[adj.x][adj.y] && grid[adj.x][adj.y] == color)
	    friends.push(findGroup(adj.x, adj.y));
	});
	  
    var newGroup = new Group(node, color);
    groups.push(newGroup);
	
    for (i=0;i<friends.length;i++) {
	  newGroup = friends[i].merge(newGroup);
	}
	
	captures = captures.concat(newGroup.healthCheck());
	return captures.map((node) => "" + String.fromCharCode('a'.charCodeAt() + node.x) + String.fromCharCode('a'.charCodeAt() + node.y));
  }
}