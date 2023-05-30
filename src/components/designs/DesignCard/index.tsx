import Image from "next/image";

const DesignCard = () => {
  return (
    <div className="bg-[#F8F9FF] p-4 rounded">
      <div className="flex flex-row gap-1">
        <Image
          src="https://scontent.fhan1-1.fna.fbcdn.net/v/t1.15752-9/350356470_650872600191604_6054014735030656866_n.png?_nc_cat=100&ccb=1-7&_nc_sid=ae9488&_nc_ohc=FM9daYbmuKIAX9GH2jx&_nc_ht=scontent.fhan1-1.fna&oh=03_AdSlQDjQS9Glxv3JMPTQBM1-SuG1L9Vx4qKJVXyNB9IYWw&oe=649BD4B2"
          alt="image1"
          width={170}
          height={150}
        />
        <div className="flex-base flex flex-col justify-between">
          <Image
            src="https://scontent.fhan1-1.fna.fbcdn.net/v/t1.15752-9/350361383_1421710131980870_6008296597101239733_n.png?_nc_cat=104&ccb=1-7&_nc_sid=ae9488&_nc_ohc=lf7hvtHsKakAX80mCTJ&_nc_ht=scontent.fhan1-1.fna&oh=03_AdQT8oAYGN1Zen4jvpfXdU8DeAu_aM7P_FUELr4gKFuK1Q&oe=649BCE6C"
            alt="image2"
            width={111}
            height={75}
          />
          <Image
            src="https://scontent.fhan1-1.fna.fbcdn.net/v/t1.15752-9/350361324_643617104284465_2026340415675763683_n.png?_nc_cat=111&ccb=1-7&_nc_sid=ae9488&_nc_ohc=Lh2Lt4Y9q3cAX-3o8ok&_nc_ht=scontent.fhan1-1.fna&oh=03_AdTZdzi9Ch_27I9iB1td3StpKOWHHIRUC7Cdnyk2geP9dg&oe=649BD52F"
            alt="image2"
            width={111}
            height={75}
          />
        </div>
      </div>
      <h1 className="text-secondary-color font-medium text-xl line-clamp-2 mt-4">
        Nhà liền kề Vinhome Ocean Park 2
      </h1>
      <p className="text-[#666666] font-normal text-base line-clamp-3 mt-[10px]">
        Theo yêu cầu của gia đình anh Công, ngôi nhà diện tích 6x9m được thiết
        kế 2 tầng cho gia đình 4 thành viên...
      </p>
      <button className="text-white bg-primary-color rounded font-medium text-base mt-4 h-11 w-full">
        Xem chi tiết
      </button>
    </div>
  );
};

export default DesignCard;
