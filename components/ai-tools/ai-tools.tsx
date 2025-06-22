import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Zap, BarChart3, FileText, Eye, Settings, MessageSquare, Wrench, Brain, Plus } from "lucide-react"

export function AITools() {
  const aiTools = [
    {
      id: 1,
      name: "Chatbase Customer Bot",
      description: "AI chatbot for customer inquiries and appointment booking",
      category: "Customer Service",
      status: "Ready to Setup",
      icon: MessageSquare,
      color: "bg-blue-500",
      features: ["24/7 Customer Support", "Appointment Booking", "FAQ Handling"],
    },
    {
      id: 2,
      name: "Zapier Automation",
      description: "Automated appointment reminders and follow-ups",
      category: "Workflow",
      status: "Configure",
      icon: Zap,
      color: "bg-orange-500",
      features: ["SMS Reminders", "Email Follow-ups", "Calendar Sync"],
    },
    {
      id: 3,
      name: "Google Looker Studio",
      description: "Professional KPI dashboards and reports",
      category: "Analytics",
      status: "Available",
      icon: BarChart3,
      color: "bg-green-500",
      features: ["Real-time Dashboards", "Custom Reports", "Performance Analytics"],
    },
    {
      id: 4,
      name: "Documint Reports",
      description: "Automated invoice and service report generation",
      category: "Documents",
      status: "Ready",
      icon: FileText,
      color: "bg-purple-500",
      features: ["Auto Invoice Generation", "Service Reports", "Document Templates"],
    },
    {
      id: 5,
      name: "Obviously AI",
      description: "Predictive maintenance and inventory forecasting",
      category: "Predictive",
      status: "Setup Required",
      icon: Brain,
      color: "bg-teal-500",
      features: ["Failure Prediction", "Inventory Forecasting", "Maintenance Scheduling"],
    },
    {
      id: 6,
      name: "Parseur OCR",
      description: "Scan and digitize repair orders and invoices",
      category: "Document Processing",
      status: "Ready",
      icon: Eye,
      color: "bg-indigo-500",
      features: ["Document Scanning", "Data Extraction", "Digital Archive"],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready":
        return "bg-green-100 text-green-800"
      case "Available":
        return "bg-blue-100 text-blue-800"
      case "Configure":
        return "bg-orange-100 text-orange-800"
      case "Setup Required":
        return "bg-red-100 text-red-800"
      case "Ready to Setup":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const integrationSteps = [
    {
      step: 1,
      title: "Set up Chatbase for customer service",
      description: "Create AI chatbot for appointment booking and FAQ",
      completed: false,
    },
    {
      step: 2,
      title: "Configure Zapier automation",
      description: "Automate appointment reminders and follow-ups",
      completed: false,
    },
    {
      step: 3,
      title: "Connect Google Looker Studio",
      description: "Build professional KPI dashboards",
      completed: false,
    },
    {
      step: 4,
      title: "Implement predictive analytics",
      description: "Enable AI-powered maintenance predictions",
      completed: false,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">LOVABLE AI Tools</h1>
          <p className="text-gray-600">Enhance your workshop with AI-powered automation and insights</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Tool
        </Button>
      </div>

      {/* Quick Setup Banner */}
      <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">🚀 Quick Setup: Zapier Automation</h3>
              <p className="text-orange-100 mb-4">
                Connect your Zapier webhook to automate appointment reminders, customer follow-ups, and service
                notifications.
              </p>
              <Input
                placeholder="Enter your Zapier webhook URL..."
                className="bg-white/20 border-white/30 text-white placeholder-white/70 mb-4"
              />
            </div>
            <Button className="bg-white text-orange-600 hover:bg-gray-100 ml-4">Test Connection</Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Tools Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {aiTools.map((tool) => {
          const Icon = tool.icon
          return (
            <Card key={tool.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${tool.color}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                      <p className="text-sm text-gray-600">{tool.category}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(tool.status)}>{tool.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{tool.description}</p>
                <div className="space-y-2 mb-4">
                  {tool.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>
                <Button className="w-full" variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Integration Roadmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wrench className="w-5 h-5 mr-2" />
            Integration Roadmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {integrationSteps.map((item) => (
              <div key={item.step} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    item.completed ? "bg-green-500" : "bg-orange-500"
                  }`}
                >
                  {item.step}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <Button variant="outline" size="sm">
                  {item.completed ? "Completed" : "Start Setup"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
