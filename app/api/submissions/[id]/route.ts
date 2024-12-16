import { NextRequest, NextResponse } from 'next/server';

type Submissions = {
  formId: string;
}
const submissions: Submissions[] = [];

export function GET(req: NextRequest, { params }: { params: { formId: string } }) {
  const { formId } = params;

  const formSubmissions = submissions.find((item: { formId: string}) => item.formId === formId);

  if (!formSubmissions) {
    return NextResponse.json(
      { message: `Submission with ID ${formId} not found` },
      { status: 404 }
    );
  }

  return NextResponse.json(formSubmissions);
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  submissions.push(body);
  return NextResponse.json(submissions);
}