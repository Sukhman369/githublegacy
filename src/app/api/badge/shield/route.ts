import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  
  // Extract badge parameters
  const label = searchParams.get('label') || searchParams.get('name') || 'GitLegacy';
  const message = searchParams.get('message');
  const color = searchParams.get('color') || '10b981';
  const style = searchParams.get('style') || 'for-the-badge';
  const logo = searchParams.get('logo') || '';
  const logoColor = searchParams.get('logoColor') || 'white';

  // Construct target Shields.io upstream URL
  let shieldUrl = '';
  if (message) {
    shieldUrl = `https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(message)}-${color}?style=${style}`;
  } else {
    shieldUrl = `https://img.shields.io/badge/${encodeURIComponent(label)}-${color}?style=${style}`;
  }

  if (logo && logo !== 'none') {
    shieldUrl += `&logo=${encodeURIComponent(logo)}&logoColor=${encodeURIComponent(logoColor)}`;
  }

  // Telemetry logging for localhost & analytics R&D
  const referer = req.headers.get('referer') || 'Direct / Localhost';
  console.log(`[GitLegacy Badge Proxy] Rendered '${label}' badge | Referer: ${referer}`);

  try {
    const res = await fetch(shieldUrl, {
      headers: {
        'User-Agent': 'GitLegacy-Badge-Proxy/1.0',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch upstream badge: ${res.statusText}`);
    }

    const svgText = await res.text();

    return new NextResponse(svgText, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400',
        'X-Powered-By': 'GitLegacy.co',
      },
    });
  } catch (error) {
    console.error('[GitLegacy Badge Proxy Error]', error);
    // Fallback SVG if Shields.io is unreachable
    const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="28" viewBox="0 0 120 28">
      <rect width="120" height="28" rx="4" fill="#0f172a"/>
      <text x="60" y="18" fill="#10b981" font-family="-apple-system, sans-serif" font-size="11" font-weight="bold" text-anchor="middle">${label}</text>
    </svg>`;
    
    return new NextResponse(fallbackSvg, {
      headers: {
        'Content-Type': 'image/svg+xml',
      },
    });
  }
}
