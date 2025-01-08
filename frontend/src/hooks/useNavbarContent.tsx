import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getPathBasedNavbarComponents } from "../utils/componentUtil";

export const useNavbarContent = () => {
  const [conditionalComponentList, setConditionalComponentList] =
    useState<null | Array<React.ReactNode>>(null);

  const { pathname = "" } = useRouter();

  useEffect(() => {
    setConditionalComponentList(getPathBasedNavbarComponents(pathname));
  }, [pathname]);

  return { conditionalComponentList };
};
