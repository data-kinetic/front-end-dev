export type TemplateType = {
  id: string;
  components: string[];
};

// Temporary in-memory storage for templates
export let templates: TemplateType[] = [];