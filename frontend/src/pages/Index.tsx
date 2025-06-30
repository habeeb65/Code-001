
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, School, Palette, Download } from "lucide-react";

console.log('Index.tsx loading...');

const Index = () => {
  console.log('Index component rendering...');

  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001')
      .then(res => res.text())
      .then(data => setMessage(data))
      .catch(err => console.error('Error fetching data:', err));
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Code-001
          </h1>
          <p className="text-lg text-green-500 font-semibold mb-4">{message}</p>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Customize and order professional printed materials for schools and individuals. 
            Create stunning name stickers, ID cards, and more with our powerful design tools.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" size="lg">
                Create Account
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Individual Users</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Create personalized materials for yourself or family members
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <School className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>School Admins</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Bulk order materials for entire classes or schools
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Palette className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <CardTitle>Easy Customization</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Drag-and-drop editor with powerful design tools
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Download className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Quick Delivery</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Fast processing and delivery of your printed materials
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Template Preview Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Templates</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <span className="text-blue-600 font-semibold">Name Stickers</span>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Student Name Tags</h3>
                <p className="text-sm text-gray-600">Perfect for classrooms and events</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                <span className="text-purple-600 font-semibold">ID Cards</span>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Student ID Cards</h3>
                <p className="text-sm text-gray-600">Professional identification cards</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center">
                <span className="text-indigo-600 font-semibold">Certificates</span>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Achievement Awards</h3>
                <p className="text-sm text-gray-600">Celebrate student success</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
