import BaseModel from "../BaseModel.js";

export default class TransactionModel extends BaseModel {
    constructor() {
        super(`/api/transactions`);
    }
}
