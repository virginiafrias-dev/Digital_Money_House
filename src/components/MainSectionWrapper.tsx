"use client";
import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const MainSectionWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isOnSignupOrLogin = useMemo(
    () => ["/signup", "/login", "/signup/success"].includes(pathname),
    [pathname]
  );

  return (
    <main
      className={clsx(
        "grow relative overflow-y-auto bg-brand-black",
        !isOnSignupOrLogin && "md:bg-brand-green"
      )}
    >
      {children}
    </main>
  );
};

export default MainSectionWrapper;
