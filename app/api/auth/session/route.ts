import { NextResponse } from "next/server";
import * as jose from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "who-there-session";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json({ session: null }, { status: 200 });
    }

    const secret =
      process.env.JWT_SECRET || process.env.SESSION_SECRET;
    if (!secret) {
      return NextResponse.json({ session: null }, { status: 200 });
    }

    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );
    const username = payload.username as string | undefined;
    const knockPattern = (payload.knockPattern as string | undefined) ?? "";

    if (!username) {
      return NextResponse.json({ session: null }, { status: 200 });
    }

    return NextResponse.json({
      session: { username, knockPattern },
    });
  } catch {
    return NextResponse.json({ session: null }, { status: 200 });
  }
}
