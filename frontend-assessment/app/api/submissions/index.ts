import { NextApiRequest, NextApiResponse } from 'next';

const submissions: any[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { formId } = req.query;
        const formSubmissions = submissions.filter((s) => s.formId === formId);
        res.status(200).json(formSubmissions);
    } else if (req.method === 'POST') {
        const newSubmission = req.body;
        submissions.push(newSubmission);
        res.status(201).json(newSubmission);
    }
}