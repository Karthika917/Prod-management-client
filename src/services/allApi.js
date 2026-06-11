import commonApi from "./commonApi";
import baseUrl from "./base_url";

export const signupApi = async(data)=>{
    return await commonApi(`${baseUrl}/signup`,'POST',data)
}

export const loginApi = async(data)=>{
    return await commonApi(`${baseUrl}/login`,'POST',data)
}

export const addCategoryApi = async(data) =>{
       const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
     return await commonApi(`${baseUrl}/add-category`, "POST", data,header);
}

export const getCategoryApi = async() => {
       const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
     return await commonApi(`${baseUrl}/get-category`, "GET",{},header);
}

export const addSubcategoryApi = async(data)=>{
     const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${baseUrl}/add-subcategory`,'POST',data,header)
}

export const getsubcategoryApi = async()=>{
     const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${baseUrl}/get-subcategory`,'GET',{},header)
}
 
export const addProductApi = async (formData) => {
  const header = {
    "Authorization": `Token ${sessionStorage.getItem('token')}`,
    "Content-Type": "multipart/form-data",
  };
  return await commonApi(`${baseUrl}/add-product`, "POST", formData, header);
}

export const getProductsApi = async () => {
  const header = {
    "Authorization": `Token ${sessionStorage.getItem('token')}`,
  };
  return await commonApi(`${baseUrl}/get-products`, "GET", {}, header)
};

export const getProductbyIdApi = async(id)=>{
     const header = {
    "Authorization": `Token ${sessionStorage.getItem('token')}`,
  }
  return await commonApi(`${baseUrl}/product/${id}`,'GET',{},header)
}