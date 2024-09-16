"use client";

import { useBarRight } from "@/contexts/BarRightContext/BarRightContext";
import { useEffect } from "react";

const page = () => {
  const { setShowBarRight } = useBarRight();

  /**
   * ロード処理
   */
  useEffect(() => {
    setShowBarRight(true);
  }, []);

  return (
    <section className="w-full mt-0 mx-auto mb-14 pt-3 pr-4 pb-6 max-w-5xl text-[1.0rem] leading-7">
      <h2 className="mt-12 mr-0 mb-6 text-center font-bold text-[1.1rem]">
        個人情報保護方針
      </h2>
      <p className="text-[0.9rem] leading-7 m-0">
        株式会社ファンくる（以下、当社）は、
        業態・業種問わず、店舗の顧客満足度調査のための覆面調査員を派遣、店舗の販売促進支援、マーケティングに関するASPシステムの開発・販売を事業の核とした事業活動を行っています。
        <br />
        事業活動を通じてお客様から取得する個人情報及び当社従業者の個人情報（以下、「個人情報」という。）は、当社にとって大変重要な情報資産であり、その個人情報を確実に保護することは、当社の重要な社会的責務と認識しております。
        <br />
        したがって、当社は、事業活動を通じて取得する個人情報を、以下の方針に従って取り扱い、個人情報保護に関して、お客様及び当社従業者への「安心」の提供及び社会的責務を果たしていきます。
      </p>
    </section>
  );
};

export default page;
