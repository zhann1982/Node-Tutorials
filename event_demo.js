const EventEmitter = require('events');

// Create class
class MyEmitter extends EventEmitter { }

// Init object
const myEmitter = new MyEmitter();

// Event listener
let counter = 0;
myEmitter.on('event', () => console.log(`Event fired! - ${++counter}`));

// Init event
myEmitter.emit('event');
myEmitter.emit('event');
myEmitter.emit('event');
myEmitter.emit('event');

