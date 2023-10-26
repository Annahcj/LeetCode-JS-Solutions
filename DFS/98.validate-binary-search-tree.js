// 98. Validate Binary Search Tree
// Given the root of a binary tree, determine if it is a valid binary search tree (BST).
// A valid BST is defined as follows:
// The left subtree of a node contains only nodes with keys less than the node's key.
// The right subtree of a node contains only nodes with keys greater than the node's key.
// Both the left and right subtrees must also be binary search trees.


// Solution 1: Iterative DFS w/ Lower/Upper Bound

// For each node, keep a lower and upper bound that its value can be.
// For the root node, the lower bound will be -Infinity and upper bound will be Infinity.

// DFS through each node,
// if the node value is smaller than or equal to lowerBound, OR bigger than or equal to the upperBound, return false.
// if node has left child, push [node.left, lowerBound, node.val]
// if node has right child, push [node.right, node.val, upperBound]

// Time Complexity: O(n) 96ms
// Space Complexity: O(n) (stack) 43.9MB
var isValidBST = function(root) {
  let stack = [[root, -Infinity, Infinity]];
  while (stack.length) {
    let [node, lowerBound, upperBound] = stack.pop();
    if (node.val <= lowerBound || node.val >= upperBound) return false;
    // left node's boundaries are lowerBound to node.val
    if (node.left) stack.push([node.left, lowerBound, node.val]);
    // right node's boundaries are node.val to upperBound
    if (node.right) stack.push([node.right, node.val, upperBound]);
  }
  return true;
};

// Solution 2: In-order Traversal 

// Do an in-order traversal of root, push all values (in-order) to an array.
// loop through the array, if it is not in ascending order, return false.
// otherwise return true.

// Time Complexity: O(n) 88ms
// Space Complexity: O(n) (call stack & arr space) 43.9MB
var isValidBST = function(root) {
  let arr = [];
  dfs(root);
  function dfs(node) {
    if (node.left) dfs(node.left);
    arr.push(node.val);
    if (node.right) dfs(node.right);
  }
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] >= arr[i - 1]) return false;
  }
  return true;
};