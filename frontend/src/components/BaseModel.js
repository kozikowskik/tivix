import API from "../api.js";

export default class BaseModel {
    constructor(url) {
        if (url) {
            this.url = url;
        }
        this.addResponseHandlers = this.addResponseHandlers.bind(this);
        this.all = this.all.bind(this);
        this.delete = this.delete.bind(this);
        this.save = this.save.bind(this);
        this.get = this.get.bind(this);
        this.update = this.update.bind(this);
    }

    addResponseHandlers(propmise, success, error) {
        return propmise
            .then((res) => {
                if (!(typeof success === "function")) {
                    return false;
                }
                success.apply(this, [res]);
            })
            .catch((res) => {
                if (!(typeof error === "function")) {
                    return false;
                }
                error.apply(this, [res]);
            });
    }

    all(data = {}, success = null, error = null) {
        return this.addResponseHandlers(
            API.get(this.url, data),
            success,
            error
        );
    }

    delete(id, success = null, error = null) {
        return this.addResponseHandlers(
            API.delete(`${this.url}/${id}`),
            success,
            error
        );
    }

    save(data, success = null, error = null) {
        return this.addResponseHandlers(
            API.post(this.url, data),
            success,
            error
        );
    }

    get(id, success = null, error = null) {
        return this.addResponseHandlers(
            API.get(`${this.url}/${id}`),
            success,
            error
        );
    }

    update(id, data, success = null, error = null) {
        return this.addResponseHandlers(
            API.put(`${this.url}/${id}`, data),
            success,
            error
        );
    }
}
