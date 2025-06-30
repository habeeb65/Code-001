
// Mock template service for demo purposes
export const templateService = {
  getTemplates: async () => {
    console.log('Fetching templates...');
    // Mock templates data
    return {
      data: [
        {
          id: "1",
          name: "Name Stickers",
          description: "Customizable name tags for students",
          category: "stickers",
          thumbnail: null
        },
        {
          id: "2",
          name: "Student ID Cards",
          description: "Professional ID cards with photos",
          category: "id_cards",
          thumbnail: null
        },
        {
          id: "3",
          name: "Achievement Certificates",
          description: "Recognition certificates for students",
          category: "certificates",
          thumbnail: null
        }
      ]
    };
  },

  getTemplate: async (templateId: string) => {
    console.log('Fetching template:', templateId);
    // Mock single template data
    return {
      data: {
        id: templateId,
        name: "Name Sticker Template",
        width: 400,
        height: 200,
        backgroundColor: "#ffffff"
      }
    };
  },

  saveCustomization: async (templateId: string, customizationData: any) => {
    console.log('Saving customization for template:', templateId, customizationData);
    // Mock successful save
    return {
      data: {
        id: 'customization-123',
        templateId,
        status: 'saved'
      }
    };
  },

  saveAITemplate: async (templateData: any) => {
    console.log('Saving AI-generated template:', templateData);
    // Mock successful save
    return {
      data: {
        id: templateData.id,
        status: 'saved'
      }
    };
  }
};
