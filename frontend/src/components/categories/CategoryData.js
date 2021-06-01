import API from "../../api.js";


export default class CategoryModel {
    constructor() {
        this.url = "/api/categories"

        this.all = this.all.bind(this);
    }

    all(data={}, success=null, error=null) {
        API.get(this.url, data).then((res) => {
            if (!(typeof success === 'function')) {
                return false;
            }
            success.apply(null, [res]);
        }).catch((err) => {
            if (!(typeof error === 'function')) {
                return false;
            }
            error.apply(null, error);
        });
    }

    delete(id, success=null, error=null) {
        API.delete(`${this.url}/${id}`).then((res) => {
            if (!(typeof success === 'function')) {
                return false;
            }
            success.apply(null, [res, this]);
        }).catch((err) => {
            if (!(typeof error === 'function')) {
                return false;
            }
            error.apply(null, error);
        });

    }
}
