"use client"

import DesktopMainPic from "@/components/home/desktop/DesktopMainPic";
import { useHeader } from "@/contexts/HeaderContext/HeaderContext";
import { useEffect } from "react";

export default function Home() {
  const { setShowHeader } = useHeader();

  useEffect(() => {
    setShowHeader(true);
  })

  return (
    <>
      <DesktopMainPic/>
    </>
  )
}
