import {
  Supp2,
  addressIcon,
  bgProject,
  btnBookmarkIcon,
  btnPhoneIconBlack,
  btnPhoneIconPri,
  btnPhoneIconTranf,
  toiletIcon,
} from "@/constants/images";
import Image from "next/image";
import { Tooltip } from "antd";
import { useState } from "react";
import { IProject } from "types";
import { useRouter } from "next/router";
import Link from "next/link";
import style from "@/styles/modules/project-card.module.scss";
interface ICard {
  project: IProject;
}
const ProjectCard = (props: ICard) => {
  const { project } = props;
  console.log(project);

  const router = useRouter();
  const handleClickProduct = (slug: string) => {
    router.push(`/du-an/${slug}`);
  };
  return (
    <div className={style.ProjectCard}>
      <div className={style.ProjectCard_Container}>
        <div className={style.ProjectCard_Container_FeatureImage}>
          <Image src={project.image} alt="" />
        </div>
        <div className={style.ProjectCard_Container_Info}>
          <div className={style.ProjectCard_Container_Info_Title}>
            {project.name}
          </div>
          <div className={style.ProjectCard_Container_Info_Desc}>
            {project.des}
          </div>
          <div className={style.ProjectCard_Container_Info_Avata}>
            <div className={style.ProjectCard_Container_Info_Avata_Image}>
              <Image src={project.avata} alt="" />
            </div>
            <div className={style.ProjectCard_Container_Info_Avata_Title}>
              {project.owner}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
