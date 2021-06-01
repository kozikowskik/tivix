import BaseModel from "../BaseModel.js";

export default class BudgetModel extends BaseModel {
    constructor(url) {
        super("/api/budgets");
    }
}
