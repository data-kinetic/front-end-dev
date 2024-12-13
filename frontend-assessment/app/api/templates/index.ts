import { NextApiRequest, NextApiResponse } from 'next';

const templates: any[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        res.status(200).json(templates);
    } else if (req.method === 'POST') {
        const newTemplate = req.body;
        templates.push(newTemplate);
        res.status(201).json(newTemplate);
    }
}