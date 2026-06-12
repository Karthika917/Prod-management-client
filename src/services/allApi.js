import commonApi from "./commonApi";
import baseUrl from "./base_url";

// signupApi
export const signupApi = async (data) => {
  return await commonApi(`${baseUrl}/signup`, 'POST', data)
}

// loginApi
export const loginApi = async (data) => {
  return await commonApi(`${baseUrl}/login`, 'POST', data)
}

// addCategoryApi
export const addCategoryApi = async (data) => {
  const header = {
    "Authorization": `Token ${sessionStorage.getItem('token')}`
  }
  return await commonApi(`${baseUrl}/add-category`, "POST", data, header);
}

// getCategoryApi
export const getCategoryApi = async () => {
  const header = {
    "Authorization": `Token ${sessionStorage.getItem('token')}`
  }
  return await commonApi(`${baseUrl}/get-category`, "GET", {}, header);
}

// addSubcategoryApi
export const addSubcategoryApi = async (data) => {
  const header = {
    "Authorization": `Token ${sessionStorage.getItem('token')}`
  }
  return await commonApi(`${baseUrl}/add-subcategory`, 'POST', data, header)
}

// getsubcategoryApi
export const getsubcategoryApi = async () => {
  const header = {
    "Authorization": `Token ${sessionStorage.getItem('token')}`
  }
  return await commonApi(`${baseUrl}/get-subcategory`, 'GET', {}, header)
}

// addProductApi
export const addProductApi = async (formData) => {
  const header = {
    "Authorization": `Token ${sessionStorage.getItem('token')}`,
    "Content-Type": "multipart/form-data",
  };
  return await commonApi(`${baseUrl}/add-product`, "POST", formData, header);
}

// getProductbyIdApi
export const getProductsApi = async () => {
  const header = {
    "Authorization": `Token ${sessionStorage.getItem('token')}`,
  };
  return await commonApi(`${baseUrl}/get-products`, "GET", {}, header)
};

// getProductbyIdApi
export const getProductbyIdApi = async (id) => {
  const header = {
    "Authorization": `Token ${sessionStorage.getItem('token')}`,
  }
  return await commonApi(`${baseUrl}/product/${id}`, 'GET', {}, header)
}


// editproductApi
export const updateProductApi = async (id, formData) => {
  const header = {
    "Authorization": `Token ${sessionStorage.getItem("token")}`,
    "Content-Type": "multipart/form-data",
  };
  return await commonApi(`${baseUrl}/product/${id}`, "PUT", formData, header);
};