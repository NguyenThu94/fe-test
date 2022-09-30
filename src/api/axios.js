import axios from "axios"

export const axiosURL = axios.create({
  baseURL: 'https://fakestoreapi.com'
})

export const getAllProducts = async () => {
  const response = await axiosURL.get(`/products`)
  return response.data;
}

export const updateProduct = async (productId , params) => {
  const response = await axiosURL.put(`/products/${productId}`, params)
  return response.data;
}

export const deleteProduct = async (productId) => {
  const response = await axiosURL.delete(`/products/${productId}`)
  return response.data;
}
