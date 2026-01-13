import { NextRequest, NextResponse } from 'next/server';

const API_BASE = 'http://localhost:3333';

interface Params {
  path: string[];
}

interface RouteContext {
  params: Promise<Params>;
}

export async function GET(req: NextRequest, { params }: RouteContext) {
  return proxy(req, (await params).path);
}

export async function POST(req: NextRequest, { params }: RouteContext) {
  return proxy(req, (await params).path);
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  return proxy(req, (await params).path);
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  return proxy(req, (await params).path);
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
  return proxy(req, (await params).path);
}

async function proxy(req: NextRequest, path: string[]) {
  const url = `${API_BASE}/${path.join('/')}${req.nextUrl.search}`;

  // TODO handle ECONNREFUSED
  const res = await fetch(url, {
    method: req.method,
    headers: {
      // Forward cookies
      cookie: req.headers.get('cookie') ?? '',
      // Forward content type, etc.
      'content-type': req.headers.get('content-type') ?? '',
    },
    body: req.method === 'GET' ? undefined : await req.text(),
  });

  // If access token expired, attempt refresh
  if (res.status === 401) {
    const refreshed = await refreshToken(req);
    if (!refreshed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return proxy(req, path); // retry once
  }

  return new NextResponse(res.body, {
    status: res.status,
    headers: res.headers,
  });
}

async function refreshToken(req: NextRequest): Promise<boolean> {
  const res = await fetch(`${API_BASE}/auth/refresh`, {
    method: 'POST',
    headers: {
      cookie: req.headers.get('cookie') ?? '',
    },
  });

  return res.ok;
}
