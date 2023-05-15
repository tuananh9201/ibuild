export const getCategoryImage = (name: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (baseUrl) {
    const baseURI = baseUrl.split("/api/v1");
    return `${baseURI[0]}/public/images/${name}.svg`;
  }
  return "";
};

export const getCategoriesIcon = (name: string, isActive: boolean): string => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (baseUrl) {
    let subFolder = isActive ? "icon-white" : "icon-black";
    const baseURI = baseUrl.split("/api/v1");
    return `${baseURI[0]}/public/images/icon/${subFolder}/${name}.svg`;
  }
  return "";
};

export const getRootUrlImage = (name: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  if (baseUrl) {
    const rootUrl = baseUrl.split('/api/v1')
    return `${rootUrl[0]}/public/images/${name}`
  }
  return ''
}

export const getSellImage = (name: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  if (baseUrl) {
    const rootUrl = baseUrl.split('/api/v1')
    return `${rootUrl[0]}${name}`
  }
  return ''
}