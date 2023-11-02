// 2089. Find Target Indices After Sorting Array
// You are given a 0-indexed integer array nums and a target element target.
// A target index is an index i such that nums[i] == target.
// Return a list of the target indices of nums after sorting nums in non-decreasing order. If there are no target indices, return an empty list. The returned list must be sorted in increasing order.


// Solution: Sorting

// 1. Sort in asc order
// 2. Get indexes of all numbers equal to target

// Time Complexity: O(n log(n)) 76ms
// Space Complexity: O(log(n)) 40.4MB
var targetIndices = function(nums, target) {
  let res = [];
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) res.push(i);
  }
  return res;
};

// A test case
console.log(targetIndices([1,2,5,2,3], 2)) // [1,2]