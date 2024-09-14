"use client"

import DesktopMainPic from "@/components/home/desktop/DesktopMainPic";
import { useBarRight } from "@/contexts/BarRightContext/BarRightContext";
import { useHeader } from "@/contexts/HeaderContext/HeaderContext";
import { useEffect } from "react";

export default function Home() {
  const { setShowHeader } = useHeader();
  const { setShowBarRight } = useBarRight();

  useEffect(() => {
    setShowHeader(true);
    setShowBarRight(true);
  })

  return (
    <>
      <DesktopMainPic/>
    </>
  )
}
