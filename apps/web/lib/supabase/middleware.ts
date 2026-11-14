import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { Database } from "./database.types";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fuitxkkmilvefbikvzje.supabase.co";
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_anon_key_for_development";

  const supabase = createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // IMPORTANT: Do NOT use supabase.auth.getSession() in middleware as it is not secure.
  // getUser() validates the token against Supabase Auth servers.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Protect Admin Routes (/admin/*)
  if (pathname.startsWith("/admin")) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname);
      url.searchParams.set("role", "admin");
      return NextResponse.redirect(url);
    }

    // Role verification: check if user is staff (via email domain or staff metadata)
    const isStaff =
      user.user_metadata?.role === "staff" ||
      user.user_metadata?.role === "admin" ||
      user.app_metadata?.role === "staff" ||
      user.email?.endsWith("@nayamarg.com") ||
      user.email === "anshrajore1266@gmail.com";

    if (!isStaff) {
      // Forbidden: redirect to home or employer portal
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("error", "unauthorized_staff_access");
      return NextResponse.redirect(url);
    }
  }

  // Protect Employer Routes (/employer/*)
  if (pathname.startsWith("/employer")) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname);
      url.searchParams.set("role", "employer");
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
