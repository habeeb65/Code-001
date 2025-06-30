
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { orderService } from "@/services/orderService";
import { ArrowLeft, Upload, Download, Eye } from "lucide-react";
import { toast } from "sonner";

const BulkUpload = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewData, setPreviewData] = useState<any[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Mock preview data
      setPreviewData([
        { name: "John Doe", class: "5A", photo: "https://example.com/photo1.jpg" },
        { name: "Jane Smith", class: "5B", photo: "https://example.com/photo2.jpg" },
        { name: "Mike Johnson", class: "5A", photo: "https://example.com/photo3.jpg" }
      ]);
      toast.success("File uploaded and processed successfully!");
    }
  };

  const handleBulkOrder = async () => {
    if (!selectedTemplate || !uploadedFile) {
      toast.error("Please select a template and upload a file");
      return;
    }

    setIsProcessing(true);
    try {
      const bulkData = {
        templateId: selectedTemplate,
        file: uploadedFile,
        data: previewData
      };
      
      await orderService.createBulkOrder(bulkData);
      toast.success("Bulk order submitted successfully!");
      navigate("/orders");
    } catch (error) {
      console.error("Failed to create bulk order:", error);
      toast.error("Failed to submit bulk order");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadTemplate = () => {
    // Create a sample CSV content
    const csvContent = "Name,Class,Photo URL\nJohn Doe,5A,https://example.com/photo1.jpg\nJane Smith,5B,https://example.com/photo2.jpg";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bulk_upload_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold">Bulk Upload</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>How to use Bulk Upload</CardTitle>
              <CardDescription>
                Upload a CSV file with student information to generate multiple customized materials at once
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" onClick={downloadTemplate} className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download CSV Template
                  </Button>
                  <div className="flex-1 text-sm text-gray-600">
                    Download our template to see the required format for your CSV file
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upload Form */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="template" className="text-sm font-medium">Select Template</label>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Name Stickers</SelectItem>
                    <SelectItem value="2">Student ID Cards</SelectItem>
                    <SelectItem value="3">Achievement Certificates</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="file" className="text-sm font-medium">Upload CSV File</label>
                <div className="flex items-center gap-4">
                  <Input
                    id="file"
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('file')?.click()}
                    className="flex-1"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {uploadedFile ? uploadedFile.name : "Choose File"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          {previewData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Preview ({previewData.length} records)
                </CardTitle>
                <CardDescription>
                  Review the data before submitting your bulk order
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 px-4 py-2 text-left">Name</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Class</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Photo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.slice(0, 5).map((row, index) => (
                        <tr key={index}>
                          <td className="border border-gray-200 px-4 py-2">{row.name}</td>
                          <td className="border border-gray-200 px-4 py-2">{row.class}</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">
                            {row.photo ? "✓ Photo provided" : "No photo"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {previewData.length > 5 && (
                    <p className="text-sm text-gray-600 mt-2">
                      ... and {previewData.length - 5} more records
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Submit */}
          <div className="flex justify-end">
            <Button
              onClick={handleBulkOrder}
              disabled={!selectedTemplate || !uploadedFile || isProcessing}
              size="lg"
            >
              {isProcessing ? "Processing..." : `Submit Bulk Order (${previewData.length} items)`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkUpload;
