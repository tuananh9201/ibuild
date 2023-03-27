import { useState } from "react";
import Flickity from "react-flickity-component";

interface ProductType {
  id: number;
  name: string;
  icon: any;
}

interface ProductTypesProps {
  productTypes: ProductType[];
}

const flickityOptions = {
  freeScroll: true,
  freeScrollFriction: 0.05,
  contain: true,
  pageDots: false,
  prevNextButtons: true,
  initialIndex: 0,
  cellAlign: "left",
  groupCells: true,
  arrowShape:
    "M 32.3 48.3613 L 12.6413 28.7026 L 32.3 9.04397 C 34.276 7.06797 34.276 3.87597 32.3 1.89997 C 30.324 -0.0760312 27.132 -0.0760312 25.156 1.89997 L 1.89997 25.156 C -0.0760312 27.132 -0.0760312 30.324 1.89997 32.3 L 25.156 55.556 C 27.132 57.532 30.324 57.532 32.3 55.556 C 34.2253 53.58 34.276 50.3373 32.3 48.3613 Z",
};

const ProductTypes = ({ productTypes }: ProductTypesProps) => {
  const [currentActive, setCurrentActive] = useState(1);

  const handleCurrentActive = (id: number) => {
    setCurrentActive(id);
  };

  return (
    <div className="w-full">
      <Flickity
        className={"carousel mt-4"}
        elementType={"div"}
        options={flickityOptions}
        disableImagesLoaded={true}
        reloadOnUpdate={false}
        static
      >
        {productTypes.map((product) => {
          const ComponentIcon = product.icon;

          return (
            <div
              key={product.id}
              className={`flex flex-row items-center justify-center h-16 w-[213px] rounded mr-4 last:mr-0 border border-solid border-[#e6e6e6] px-[18.4px] hover:bg-primary-color group transition ${
                currentActive === product.id ? "bg-primary-color" : ""
              }`}
              onClick={() => handleCurrentActive(product.id)}
            >
              <div>
                <ComponentIcon
                  className={`group-hover:fill-white ${
                    currentActive === product.id ? "fill-white" : ""
                  }`}
                />
              </div>
              <h2
                className={`font-roboto text-base font-medium leading-[150%] not-italic pl-[11px] group-hover:text-white ${
                  currentActive === product.id ? "text-white" : ""
                }`}
              >
                {product.name}
              </h2>
            </div>
          );
        })}
      </Flickity>
    </div>
  );
};

export default ProductTypes;
