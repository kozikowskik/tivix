import API from "../api.js";

export default class BaseModel {
    constructor(url) {
        if (url) {
            this.url = url;
        }
        this.all = this.all.bind(this);
        this.delete = this.delete.bind(this);
        this.save = this.save.bind(this);
        this.get = this.get.bind(this);
        this.update = this.update.bind(this);
    }

    all(data = {}, success = null, error = null) {
        API.get(this.url, data)
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

    delete(id, success = null, error = null) {
        API.delete(`${this.url}/${id}`)
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

    save(data, success = null, error = null) {
        API.post(this.url, data)
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

    get(id, success = null, error = null) {
        API.get(`${this.url}/${id}`)
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

    update(id, data, success = null, error = null) {
        API.put(`${this.url}/${id}`, data)
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
}
