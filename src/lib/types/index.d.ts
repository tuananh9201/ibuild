
type IAddresses = {
  city?: string;
  wards?: string;
  district?: string;
}

export type ITab = {
  key: string
  label: string
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
  slug: string;
  date?: string;
  image?: string;
  des?: string;
  feature_image?: string;
  scrapy_time?: string;
  source_name?: string;
  soure_url?: string;
  intro?: string;
  pushlish_date?: string;
  created_at?: string;
  category?: INewCategory;
}

export interface INewsResponse {
  data: INews[];
  paging: Paging;
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
  phone_number?: string;
  address?: string;
  city_id?: string;
  district_id?: string;
  job_id?: string;
  position_id?: string;
  business_type?: string[];
  enterprise_name?: string;
  enterprise_email?: string;
  otp_code?: string;
  is_individual_business?: boolean
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
  quantity_ranges?: QuantityRange[];
  supplier_id?: string
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
  views: number,
  status?: string
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
  products: number;
  cover_image: string;
  promotion_banners: string[];
}

export type ResponseSupplierInfo = {
  data: ISupplierInfo[];
  paging: Paging
}


export type ICategoryViewer = {
  name_vi: string
  count: number
}

export type IChart = {
  root_name: string
  sum_products: number
}

export type IChartParams = {
  limit: number;
  rangeTime: number;
  supplierId: string;
}

export type IProject = {
  id: string;
  name: string;
  description: string;
  investor: string;
  feature_image?: string;
  supplier_id: string
}

export type IProjectResponse = {
  data: IProject[],
  paging: Paging
}

export type IMenuDropdown = {
  id: string,
  label: string,
  children?: IMenuDropdown[],
  isActive?: boolean
}

export type IDesignCategory = {
  id: string,
  name: string,
  parent_id: string,
  slug: string
}

export type IDesignSearch = {
  limit: number;
  skip: number;
  keyword: string;
  categoryId: string;
}

export type IDesign = {
  id: string;
  title: string;
  slug: string;
  content: string;
  images: string[];
  category_id: string;
  category: IDesignCategory
}

export type IDesignResponse = {
  data: IDesign[],
  paging: Paging
}
