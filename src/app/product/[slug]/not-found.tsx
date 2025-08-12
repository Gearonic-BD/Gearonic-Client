
import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="text-center py-20 flex flex-col gap-4 items-center">
      <h1 className="text-4xl font-bold text-danger ">Product Not Found</h1>
      <p className="text-lg text-gray-700">
        Sorry, the product you are looking for does not exist.
      </p>
      <Link
        href={"/"}
        className="bg-primary px-4 py-2 font-bold text-white rounded-sm"
      >
        {" "}
        Go to Home
      </Link>
    </div>
  );
}
