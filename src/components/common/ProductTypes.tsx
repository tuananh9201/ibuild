import Image from "next/image";

interface ProductType {
  id: number;
  name: string;
  icon: string;
}

interface ProductTypesProps {
  productTypes: ProductType[];
}

const ProductTypes = ({ productTypes }: ProductTypesProps) => {
  console.log(productTypes);

  return (
    <div className="flex flex-row flex-nowrap gap-4 mt-4">
      {productTypes.map((product) => {
        return (
          <div key={product.id} className="flex py-5 pl-[35px] pr-[31px]">
            <Image
              src={product.icon}
              alt={product.name}
              className={`${product.id === 1 ? "filter-black" : ""}`}
            />
            <h2>{product.name}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default ProductTypes;
