import BaseModel from "../BaseModel.js";

export default class CategoryModel extends BaseModel {
    constructor(url) {
        super("/api/categories");
    }
}
