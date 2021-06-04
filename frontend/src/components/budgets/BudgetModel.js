import BaseModel from "../BaseModel.js";
import API from "../../api.js";

export default class BudgetModel extends BaseModel {
    constructor(url) {
        super("/api/budgets");
    }

    getTransactions(id, success = null, error = null) {
        return this.addResponseHandlers(
            API.get(`${this.url}/${id}/transactions`),
            success,
            error
        );
    }

    shareWith(budgetsId, data, success = null, error = null) {
        return this.addResponseHandlers(
            API.post(`${this.url}/${budgetsId}/share`, data),
            success,
            error
        );
    }
}
