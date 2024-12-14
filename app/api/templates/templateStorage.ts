export type TemplateType = {
  id: string;
  components: string[];
};

// Temporary in-memory storage for templates
export const templates: TemplateType[] = [];
