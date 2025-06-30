
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { aiImageService, GenerateTemplateParams } from "@/services/aiImageService";
import { Wand2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AITemplateGeneratorProps {
  onTemplateGenerated: (template: any) => void;
}

export const AITemplateGenerator = ({ onTemplateGenerated }: AITemplateGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [params, setParams] = useState<GenerateTemplateParams>({
    prompt: "",
    width: 400,
    height: 200,
    style: 'colorful'
  });

  const handleGenerate = async () => {
    if (!params.prompt.trim()) {
      toast.error("Please enter a prompt for the template");
      return;
    }

    setIsGenerating(true);
    try {
      const template = await aiImageService.generateTemplate(params);
      onTemplateGenerated(template);
    } catch (error) {
      console.error("Failed to generate template:", error);
      toast.error("Failed to generate AI template");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5" />
          AI Template Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="prompt">Template Description</Label>
          <Input
            id="prompt"
            placeholder="e.g., Colorful name sticker with stars and rainbow background"
            value={params.prompt}
            onChange={(e) => setParams({ ...params, prompt: e.target.value })}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="width">Width</Label>
            <Input
              id="width"
              type="number"
              value={params.width}
              onChange={(e) => setParams({ ...params, width: parseInt(e.target.value) || 400 })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Height</Label>
            <Input
              id="height"
              type="number"
              value={params.height}
              onChange={(e) => setParams({ ...params, height: parseInt(e.target.value) || 200 })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="style">Style</Label>
          <Select value={params.style} onValueChange={(value: any) => setParams({ ...params, style: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cartoon">Cartoon</SelectItem>
              <SelectItem value="realistic">Realistic</SelectItem>
              <SelectItem value="minimalist">Minimalist</SelectItem>
              <SelectItem value="colorful">Colorful</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleGenerate} 
          disabled={isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="h-4 w-4 mr-2" />
              Generate Template
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
