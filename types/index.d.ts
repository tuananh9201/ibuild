export interface IBrand {
  id: string;
  name: string;
  logo: string;
}
export interface ICategory {
  id: string;
  name: string;
  logo: string;
  parentId?: string;
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
