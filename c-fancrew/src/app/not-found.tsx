import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-slate-50 text-gray-900">
      <h1 className="text-2xl font-bold">アクセスしようとしたページは表示できませんでした</h1>
      <p className="mt-4 text-2xl font-medium">Page Not Found</p>
      <Link href="/" className="mt-4 text-xl text-blue-600 hover:underline">
        Go back home
      </Link>
    </div>
  );
};

export default NotFoundPage;
