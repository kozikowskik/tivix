import BaseModel from "../BaseModel.js";
import API from "../../api.js";

export default class BudgetModel extends BaseModel {
    constructor(url) {
        super("/api/budgets");
    }

    getTransactions(id, success = null, error = null) {
        API.get(`${this.url}/${id}/transactions`)
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
