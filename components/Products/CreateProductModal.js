import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { checkIfValid } from "../../utils/productData";
import useCreateProduct from "../../hooks/products/useCreateProduct";
import { addToastNotify } from "../../utils/toastFunc";

export default function CreateProductModal({ open, setOpen, products }) {
  const cancelButtonRef = useRef(null);

  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [marketPrice, setMarketPrice] = useState("");
  const [unit, setUnit] = useState("Kilogram");

  const [isValid, setIsValid] = useState(null);

  const mutation = useCreateProduct();

  const handleSubmit = (event) => {
    event.preventDefault();
    const valid = checkIfValid(products, productName);
    setIsValid(valid);

    // check if the name is valid
    if (valid === false) return;

    const product = {
      name: productName,
      type: productType,
      marketPrice,
      unit,
    };

    mutation.mutate(product, {
      onSuccess: () => {
        setOpen(false);
        addToastNotify();
      },
    });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-ibm leading-6 font-medium text-gray-700"
                      >
                        Create Product
                      </Dialog.Title>

                      <div className="mb-6 mt-5 font-poppins">
                        {/* Product Name Input */}
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Product Name{" "}
                          <span
                            className={`font-medium text-red-500 ${
                              isValid === false ? "inline" : "hidden"
                            }`}
                          >
                            (Product already exists!)
                          </span>
                        </label>
                        <input
                          type="text"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full mb-5 p-2.5"
                          placeholder="Eg: Wheat"
                          required
                          minLength={3}
                          maxLength={20}
                        />

                        {/* Product Type */}
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Product Type
                        </label>
                        <input
                          type="text"
                          value={productType}
                          onChange={(e) => setProductType(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full mb-5 p-2.5"
                          placeholder="Eg: Crop"
                          required
                          minLength={3}
                          maxLength={15}
                        />

                        {/* Market Price */}
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Market Price
                        </label>
                        <input
                          type="number"
                          value={marketPrice}
                          onChange={(e) => setMarketPrice(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full mb-5 p-2.5"
                          required
                          min={10}
                          max={100000}
                        />

                        {/* Unit */}
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Unit
                        </label>
                        <div className="mb-3 xl:w-96">
                          <select
                            className="form-select text-sm appearance-none block w-[100%] sm:w-[60%] font-normal text-gray-700 bg-clip-padding bg-no-repeat border border-solid bg-gray-50 rounded transition ease-in-out m-0 focus:text-gray-700 focus:border-blue-600 focus:outline-none"
                            aria-label="Select a unit"
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                          >
                            <option value="Kilogram">Kilogram</option>
                            <option value="Gram">Gram</option>
                            <option value="Litre">Litre</option>
                            <option value="Piece">Piece</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Create
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    ref={cancelButtonRef}
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
