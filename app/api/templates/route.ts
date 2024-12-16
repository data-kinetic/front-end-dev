import { templates } from './templateStorage'; 

// Get all templates
// GET /api/templates
export async function GET() {
  return new Response(JSON.stringify(templates), {
    headers: { "Content-Type": "application/json" },
  });
}

// Create new template
// POST /api/templates
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newTemplate = {
      id: Date.now().toString(), // Generate a unique ID
      components: body.components || []
    };

    templates.push(newTemplate); // Store the new template in memory

    return new Response(JSON.stringify(newTemplate), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating the template", error);

    return new Response(
      JSON.stringify({ error: "Failed to create the template" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
