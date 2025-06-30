
import { toast } from "sonner";

export interface GenerateTemplateParams {
  prompt: string;
  width?: number;
  height?: number;
  style?: 'cartoon' | 'realistic' | 'minimalist' | 'colorful';
}

export interface GeneratedTemplate {
  id: string;
  name: string;
  imageUrl: string;
  width: number;
  height: number;
  backgroundColor: string;
}

// Mock AI image generation service
export const aiImageService = {
  generateTemplate: async (params: GenerateTemplateParams): Promise<GeneratedTemplate> => {
    console.log('Generating AI template with params:', params);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock generated template data
    const mockTemplate: GeneratedTemplate = {
      id: `ai-template-${Date.now()}`,
      name: `AI Generated: ${params.prompt}`,
      imageUrl: `https://picsum.photos/${params.width || 400}/${params.height || 200}?random=${Date.now()}`,
      width: params.width || 400,
      height: params.height || 200,
      backgroundColor: "#ffffff"
    };
    
    toast.success("AI template generated successfully!");
    return mockTemplate;
  },

  generateBackgroundImage: async (prompt: string): Promise<string> => {
    console.log('Generating background image:', prompt);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock generated background image
    const imageUrl = `https://picsum.photos/400/200?random=${Date.now()}&blur=1`;
    
    return imageUrl;
  },

  generateDecorationElements: async (theme: string): Promise<string[]> => {
    console.log('Generating decoration elements for theme:', theme);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock decoration elements
    const decorations = [
      `https://picsum.photos/50/50?random=${Date.now()}`,
      `https://picsum.photos/40/40?random=${Date.now() + 1}`,
      `https://picsum.photos/60/60?random=${Date.now() + 2}`
    ];
    
    return decorations;
  }
};
