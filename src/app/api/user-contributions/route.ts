import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username') || searchParams.get('user');

  if (!username) {
    return NextResponse.json({ error: 'Username parameter is required' }, { status: 400 });
  }

  const cleanUser = username.trim().replace(/^@/, '');

  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${cleanUser}`, {
      headers: { 'User-Agent': 'GitLegacy-App/1.0' },
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    } else {
      return NextResponse.json(
        { error: `User @${cleanUser} not found or GitHub API unavailable` },
        { status: res.status }
      );
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to fetch contributions' },
      { status: 500 }
    );
  }
}
