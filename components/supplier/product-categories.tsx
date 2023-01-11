import style from "@/styles/modules/supplier.module.scss";
const Supp_products_Categories = () => {
  return (
    <div className={style.Supp_products_Categories}>
      <div className={style.Supp_products_Categories_Title}>
        Danh mục sản phẩm
      </div>
      <div className={style.Supp_products_Categories_List}>
        <div className={style.Supp_products_Categories_List_Item + " active"}>
          Xây dựng & vật liệu trang trí
        </div>
        <div className={style.Supp_products_Categories_List_Item}>
          Máy móc & dụng cụ công nghiệp
        </div>
        <div className={style.Supp_products_Categories_List_Item}>
          Thiết bị điện, nước & chiếu sáng
        </div>
        <div className={style.Supp_products_Categories_List_Item}>
          Thiết bị vệ sinh & phòng tắm
        </div>
        <div className={style.Supp_products_Categories_List_Item}>
          Thiết bị an ninh, pccc
        </div>
      </div>
    </div>
  );
};

export default Supp_products_Categories;
