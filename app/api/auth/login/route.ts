import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import * as jose from "jose";

const COOKIE_NAME = "who-there-session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = typeof body?.username === "string" ? body.username.trim() : "";
    if (!username) {
      return NextResponse.json({ error: "Username required" }, { status: 400 });
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const secret = process.env.JWT_SECRET || process.env.SESSION_SECRET;
    if (!url || !anon) {
      return NextResponse.json({ error: "Server config error" }, { status: 500 });
    }
    if (!secret) {
      return NextResponse.json(
        { error: "JWT_SECRET or SESSION_SECRET required in .env.local" },
        { status: 500 }
      );
    }

    const supabase = createClient(url, anon);
    const { data, error: dbError } = await supabase
      .from("Username")
      .select("*")
      .eq("username", username)
      .single();

    if (dbError || !data) {
      return NextResponse.json(
        { error: `No one with "${username}" exists in our neighborhood` },
        { status: 401 }
      );
    }

    const row = data as Record<string, unknown>;
    const knockPattern =
      typeof row.knock_pattern === "string"
        ? row.knock_pattern
        : typeof row.knock_rhythm === "string"
          ? row.knock_rhythm
          : Array.isArray(row.knock_pattern)
            ? (row.knock_pattern as number[]).join(",")
            : Array.isArray(row.knock_rhythm)
              ? (row.knock_rhythm as number[]).join(",")
              : "";

    const secretKey = new TextEncoder().encode(secret);
    const jwt = await new jose.SignJWT({
      username: row.username,
      knockPattern,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(secretKey);

    const res = NextResponse.json({ ok: true });
    res.cookies.set(COOKIE_NAME, jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });
    return res;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
