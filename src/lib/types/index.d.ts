type IAddresses = {
  city?: string;
  wards?: string;
  district?: string;
}

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

export type QuantityRange = {
  min: number;
  max: number;
}

export type SearchProduct = {
  keyword?: string;
  category_id?: string[];
  limit: number;
  skip: number;
  sort_by?: string;
  max_quantity: number;
  min_quantity: number;
  max_price: number;
  min_price: number;
  cities: string[];
  districts: string[];
  quantity_ranges?: QuantityRange[]
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
  reference_price?: number;
  brand_name?: string;
  product_image_s3: string;
  technical_details?: string;
  description?: string;
  sale_price?: string;
  source_name?: string;
  source_url?: string;
  phone_number?: string;
  quantity?: number;
  unit?: string;
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
  slug?: string;
  logo?: string
};

type CategoryInfo = {
  id: string;
  slug?: string;
  parent_id?: string;
};

export type Product = {
  id: string;
  category_id: string;
  product_name: string
  model_number?: string;
  description: string
  technical_details?: string
  unit?: string
  brand_name?: string
  images: ProductImage[];
  supplier_id: string;
  created_at: string;
  updated_at: string;
  supplier?: Supplier;
  category?: CategoryInfo;
  is_bookmark?: boolean;
  addresses?: IAddresses[],
  available: number,
  quantity: number,
  reference_price: number,
  likes: number,
  views: number
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
export type ISupplierInfo = {
  id: string;
  slug: string;
  about: string;
  website_url: string;
  name: string;
  followers?: number,
  phone?: string;
  logo: string;
  participation_date?: string;
  addresses: IAddresses[];
  is_follow: boolean;
  products: number
}

export type ResponseSupplierInfo = {
  data: ISupplierInfo[];
  paging: Paging
}

