import { NextRequest, NextResponse } from 'next/server';
import { URL } from 'url';

const templates: any[] = [];

export const PUT = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const templateIndex = templates.findIndex((t) => t.id === id);

    if (templateIndex !== -1) {
        templates[templateIndex] = await req.json();
        return NextResponse.json(templates[templateIndex], { status: 200 });
    } else {
        return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }
};

export const DELETE = (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const templateIndex = templates.findIndex((t) => t.id === id);

    if (templateIndex !== -1) {
        templates.splice(templateIndex, 1);
        return NextResponse.json(null, { status: 204 });
    } else {
        return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }
};