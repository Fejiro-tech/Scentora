"use client";
import React, { useState } from "react";
import { useProduct } from "../../app/context/ProductContext";

const ConfirmDelete = ({ setDeleteId }) => {

  const { deleteProduct } = useProduct();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded">
        <p>Are you sure?</p>

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => {
              deleteProduct(deleteId);
              setDeleteId(null);
            }}
          >
            Delete
          </button>

          <button onClick={() => setDeleteId(null)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
