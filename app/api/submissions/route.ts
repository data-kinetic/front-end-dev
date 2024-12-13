import { NextRequest, NextResponse } from 'next/server';
import { URL } from 'url';

const submissions: any[] = [];

export const GET = (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const formId = searchParams.get('formId');
    const formSubmissions = submissions.filter((s) => s.formId === formId);
    return NextResponse.json(formSubmissions, { status: 200 });
};

export const POST = async (req: NextRequest) => {
    const newSubmission = await req.json();
    submissions.push(newSubmission);
    return NextResponse.json(newSubmission, { status: 201 });
};