
export default class LocalStorage {
    constructor() {
        this.formData = {
            watched: [],
            queue: [],
        };
        this.id = 'userID';
    }

    addWatched(movie, id) {
        const savedData = JSON.parse(localStorage.getItem(this.id))
        if (!savedData) {
            this.formData.watched.push(movie);
            localStorage.setItem(this.id, JSON.stringify(this.formData));
            console.log('добавлен');
        } else {
            this.formData = savedData;
            if (this.formData.watched.find((elem) => elem.id == id)) {
                console.log('уже есть');
            } else {
                this.formData.watched.push(movie);
                localStorage.setItem(this.id, JSON.stringify(this.formData));
                console.log('добавлен')
            };
        };
    }

    addQueue(movie, id) {
        const savedData = JSON.parse(localStorage.getItem(this.id))
        if (!savedData) {
            this.formData.queue.push(movie);
            localStorage.setItem(this.id, JSON.stringify(this.formData));
            console.log('добавлен');
        } else {
            this.formData = savedData;
            if (this.formData.queue.find((elem) => elem.id == id)) {
                console.log('уже есть');
            } else {
                this.formData.queue.push(movie);
                localStorage.setItem(this.id, JSON.stringify(this.formData));
                console.log('добавлен')
            };
        };
    }

    removeWatched(id) {
        const savedData = JSON.parse(localStorage.getItem(this.id));
        this.formData = savedData;
        this.formData.watched = this.formData.watched.filter((elem) => elem.id != id);
        localStorage.setItem(this.id, JSON.stringify(this.formData));
        console.log('удален');
    }

    removeQueue(id) {
        const savedData = JSON.parse(localStorage.getItem(this.id));
        this.formData = savedData;
        this.formData.queue = this.formData.queue.filter((elem) => elem.id != id);
        localStorage.setItem(this.id, JSON.stringify(this.formData));
        console.log('удален');
    }

    getWatched() {
        const savedData = JSON.parse(localStorage.getItem(this.id));
        if (!savedData) return;
        return savedData.watched;
    }

    getQueue() {
        const savedData = JSON.parse(localStorage.getItem(this.id));
        if (!savedData) return;
        return savedData.queue;
    }
}