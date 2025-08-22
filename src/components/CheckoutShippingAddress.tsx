import React from "react";
import Input from "@/components/Input";
import { MapPin, Phone, User } from "lucide-react";

interface Address {
  name: string;
  mobile: string;
  zone: string;
  address: string;
  comment: string;
}

interface CheckoutShippingAddressProps {
  address: Address;
  setAddress: (address: Address) => void;
  openAddressBar: boolean;
  setOpenAddressBar: (open: boolean) => void;
  handleSaveAddress: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleCancelAddressBar: (e: React.MouseEvent<HTMLButtonElement>) => void;
  changeShipping: (shipping: number) => void;
  error: {
    name: string;
    mobile: string;
    address: string;
  };
  isSaving: boolean;
  isAddressSaved: boolean;
}

const CheckoutShippingAddress: React.FC<CheckoutShippingAddressProps> = ({
  address,
  setAddress,
  openAddressBar,
  setOpenAddressBar,
  handleSaveAddress,
  handleCancelAddressBar,
  changeShipping,
  error,
  isSaving,
}) => {
  return (
    <div className="bg-white p-4 ml:p-6 h-fit rounded-md shadow-sm">
      <h2 className="text-lg font-medium">Shipping Address</h2>
      {openAddressBar ? (
        <>
          <div className="w-full h-[1px] bg-gray-200 my-2" />
          <form action="" className="space-y-2">
            <div className="grid md:grid-cols-2 gap-2 md:gap-4">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Recipient's Full Name"
                  label="Name"
                  className="w-full"
                  required
                  error={error.name}
                  value={address.name}
                  onChange={(e) =>
                    setAddress({ ...address, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  label="Mobile"
                  className="w-full"
                  required
                  error={error.mobile}
                  value={address.mobile}
                  onChange={(e) =>
                    setAddress({ ...address, mobile: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1 md:col-span-2">
                <Input
                  type="text"
                  name="address"
                  placeholder="Full Address"
                  label="Address"
                  className="w-full"
                  required
                  error={error.address}
                  value={address.address}
                  onChange={(e) =>
                    setAddress({ ...address, address: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="zone"
                >
                  Zone
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  name="zone"
                  id="zone"
                  className="w-full border border-gray-300 outline-none rounded-xs text-sb px-3 py-2"
                  value={address.zone}
                  onChange={(e) => {
                    setAddress({ ...address, zone: e.target.value });
                    changeShipping(e.target.value === "outside" ? 120 : 60);
                  }}
                >
                  <option value="inside">Inside Dhaka City</option>
                  <option value="outside">Outside Dhaka City</option>
                </select>
              </div>
            </div>
            <div>
              <Input
                type="text"
                name="address"
                placeholder="Special Instructions (Optional)"
                label="Comment"
                className="w-full"
                required={false}
                value={address.comment}
                onChange={(e) =>
                  setAddress({ ...address, comment: e.target.value })
                }
              />
            </div>
            <div className="flex gap-4 mt-4 justify-end">
              <button
                disabled={isSaving}
                onClick={handleCancelAddressBar}
                className="w-fit block text-center bg-danger hover:bg-danger/90 cursor-pointer text-white font-medium py-2 xs:py-3 px-4 xs:px-8 rounded-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAddress}
                disabled={isSaving}
                className="w-fit block text-center disabled:opacity-80 bg-primary hover:bg-primary/90 cursor-pointer text-white font-medium py-2 xs:py-3 px-4 xs:px-8 rounded-sm transition-colors"
              >
                {isSaving ? "Saving Address..." : "Save Address"}
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="w-full flex items-center justify-center mt-1">
          {address.name && address.mobile && address.address ? (
            <div className="bg-white border border-gray-200 rounded-xl p-4 w-full shadow-xs hover:shadow-sm transition-shadow duration-200">
              <div className="flex items-start justify-between">
                <div className="flex gap-2 xs:gap-4 w-full">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                    <MapPin size={20} className="text-info" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2  w-full">
                      <div className="flex items-center gap-1 flex-1">
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          {address.zone === "inside"
                            ? "INSIDE DHAKA"
                            : "OUTSIDE DHAKA"}
                        </h3>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className="text-xs hidden xs:block text-success font-medium">
                          Delivery Available
                        </span>
                      </div>
                      <div>
                        <button
                          onClick={() => setOpenAddressBar(true)}
                          className="cursor-pointer text-info hover:underline flex items-center rounded-lg transition-colors duration-200 group"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                      {address.address}
                    </h2>
                    <div className="flex gap-2 xs:gap-4 flex-wrap">
                      <div className="flex items-center gap-1">
                        <User size={16} className="text-gray-400" />
                        <span className="text-sm font-medium text-gray-700 truncate max-w-[150px]">
                          {address.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Phone size={16} className="text-gray-400" />
                        <span className="text-sm font-medium text-gray-600">
                          {address.mobile}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setOpenAddressBar(true)}
              className="w-fit block text-center text-primary border border-primary transition-all hover:-translate-y-1 cursor-pointer font-medium py-3 px-8 rounded-sm "
            >
              + Add Shipping Address
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckoutShippingAddress;
