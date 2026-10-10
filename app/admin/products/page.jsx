"use client";
import ProductsTable from "../../../components/admin/ProductsTable";
import EditModal from "../../../components/admin/EditModal";
import { useProduct } from "../../context/ProductContext";

const Page = () => {
  const {
    products,
    isEditOpen,
    closeEditModal,
    editProduct,
    selectedProduct,
  } = useProduct();

  // const [deleteId, setDeleteId] = useState(null);

  return (
    <div className="min-h-screen text-gray-900 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <ProductsTable products={products} showActions={true} />

        {isEditOpen && (
          <EditModal
            onClose={closeEditModal}
            selectedProduct={selectedProduct}
            editProduct={editProduct}
          />
        )}

        {/* {deleteId && (
          <ConfirmDelete deleteId={deleteId} setDeleteId={setDeleteId} />
        )} */}
      </div>
    </div>
  );
};

export default Page;
