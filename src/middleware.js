import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.url;
  const parsedURL = new URL(url);
  // Get the domain (hostname)
  const domain = parsedURL.hostname;
  console.log(domain, "domain");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("domain", domain);

  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });

  return response;
}
