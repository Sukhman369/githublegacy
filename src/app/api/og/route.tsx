import { ImageResponse } from 'next/og';
import { createYearlyCalendarGrid, applyPatternToCalendar } from '../../../lib/calendar-engine';
import { getThemeById } from '../../../lib/theme-config';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const text = (searchParams.get('text') || 'LEGACY').toUpperCase();
    const year = parseInt(searchParams.get('year') || `${new Date().getFullYear()}`, 10);
    const themeId = searchParams.get('theme') || 'github-dark';
    const intensityMaxCommits = parseInt(searchParams.get('intensity') || '4', 10);

    const theme = getThemeById(themeId);
    const rawGrid = createYearlyCalendarGrid(year);
    const grid = applyPatternToCalendar(rawGrid, {
      text,
      year,
      intensityMaxCommits,
      letterSpacing: 1,
      wordSpacing: 4,
      alignment: 'center',
      columnOffset: 0,
      themeId,
      drawingMode: 'select',
      drawIntensityLevel: 4,
    });

    const isDark = theme.isDark;
    const bgColor = isDark ? '#090d16' : '#f8fafc';
    const cardBgColor = isDark ? '#0d1527' : '#ffffff';
    const borderColor = isDark ? '#1e293b' : '#e2e8f0';
    const textColor = isDark ? '#f8fafc' : '#0f172a';
    const subtextColor = isDark ? '#94a3b8' : '#475569';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: bgColor,
            fontFamily: 'sans-serif',
            padding: '40px',
          }}
        >
          {/* Card Frame */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
              backgroundColor: cardBgColor,
              borderRadius: '24px',
              border: `2px solid ${borderColor}`,
              padding: '40px',
              position: 'relative',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Header branding */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                marginBottom: '30px',
                borderBottom: `1px solid ${borderColor}`,
                paddingBottom: '20px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: '32px', fontWeight: 900, color: textColor, letterSpacing: '-0.05em' }}>
                    Git<span style={{ color: '#10b981' }}>Legacy</span>
                  </span>
                  <span
                    style={{
                      marginLeft: '12px',
                      fontSize: '12px',
                      fontWeight: 700,
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      color: '#10b981',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                    }}
                  >
                    Art Canvas
                  </span>
                </div>
                <p style={{ fontSize: '15px', color: subtextColor, marginTop: '6px', fontWeight: 500 }}>
                  Design custom contribution artwork before building projects
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 800,
                    color: '#10b981',
                    textTransform: 'uppercase',
                  }}
                >
                  Pattern: &quot;{text}&quot;
                </span>
                <span
                  style={{
                    fontSize: '13px',
                    color: subtextColor,
                    marginTop: '4px',
                    fontFamily: 'monospace',
                  }}
                >
                  Target Year: {year}
                </span>
              </div>
            </div>

            {/* Calendar Canvas Graph */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                flexGrow: 1,
                gap: '3px',
                width: '100%',
                overflow: 'hidden',
              }}
            >
              {grid.weeks.map((week, wIdx) => (
                <div
                  key={wIdx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3px',
                  }}
                >
                  {week.days.map((day, dIdx) => {
                    const color = theme.levels[day.level];
                    const isYearDay = day.year === year;
                    const opacity = isYearDay ? (day.level > 0 ? 1 : 0.4) : 0.15;
                    return (
                      <div
                        key={dIdx}
                        style={{
                          width: '14px',
                          height: '14px',
                          borderRadius: '3.5px',
                          backgroundColor: color,
                          opacity: opacity,
                        }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Footer metrics info */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: '30px',
                paddingTop: '20px',
                borderTop: `1px solid ${borderColor}`,
              }}
            >
              <div style={{ display: 'flex', gap: '20px' }}>
                <span style={{ fontSize: '13px', fontWeight: 655, color: subtextColor }}>
                  🔑 Backdate Commit Simulator
                </span>
                <span style={{ fontSize: '13px', fontWeight: 655, color: subtextColor }}>
                  ⚡ Instant Script Exporter
                </span>
              </div>
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 800,
                  color: '#10b981',
                }}
              >
                gitlegacy.co
              </span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Failed to generate OG image:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
