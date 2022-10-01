class gridNode {
  constructor(x, y, color) {
    this.x = x;
	this.y = y;
	this.color = color;
  }
}

class group {
  constructor(node) {
    this.nodes = [node];
	this.liberties = getAdjacentGridNodes(node).filter(node.color == null);
  }
  
  removeLiberty(x, y) {
    for (liberty in this.liberties)
	  if (liberty.x == x && liberty.y == y)
	    liberties.remove(liberty);
	if (liberties.size() < 1)
	  this.capture();
  }
  
  capture() {
    captures(this.nodes[0].color) += this.nodes.size();
	for (node in this.nodes)
	  grid[node.x, node.y] = null;
	groups.remove(this);
  }
}

function getAdjacentGridNodes(node) {
  var results = []
  if (node.x != 0)
    results.add(new gridNode(node.x - 1, node.y, grid[node.x - 1, node.y]);
  if (node.x != 19)
    results.add(new gridNode(node.x + 1, node.y, grid[node.x + 1, node.y]);
  if (node.y != 0)
    results.add(new gridNode(node.x, node.y -1, grid[node.x, node.y - 1]);
  if (node.y != 19)
    results.add(new gridNode(node.x, node.y + 1, grid[node.x, node.y + 1]);
}
  

var grid = Array.from(Array(19), () => new Array(19));
var groups = [];

function findGroup(x, y) {
  for (group in groups)
    for (node in nodes)
	  if (node.x == x && node.y == y)
	    return group;

function move(x, y, color) {
  if (grid[x,y] == null) {
    console.log('Error!');
  } else {
    grid[x,y] = color;
	node = new Node(x, y, color);
	adjacents = getAdjacentGridNodes(node);
    var friends = [];
	var foes = [];
	for (adjacent in adjacents) {
	  if (adjacent.color && adjacent.color != color)
	    foes.add(findGroup(adjacent.x, adjacent.y);
	  else if (adjacent.color && adjacent.color == color)
	    friends.add(findGroup(adjacent.x, adjacent.y);
		
    for (foe in foes)
	  foe.removeLiberty(x, y);
	  
    var newGroup = new Group(node);
    groups.add(newGroup);
	
    for (friend in friends)
	  newGroup = friend.merge(new Group(node));
	}
	
	
  }
}