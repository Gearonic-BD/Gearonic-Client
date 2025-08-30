import Breadcrumb from "@/components/Breadcrumb";
import ProductDescription from "@/components/ProductDescription";
import ProductDetailsCard from "@/components/ProductDetailsCard";
import ProductQuestions from "@/components/ProductQuestions";
import ProductReviews from "@/components/ProductReviews";
import ProductSpecifications from "@/components/ProductSpecifications";
import RelatedProducts from "@/components/RelatedProducts";
import { Product } from "@/types/types";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  return {
    title: product?.title || "Product Not Found",
    description: product?.description || "Check out our latest products.",
  };
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${slug}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data.product;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

const ProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return notFound();
  }
  const breadcrumbItems = [
    { label: "Products", href: "/products" },
    {
      label: product.category,
      href: `/products/${product.category.toLowerCase()}`,
    },
    {
      label: product.brand,
      href: `/products/${product.category.toLowerCase()}/${product.brand.toLowerCase()}`,
    },
    { label: product.title },
  ];
  return (
    <>
      <section className="container mx-auto max-w-[1280px] px-4 sm:px-6">
        <Breadcrumb items={breadcrumbItems} />
      </section>

      <section className="container mx-auto max-w-[1280px] px-4 sm:px-6 pb-4 md:pb-8">
        <ProductDetailsCard product={product} />
      </section>
      <section className="container mx-auto max-w-[1280px] px-4 sm:px-6 pb-4 md:pb-8">
        <ProductSpecifications specifications={product.specifications} />
      </section>
      <section className="container mx-auto max-w-[1280px] px-4 sm:px-6 pb-4 md:pb-8">
        <ProductDescription html={product.description} />
      </section>
      <section className="container mx-auto max-w-[1280px] px-4 sm:px-6 pb-4 md:pb-8">
        <ProductQuestions
          questions={product.questions}
          productId={product.id}
        />
      </section>
      <section className="container mx-auto max-w-[1280px] px-4 sm:px-6 pb-4 md:pb-8">
        <ProductReviews
          reviews={product.reviews}
          averageRating={product.rating}
          totalReviews={product?.reviews?.length}
        />
      </section>
      <section className="container mx-auto max-w-[1280px] px-4 sm:px-6 pb-4 md:pb-8">
        <RelatedProducts id={product.id} />
      </section>
    </>
  );
};

export default ProductPage;
