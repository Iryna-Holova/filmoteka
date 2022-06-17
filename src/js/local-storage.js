
export default class LocalStorage {
    constructor() {
        this.formData = {
            id: '',
            film: [],
        };
        this.LOCALSTORAGE_KEY = '';
    }

    addLocalStorage(movie, array) {

        this.formData['film'].push(movie)
        localStorage.setItem(this.LOCALSTORAGE_KEY = array, JSON.stringify(this.formData))
    }

    removeLocalStorage() {
        delete this.formData['film']
    }

    getLocalStorage() {
        let savedFormData = localStorage.getItem(this.LOCALSTORAGE_KEY);

        if (savedFormData) {
            savedFormData = JSON.parse(savedFormData);
        }
        localStorage.clear()
        return savedFormData;
    }
}