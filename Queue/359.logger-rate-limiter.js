// 359. Logger Rate Limiter
// Design a logger system that receives a stream of messages along with their timestamps. Each unique message should only be printed at most every 10 seconds (i.e. a message printed at timestamp t will prevent other identical messages from being printed until timestamp t + 10).


// Solution: Hashmap

// Use a hashmap to keep the next earliest allowed time where we can log a certain message.

// Time Complexity:
  // shouldPrintMessage: O(1)
// Overall Space Complexity: O(m) m = total number of messages

var Logger = function() {
  this.loggers = new Map();   
};

Logger.prototype.shouldPrintMessage = function(timestamp, message) {
  if (this.loggers.has(message) && this.loggers.get(message) > timestamp) return false;
  this.loggers.set(message, timestamp + 10);
  return true;
};

// Solution 2: Queue & Hashset

// We could save memory by removing expired messages.
// Since the timestamps come in non-decreasing order, we can just use a queue to store the messages.
// We can use a hashset to store messages we have used within the last 10 seconds.

// If a message exists in the hashset, it means that we can't log it right now.

var Logger = function() {
  this.times = [];
  this.messages = new Set();
};

Logger.prototype.shouldPrintMessage = function(timestamp, message) {
  while (this.times.length && this.times[0][0] + 10 <= timestamp) { // delete expired messages
    this.messages.delete(this.times[0][1]);
    this.times.shift();
  }
  if (this.messages.has(message)) return false;
  this.times.push([timestamp, message]);
  this.messages.add(message);
  return true;
};

// A few test cases
let logger = new Logger();
console.log(logger.shouldPrintMessage(1, "foo"));  // return true, next allowed timestamp for "foo" is 1 + 10 = 11
console.log(logger.shouldPrintMessage(2, "bar"));  // return true, next allowed timestamp for "bar" is 2 + 10 = 12
console.log(logger.shouldPrintMessage(3, "foo"));  // 3 < 11, return false
console.log(logger.shouldPrintMessage(8, "bar"));  // 8 < 12, return false
console.log(logger.shouldPrintMessage(10, "foo")); // 10 < 11, return false
console.log(logger.shouldPrintMessage(11, "foo")); // 11 >= 11, return true, next allowed timestamp for "foo" is 11 + 10 = 21