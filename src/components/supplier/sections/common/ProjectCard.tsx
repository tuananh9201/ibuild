import { useState } from "react";
import Image from "next/image";

import { RenderImageError } from "@/components/common";
import { IProject } from "@/lib/types";
import { getRootUrlImage } from "@/lib/utils";

import imageDefault from "@/images/default_product_image.png";
interface ProjectCartProps {
  project: IProject;
}

const ProjectCard = ({ project }: ProjectCartProps) => {
  const urlImage = getRootUrlImage(project.feature_image || "");

  return (
    <div className="p-4 bg-[#f8f9ff] rounded">
      <RenderImageError
        defaultImage={imageDefault.src}
        image={urlImage}
        width={270}
        height={150}
        title={project.name || "project"}
        className="w-full object-cover mb-4"
      />
      <h4 className="text-text-color font-medium text-xl mb-[10px] line-clamp-1">
        {project.name}
      </h4>
      <p className="text-[#646464] font-normal text-sm mb-2 line-clamp-2">
        {project.description}
      </p>
    </div>
  );
};

export default ProjectCard;
