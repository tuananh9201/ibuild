export interface IBrand {
  id: string;
  name: string;
  logo: string;
}
export interface ICategory {
  id: string;
  name_vi: string;
  parent_id?: string;
  image?: string;
  icon?: string;
  slug?: string;
  level?: number;
}
export interface ISupplier {
  id: string;
  name: string;
  city: string;
  address: string;
  geo: {
    lat: number;
    lng: number;
  };
  categories: ICategory[];
  productQuantity: {
    min: number;
    max: number;
  };
  space: string;
  brandsPopulate: IBrand[];
  phoneNumber: string;
  priceRange: string;
}

export interface IProject {
  id: number;
  name: string;
  owner: string;
  des: string;
  avata: StaticImageData;
  image: StaticImageData;
}

export interface IRetailProduct {
  id: number;
  supplier: ISupplier;
  name: string;
  image?: string;
  matched: number;
  brand: IBrand;
}
export interface INewCategory {
  id: string;
  name: string;
  slug: string;
}
export interface INews {
  id: string;
  title: string;
  date: string;
  image: string;
  des: string;
  slug: string;
  category: INewCategory;
}
export interface IBreadcrums {
  slug: string;
  title: string;
}

export type User = {
  id: number;
  full_name: string;
  email: string;
  access_token?: string;
  picture?: string;
  user_type?: string;
};

export type RulePassword = {
  message: string;
  code: string;
  success?: boolean;
  pattern: RegExp;
  init: boolean;
};
export enum SORT_BY {
  "LIEN_QUAN_NHAT" = "LIEN_QUAN_NHAT",
  "SAN_PHAM_MOI" = "SAN_PHAM_MOI",
}
export type SearchProduct = {
  keyword?: string;
  limit: number;
  skip: number;
  sort_by: string;
  max_quantity: number;
  min_quantity: number;
  max_price: number;
  min_price: number;
  category_id?: string[];
};
type ProductData = {
  category?: string[];
  model_num?: string;
  demensions?: string;
  product_name: string;
  product_image?: string;
  scrape_datetime?: string;
  available: string;
  weight?: string;
  product_id: string;
  original_price?: string;
  brand_name?: string;
  product_image_s3: string;
  technical_details?: string;
  description?: string;
  sale_price?: string;
  source_name?: string;
  source_url?: string;
  phone_number?: string;
};
type ProductImage = {
  url: string;
  image_id: string;
  s3_image_url: string;
  web_image_code: string;
};
type Supplier = {
  id: string;
  name: string;
  cname?: string;
  description?: string;
  feature_image?: string;
  city?: string;
  district?: string;
  phone?: string;
};
export type Product = {
  id: string;
  category_id: string;
  data: ProductData;
  images: ProductImage[];
  website_id: string;
  verified: string;
  created_at: string;
  updated_at: string;
  score?: number;
  supplier?: Supplier;
  is_bookmark?: boolean;
};
type Paging = {
  limit: number;
  skip: number;
  total: number;
};
export type ResponseSearchProduct = {
  paging: Paging;
  data: Product[];
};
