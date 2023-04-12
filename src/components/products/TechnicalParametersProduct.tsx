interface Parameters {
  title: string;
  value: string;
}

interface TechnicalParametersProductProps {
  title?: string;
  parameters?: string;
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
        {parameters &&
          parameters
            .split("|")
            .map((parameter, idx) => <li key={idx}>{parameter}</li>)}
      </ul>
    </div>
  );
};

export default TechnicalParametersProduct;
