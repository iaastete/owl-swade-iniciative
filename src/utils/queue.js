export default class Queue {
    constructor(maxSize = 3) {
        this.queue = [];
        this.maxSize = maxSize;
    }
    enqueue(item) {
        // enqueue item on FRONT
        this.queue.unshift(item);
        if (this.queue.length > this.maxSize) {
            // dequeue item from BACK
            this.queue.pop();
        }
        return this;
    }
    dequeue() {
        return this.queue.pop();
    }
    clear() {
        this.queue = [];
    }
}