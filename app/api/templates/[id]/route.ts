import { NextRequest, NextResponse } from 'next/server';
import { templates } from '../templateStorage';

// DELETE /api/templates/:id
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
     const { id } = params;
     const templateIndex = templates.findIndex((template) => template.id === id);
     if (templateIndex === -1) {
          return NextResponse.json({ error: `Template with ID ${id} not found` }, { status: 404 });
     }

     // Remove the template
     templates.splice(templateIndex, 1);

     return NextResponse.json({ message: `Template with ID ${id} deleted successfully` });
}

// PUT /api/templates/:id
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
     const { id } = params;
     const body = await req.json(); 

     const templateIndex = templates.findIndex((template) => template.id === id);

     if (templateIndex === -1) {
          return NextResponse.json({ error: `Template with ID ${id} not found` }, { status: 404 });
     }

     // Update the template's components
     templates[templateIndex] = { ...templates[templateIndex], components: body.components || [] };

     return NextResponse.json({ message: `Template with ID ${id} updated successfully`, template: templates[templateIndex] });
}
