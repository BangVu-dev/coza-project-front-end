import axios from "axios";
import { setToken } from ".";
import { Product } from "../model/Product";
import { User } from "../model/User";

class ProductController {    

    async listHome(page: number, search: string, pagesize: number) {
        return axios.post('http://localhost:5000/products/', { page, search, pagesize })
            .then(res => {
                return res.data;
            })
    }

    async delete(id: string) {
        return axios.delete(`http://localhost:5000/delete/${id}`)
            .then(res => {
                return res.data;
            })
    }

    async add(product: Product) {
        return axios.post('http://localhost:5000/add/', product)
            .then(res => {
                return res.data;
            })
    }

    async update(product: Product) {
        return axios.put(`http://localhost:5000/update/${product.id}`, product)
            .then(res => {
                return res.data;
            })
    }

    async search(inputSearch: String): Promise<Product[]> {
        return axios.get(`http://localhost:5000/search/${inputSearch}`)
            .then(res => {
                return res.data;
            })
    }

    async productDetails(id: String): Promise<Product> {
        return axios.get(`http://localhost:5000/product/${id}`)
            .then(res => {
                return res.data;
            })
    }

    async delivery(dataOrder: User, idOrder: string) {
        return axios.post('http://localhost:5000/checkout/delivery', { dataOrder, idOrder })
    }

    async listOrder(page: number, pagesize: number) {
        return setToken.post('/orders', { page, pagesize })
            .then(res => {
                return res.data;
            })
    }

    async orderProduct(id: string, quantity: number, price: number) {
        return axios.post(`http://localhost:5000/carts/${id}`, { quantity, price })
    }

    async getListCart() {
        return axios.get(`http://localhost:5000/checkout/cart`)
            .then(res => {
                return res.data;
            })
    }

    async setReductionQuantity(idCart: string) {
        return axios.get(`http://localhost:5000/cart/reduction/${idCart}`)
            .then(res => {
                return res.data;
            })
    }

    async setIncreaseQuantity(idCart: string) {
        return axios.get(`http://localhost:5000/cart/increase/${idCart}`)
            .then(res => {
                return res.data;
            })
    }

    async deleteCartProduct(id: string) {
        return axios.delete(`http://localhost:5000/cart/item/${id}`)
            .then(res => {
                return res.data;
            })
    }

    async login(user: object) {
        return axios.post(`http://localhost:5000/users/login`, user)
            .then(res => {
                return res;
            })
    }

}

export const productController = new ProductController();