import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLocalStorageData } from "./src/utils/localStorageUtil";
import { PROTECTED_ROUTES } from "./src/constants";
import { isLoginDateExpired } from "./src/utils/commonUtils";
import { LOGGED_IN_USER } from "./src/types";
import { ACCESS_TOKEN, VEM_USER } from "./src/constants/keys";
import { getCookieData } from "./src/utils/cookieUtil";
import { cookies } from "next/headers";

export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  const cookieStore = cookies();
  // setting request headers
  headers.set("x-url", request.nextUrl.origin);

  // Authenticating Users
  // const cookies = cookie.parse(headers.get("cookie") || "");
  const access_token = cookieStore.get(ACCESS_TOKEN)?.value;
  let vem_user = cookieStore.get(VEM_USER)?.value;

  if (vem_user) {
    vem_user = JSON.parse(vem_user);
  }
  const isAccessingProtectedUrl = PROTECTED_ROUTES.includes(
    request.nextUrl.pathname
  );

  if (!access_token && isAccessingProtectedUrl) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (access_token) {
    if (
      isLoginDateExpired(
        new Date(vem_user?.["last_login"]),
        new Date(),
        vem_user?.["expires_in"]
      ) &&
      isAccessingProtectedUrl
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  return NextResponse.next({
    request: {
      headers: headers,
    },
  });
}
