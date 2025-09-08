import { axiosInstance } from "../config/axiosInstance";

export const fetchAllProducts = async () => {
  try {
    let response = await axiosInstance.get("/product");

    if (response) {
      return response?.data?.products;
    }
  } catch (error) {
    console.log("error");
  }
};

export const fetchProductDetail = async (id) => {
  try {
    let res = await axiosInstance.get(`/product/product-details/${id}`);
    if (res) {
      return res.data.product;
    }
  } catch (error) {
    console.log(error);
  }
};
