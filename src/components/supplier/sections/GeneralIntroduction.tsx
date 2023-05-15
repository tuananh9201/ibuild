import Image from "next/image";
import useSWR from "swr";

import ProjectCard from "./common/ProjectCard";
import { getProjectBySupplierId } from "@/lib/api/project";
import ProjectCardLoading from "@/components/project/ProjectCardLoading";

interface GeneralIntroductionProps {
  aboutSupplier: string;
  supplierId: string;
}

const GeneralIntroduction = ({
  aboutSupplier,
  supplierId,
}: GeneralIntroductionProps) => {
  const { data, isLoading } = useSWR(supplierId, getProjectBySupplierId);

  return (
    <>
      <div>{aboutSupplier}</div>
      <div className="mt-8">
        <h3 className="text-text-color font-medium text-xl mb-6">
          Dự án tham gia của nhà cung cấp
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data &&
            !isLoading &&
            data?.length > 0 &&
            data.map((d, idx) => (
              <ProjectCard key={`${d.id}-key-${idx}`} project={d} />
            ))}
        </div>
        {isLoading && (
          <ProjectCardLoading
            items={8}
            className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          />
        )}
      </div>
    </>
  );
};

export default GeneralIntroduction;
