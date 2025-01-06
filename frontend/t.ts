import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLocalStorageData } from "./src/utils/localStorageUtil";
import { PROTECTED_ROUTES } from "./constants";
import { isLoginDateExpired } from "./src/utils/commonUtils";
import { LOGGED_IN_USER } from "./src/types";

export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);

  // setting request headers
  headers.set("x-url", request.nextUrl.origin);

  // Authenticating Users
  const loginData = getLocalStorageData("vem_user");
  const isAccessingProtectedUrl = PROTECTED_ROUTES.includes(
    request.nextUrl.pathname
  );
  if (!loginData && isAccessingProtectedUrl) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const isUserAlreadyLoggedIn: LOGGED_IN_USER = JSON.parse(loginData as string);

  if (isUserAlreadyLoggedIn) {
    if (isLoginDateExpired(isUserAlreadyLoggedIn.lastLoginDate, new Date())) {
      if (isAccessingProtectedUrl) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
  }
  console.log(isUserAlreadyLoggedIn);
  return NextResponse.next({
    request: {
      headers: headers,
    },
  });
}
