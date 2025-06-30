
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { templateService } from "@/services/templateService";
import { orderService } from "@/services/orderService";
import { ArrowLeft, Download, Save, Upload } from "lucide-react";
import { toast } from "sonner";
import Konva from "konva";
import { Stage, Layer, Rect, Text, Image as KonvaImage } from "react-konva";

const Customize = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [customData, setCustomData] = useState({
    name: "",
    class: "",
    school: "",
    photo: null as File | null
  });
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [photoImage, setPhotoImage] = useState<HTMLImageElement | null>(null);
  const stageRef = useRef<Konva.Stage>(null);

  useEffect(() => {
    fetchTemplate();
  }, [templateId]);

  useEffect(() => {
    if (photoUrl) {
      const img = new Image();
      img.onload = () => {
        setPhotoImage(img);
      };
      img.src = photoUrl;
    }
  }, [photoUrl]);

  const fetchTemplate = async () => {
    try {
      const response = await templateService.getTemplate(templateId!);
      setTemplate(response.data);
    } catch (error) {
      console.error("Failed to fetch template:", error);
      // Mock template data for demo
      setTemplate({
        id: templateId,
        name: "Name Sticker Template",
        width: 400,
        height: 200,
        backgroundColor: "#ffffff"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCustomData({ ...customData, photo: file });
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
    }
  };

  const handleSave = async () => {
    try {
      const customizationData = {
        templateId,
        customData,
        canvasData: stageRef.current?.toJSON()
      };
      
      await templateService.saveCustomization(templateId!, customizationData);
      toast.success("Design saved successfully!");
    } catch (error) {
      console.error("Failed to save customization:", error);
      toast.error("Failed to save design");
    }
  };

  const handleOrder = async () => {
    try {
      const orderData = {
        templateId,
        customData,
        quantity: 1,
        canvasData: stageRef.current?.toJSON()
      };
      
      await orderService.createOrder(orderData);
      toast.success("Order submitted successfully!");
      navigate("/orders");
    } catch (error) {
      console.error("Failed to create order:", error);
      toast.error("Failed to submit order");
    }
  };

  const handleDownload = () => {
    const stage = stageRef.current;
    if (stage) {
      const dataURL = stage.toDataURL({ pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `${template.name}-custom.png`;
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading template...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-xl font-semibold">Customize {template?.name}</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button onClick={handleOrder}>
              Order Now
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Controls Panel */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Customize Fields</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter name"
                  value={customData.name}
                  onChange={(e) => setCustomData({ ...customData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="class">Class</Label>
                <Input
                  id="class"
                  placeholder="Enter class"
                  value={customData.class}
                  onChange={(e) => setCustomData({ ...customData, class: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="school">School</Label>
                <Input
                  id="school"
                  placeholder="Enter school name"
                  value={customData.school}
                  onChange={(e) => setCustomData({ ...customData, school: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="photo">Upload Photo</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('photo')?.click()}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Photo
                  </Button>
                </div>
                {photoUrl && (
                  <img src={photoUrl} alt="Preview" className="w-20 h-20 object-cover rounded" />
                )}
              </div>
            </CardContent>
          </Card>

          {/* Canvas Area */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-white flex justify-center">
                <Stage
                  width={template?.width || 400}
                  height={template?.height || 200}
                  ref={stageRef}
                >
                  <Layer>
                    <Rect
                      x={0}
                      y={0}
                      width={template?.width || 400}
                      height={template?.height || 200}
                      fill={template?.backgroundColor || "#ffffff"}
                      stroke="#ddd"
                      strokeWidth={1}
                    />
                    {photoImage && (
                      <KonvaImage
                        x={300}
                        y={20}
                        width={70}
                        height={70}
                        image={photoImage}
                        draggable
                        cornerRadius={5}
                      />
                    )}
                    <Text
                      x={20}
                      y={30}
                      text={customData.name || "Your Name"}
                      fontSize={28}
                      fontFamily="Arial"
                      fontStyle="bold"
                      fill="#333"
                      draggable
                    />
                    <Text
                      x={20}
                      y={70}
                      text={customData.class || "Your Class"}
                      fontSize={18}
                      fontFamily="Arial"
                      fill="#666"
                      draggable
                    />
                    <Text
                      x={20}
                      y={100}
                      text={customData.school || "Your School"}
                      fontSize={16}
                      fontFamily="Arial"
                      fill="#666"
                      draggable
                    />
                  </Layer>
                </Stage>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Customize;
