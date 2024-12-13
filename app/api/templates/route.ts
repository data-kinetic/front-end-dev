import { NextRequest, NextResponse } from 'next/server';

const templates: any[] = [];

export const GET = (req: NextRequest) => {
    return NextResponse.json(templates, { status: 200 });
};

export const POST = async (req: NextRequest) => {
    const newTemplate = await req.json();
    templates.push(newTemplate);
    return NextResponse.json(newTemplate, { status: 201 });
};