import { NextApiRequest, NextApiResponse } from 'next';

const templates: any[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const templateIndex = templates.findIndex((t) => t.id === id);

    if (req.method === 'PUT') {
        templates[templateIndex] = req.body;
        res.status(200).json(templates[templateIndex]);
    } else if (req.method === 'DELETE') {
        templates.splice(templateIndex, 1);
        res.status(204).end();
    }
}