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
    toString() {
        if (this.queue.length === 0) return '';
        return this.queue.map((item) => `${item.text}/${item.time}`).join(';');
    }
    from(string){
        if (string === '') return this;
        this.queue = string.split(';').map((item) => {
            const [text, time] = item.split('/');
            return { text, time };
        });
        return this;
    }
}