import Link from "next/link";

const NotFoundPageForRegister = () => {
  return (
    <div className="mt-[5.5rem] flex flex-col items-center text-gray-900">
      <h1 className="text-lg font-bold">アクセスしようとしたページは表示できませんでした</h1>
      <p className="mt-4 text-lg font-medium">入力したURLが間違っているか、URLの有効期限が切れています。</p>
      <Link href="/register" className="mt-4 text-lg text-blue-600 hover:underline">
        Go back register page
      </Link>
    </div>
  );
};

export default NotFoundPageForRegister;
