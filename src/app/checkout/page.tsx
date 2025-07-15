import Breadcrumb from "@/components/Breadcrumb";
import React from "react";

const CheckoutPage = () => {
  return (
    <div className="container mx-auto max-w-[1280px]">
      <Breadcrumb items={[{ label: "Checkout", href: "/checkout" }]} />
      {/* below will be the billing information form */}
      <div>
        <h2 className="text-2xl font-bold">Billing Information</h2>
        <form action="">
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
