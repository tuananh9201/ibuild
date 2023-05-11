import Image from "next/image";
import ProjectCard from "./common/ProjectCard";

const GeneralIntroduction = () => {
  return (
    <>
      <div className="flex flex-col gap-6 mt-8">
        <p className="text-text-color font-normal text-base text-justify">
          Trung tâm vlxd Thống Nhất là thành viên của Đồng tâm group, Sản xuất
          và kinh doanh các sản phẩm vật liệu xây dựng và trang trí nội thất;
          kinh doanh bất động sản, đầu tư, khai thác cảng biển, xây dựng và cho
          thuê đất trong khu công nghiệp, cho thuê nhà xưởng, đầu tư liên doanh,
          liên kết.{" "}
        </p>
        <Image
          src="https://scontent.fhan1-1.fna.fbcdn.net/v/t1.15752-9/346009937_6169718529792741_4320169758767187888_n.png?_nc_cat=105&ccb=1-7&_nc_sid=ae9488&_nc_ohc=9EhYr9ef86IAX9-HV6Q&_nc_ht=scontent.fhan1-1.fna&oh=03_AdQT_L5R2lEGYXm6znJ1-msPeOTf-jELMZngRp0_qrJKWA&oe=6482CD5D"
          alt="demo"
          width={1280}
          height={478}
          className="w-full object-cover"
        />
        <p className="text-text-color font-normal text-base text-justify">
          Bibendum, tempus tristique felis quibusdam sint! Sequi sapiente, eos.
          Nostra minima nemo quis vehicula mollit, parturient mi provident
          torquent at laboriosam, eros voluptates quisquam! Risus dolorum
          molestias eros fusce facilisi vel cupidatat pulvinar totam fames quod
          impedit maxime vivamus massa! Nostrum repellat, per cupiditate
          ullamcorper laboriosam, ullam? Repellendus. Eos porta molestias
          accusamus! Adipisicing. Corrupti eos modi facilisi occaecati eleifend
          nibh! Tellus eiusmod litora eiusmod ex voluptas, porro omnis cubilia
          ipsum, tellus justo? Fuga pede ridiculus, pariatur voluptas! Sodales,
          penatibus quae, dictumst interdum minus magnam, morbi provident.
          Doloribus incididunt! Aut ex, voluptas dictum, consequatur suspendisse
          laboriosam sed! Eos, dolore interdum, ligula.
        </p>
      </div>
      <div className="mt-8">
        <h3 className="text-text-color font-medium text-xl mb-6">
          Dự án tham gia của nhà cung cấp
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(9)
            .fill(0)
            .map((value, idx) => (
              <ProjectCard key={idx} />
            ))}
        </div>
      </div>
    </>
  );
};

export default GeneralIntroduction;
