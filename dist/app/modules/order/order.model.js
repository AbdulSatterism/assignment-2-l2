"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const mongoose_1 = require("mongoose");
const product_model_1 = require("../product/product.model");
const orderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});
// check product valid or not
orderSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const productId = this.productId;
        const productData = yield product_model_1.Products.findOne({ _id: productId });
        if (!productData) {
            throw new Error('product not found');
        }
        if (productData.inventory.quantity < this.quantity) {
            throw new Error('product quantity not available');
        }
        productData.inventory.quantity -= this.quantity;
        if (productData.inventory.quantity <= 0) {
            productData.inventory.inStock = false;
        }
        next();
    });
});
//product quantity update
orderSchema.post('save', function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const productId = doc.productId;
        const productData = yield product_model_1.Products.findOne({ _id: productId });
        if (!productData) {
            throw new Error('product not found');
        }
        if (productData.inventory.quantity < doc.quantity) {
            throw new Error('product quantity not available');
        }
        productData.inventory.quantity -= doc.quantity;
        if (productData.inventory.quantity <= 0) {
            productData.inventory.inStock = false;
        }
        next();
    });
});
exports.Orders = (0, mongoose_1.model)('Orders', orderSchema);
