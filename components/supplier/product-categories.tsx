import style from "@/styles/modules/supplier.module.scss";
const Supp_products_Categories = () => {
  return (
    <div className="supplier-categories">
      <div className="supplier-categories_title">Danh mục sản phẩm</div>
      <div className="supplier-categories_list">
        <div className="supplier-categories_list_item active">
          Xây dựng & vật liệu trang trí
        </div>
        <div className="supplier-categories_list_item">
          Máy móc & dụng cụ công nghiệp
        </div>
        <div className="supplier-categories_list_item">
          Thiết bị điện, nước & chiếu sáng
        </div>
        <div className="supplier-categories_list_item">
          Thiết bị vệ sinh & phòng tắm
        </div>
        <div className="supplier-categories_list_item">
          Thiết bị an ninh, pccc
        </div>
      </div>
    </div>
  );
};

export default Supp_products_Categories;
