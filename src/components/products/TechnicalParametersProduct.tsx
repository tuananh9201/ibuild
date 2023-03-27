interface Parameters {
  title: string;
  value: string;
}

interface TechnicalParametersProductProps {
  title?: string;
  parameters: Parameters[];
}

const TechnicalParametersProduct = ({
  title,
  parameters,
}: TechnicalParametersProductProps) => {
  return (
    <div>
      <h3 className="font-roboto not-italic font-medium text-xl leading-[150%] text-text-color mb-4">
        {title}
      </h3>
      <ul className="flex flex-col gap-4">
        {parameters.map((parameter, idx) => (
          <li
            key={idx}
            className="font-roboto not-italic font-normal leading-[150%] text-text-color text-base flex flex-row items-start"
          >
            <span className="w-1/6">{parameter.title}</span>
            <span className="flex-base">{parameter.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TechnicalParametersProduct;
