import Image from "next/image";

const ProjectCard = () => {
  return (
    <div className="p-4 bg-[#f8f9ff] rounded">
      <Image
        src="https://scontent.fhan1-1.fna.fbcdn.net/v/t1.15752-9/346007622_650802636910919_7148245730399784219_n.png?_nc_cat=106&ccb=1-7&_nc_sid=ae9488&_nc_ohc=B5a5NXckQdgAX_4e5ET&_nc_ht=scontent.fhan1-1.fna&oh=03_AdRgeYjGHPPdMWC3zWj__cW3Zo_B4f6UTI5XG-VYjWCAxw&oe=6482B6FE"
        alt="project"
        width={270}
        height={150}
        className="w-full object-cover mb-4"
      />
      <h4 className="text-text-color font-medium text-xl mb-[10px] line-clamp-1">
        Vinhome Ocean Park
      </h4>
      <p className="text-[#646464] font-normal text-sm mb-2 line-clamp-2">
        Quos aliquip repudiandae condimentum congue anim vitae voluptates velit
        aliquet fugit beatae.
      </p>
      <span className="flex flex-row gap-1 line-clamp-1">
        <Image
          src="https://scontent.fhan1-1.fna.fbcdn.net/v/t1.15752-9/345862351_152704884267002_8545032716397232595_n.png?stp=cp0_dst-png&_nc_cat=109&ccb=1-7&_nc_sid=ae9488&_nc_ohc=rUBGVqo525QAX-HgGa_&_nc_ht=scontent.fhan1-1.fna&oh=03_AdRxSulc59DFaIAx0fhE9frpKCDMbrPa_s3IyVYS34nbXg&oe=6482D1E6"
          alt="logo"
          width={24}
          height={24}
          className="w-6 h-6 rounded-full"
        />
        <span className="text-text-color font-normal text-sm">Vinhomes</span>
      </span>
    </div>
  );
};

export default ProjectCard;
