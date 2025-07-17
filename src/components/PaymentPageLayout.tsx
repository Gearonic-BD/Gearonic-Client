import React from "react";

interface PaymentPageLayoutProps {
  children: React.ReactNode;
}

const PaymentPageLayout: React.FC<PaymentPageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-7xl px-4 sm:px-4 lg:px-8">
        {children}
      </div>
    </div>
  );
};

export default PaymentPageLayout;
