import axiosClient from './axiosClient';

const productApi = {
    /*Danh sách sản phẩm */
    getListProducts(data) {
        if (!data.page || !data.limit) {
            data.limit = 10;
            data.page = 1;
        }
        const url = '/product/search';
        return axiosClient.post(url, data);
    },
    getDetailProduct(id) {
        const url = '/product/' + id;
        return axiosClient.get(url);
    },
    getProductCategory(id){
        const url = '/category/products/' + id;
        return axiosClient.post(url);
    },
    getNews(){
        const url = '/news/search';
        return axiosClient.post(url);
    },
    getNewDetail(id){
        const url = '/news/' + id;
        return axiosClient.get(url);
    },
    getRecommendProduct(id) {
        const url = '/product/recommend/' + id;
        return axiosClient.get(url);
    },
    getOrderByUser(){
        const url = '/order/user';
        return axiosClient.get(url);
    },
    getCategory(data) {
        if (!data.page || !data.limit) {
            data.limit = 10;
            data.page = 1;
        }
        const url = '/category/search';
        return axiosClient.post(url, data);
    },
    getProductsByCategory(data, id){
        if (!data.page || !data.limit) {
            data.limit = 10;
            data.page = 1;
        }
        const url = '/category/products/' + id;
        return axiosClient.post(url, data);
    },

     /*Danh sách api category */

     createCategory(data) {
        const url = '/category/search';
        return axiosClient.post(url, data);
    },
    getDetailCategory(id) {
        const url = '/categories/' + id;
        return axiosClient.get(url);
    },
    getDetailSubCategory(id) {
        const url = '/subcategories/' + id;
        return axiosClient.get(url);
    },
    getDetailLabel(id) {
        const url = '/labels/' + id;
        return axiosClient.get(url);
    },
    getDetailQuestion(id) {
        const url = '/questions/' + id;
        return axiosClient.get(url);
    },
    getListCategory() {
        const url = '/categories/';
        return axiosClient.get(url);
    },
    getQuestionSubcategory(id) {
        const url = '/questions/'+ id + "/by_subcategory/";
        return axiosClient.get(url);
    },
    getConversations(id) {
        const url = '/conversations/by_question/?question_id=' + id;
        return axiosClient.get(url);
    },
    getListSubCategory() {
        const url = '/subcategories/';
        return axiosClient.get(url);
    },
    getListLabel() {
        const url = '/labels/';
        return axiosClient.get(url);
    },
    deleteCategory(id) {
        const url = "/categories/" + id + "/";
        return axiosClient.delete(url);
    },
    deleteSubCategory(id) {
        const url = "/subcategories/" + id + "/";
        return axiosClient.delete(url);
    },
    deleteLabel(id) {
        const url = "/labels/" + id + "/";
        return axiosClient.delete(url);
    },
    searchCategory(name) {
        const params = {
            name: name.target.value
        }
        const url = '/category/searchByName';
        return axiosClient.get(url, { params });
    },

}

export default productApi;