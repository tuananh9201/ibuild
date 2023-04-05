import Image from "next/image";
import { useRouter } from "next/router";
import { IProject } from "src/lib/types";
interface ICard {
  project: IProject;
}
const ProjectCard = (props: ICard) => {
  const { project } = props;

  const router = useRouter();
  const handleClickProduct = (slug: string) => {
    router.push(`/du-an/${slug}`);
  };
  return (
    <div className="flex flex-col items-start p-4 gap-4 bg-[#f8f9ff] rounded-t hover:cursor-pointer hover:shadow-none">
      <div className="flex flex-col items-center p-0 gap-4 order-none self-stretch grow-0">
        <div className="flex flex-col justify-center items-center max-h-[150px] rounded-t w-full">
          <Image height={150} src={project.image} alt="" />
        </div>
        <div className="flex flex-col items-start p-0 gap-[10px]">
          <div className="not-italic font-medium text-xl">{project.name}</div>
          <div className="not-italic font-normal text-sm leading-[150%]">
            {project.des}
          </div>
          <div className="flex flex-row items-center p-0 gap-1 mr-1">
            <div className="w-6 h-6">
              <Image src={project.avata} alt="" />
            </div>
            <div className="font-roboto not-italic font-normal text-sm leading-[150%]">
              {project.owner}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
