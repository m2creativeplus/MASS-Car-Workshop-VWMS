"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Download, 
  Share2, 
  Layout, 
  Image as ImageIcon, 
  FileText, 
  Instagram, 
  Linkedin, 
  CheckCircle2,
  Palette,
  Layers,
  MonitorSmartphone,
  Copy
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

export function ExportCenter() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  return (
    <div className="space-y-6 p-1 max-w-[1600px] mx-auto">
      
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-orange-500/10 to-transparent p-6 rounded-2xl border border-orange-100 dark:border-orange-500/20"
      >
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Share2 className="w-8 h-8 text-orange-500" />
            Export Center
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Generate professional assets for your portfolio, social media, and case studies. 
            Select a template to auto-populate with your project data.
          </p>
        </div>
        <div className="flex gap-2">
           <Badge variant="secondary" className="px-3 py-1 text-sm bg-white dark:bg-slate-800 shadow-sm border">
             8 Platforms Supported
           </Badge>
        </div>
      </motion.div>

      {/* Main Content */}
      <Tabs defaultValue="templates" className="w-full space-y-8">
        <div className="flex justify-center">
            <TabsList className="grid grid-cols-4 w-full max-w-3xl h-12 bg-muted/50 p-1">
            <TabsTrigger value="platforms" className="text-sm">Platforms</TabsTrigger>
            <TabsTrigger value="templates" className="text-sm">Templates</TabsTrigger>
            <TabsTrigger value="content" className="text-sm">Content</TabsTrigger>
            <TabsTrigger value="export" className="text-sm">Export</TabsTrigger>
            </TabsList>
        </div>

        <TabsContent value="templates" className="space-y-6">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Behance Template Card */}
            <motion.div variants={itemVariants}>
              <Card 
                className={`h-full cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${selectedTemplate === 'behance' ? 'border-blue-500 ring-4 ring-blue-500/10' : 'border-transparent hover:border-blue-200'}`}
                onClick={() => setSelectedTemplate('behance')}
              >
                <CardHeader className="bg-blue-50 dark:bg-blue-900/20 rounded-t-xl pb-8 border-b border-blue-100 dark:border-blue-900/50">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-blue-600/30">
                    <span className="text-white font-bold text-xl">Be</span>
                  </div>
                  <CardTitle className="text-blue-900 dark:text-blue-100">Behance Full Project</CardTitle>
                  <CardDescription className="text-blue-700 dark:text-blue-300">
                    Complete case study presentation layout
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-3">
                    {[
                        "Cover - Title & Mockups",
                        "Problem Statement",
                        "Design System Showcase",
                        "UI Components Grid",
                        "Mobile & Desktop Mockups",
                        "Interactive Prototypes",
                        "Credits & Tools Used"
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium">
                                {i + 1}
                            </span>
                            {item}
                        </div>
                    ))}
                </CardContent>
                <CardFooter>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Use Template
                    </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Instagram Carousel Card */}
             <motion.div variants={itemVariants}>
              <Card 
                className={`h-full cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${selectedTemplate === 'instagram' ? 'border-pink-500 ring-4 ring-pink-500/10' : 'border-transparent hover:border-pink-200'}`}
                onClick={() => setSelectedTemplate('instagram')}
              >
                <CardHeader className="bg-pink-50 dark:bg-pink-900/20 rounded-t-xl pb-8 border-b border-pink-100 dark:border-pink-900/50">
                  <div className="w-12 h-12 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-pink-500/30">
                    <Instagram className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-pink-900 dark:text-pink-100">Instagram Carousel</CardTitle>
                  <CardDescription className="text-pink-700 dark:text-pink-300">
                    10-slide engaging social media story
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-3">
                    {[
                        "Hook Slide - App Preview",
                        "The Problem (Pain Points)",
                        "The Solution (Hero Shot)",
                        "Key Features (3 slides)",
                        "Design Details (Typography/Color)",
                        "Testimonial / Social Proof",
                        "Call to Action"
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium">
                                {i + 1}
                            </span>
                            {item}
                        </div>
                    ))}
                </CardContent>
                <CardFooter>
                    <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                        Use Template
                    </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Case Study Article Card */}
             <motion.div variants={itemVariants}>
              <Card 
                className={`h-full cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${selectedTemplate === 'article' ? 'border-slate-500 ring-4 ring-slate-500/10' : 'border-transparent hover:border-slate-200'}`}
                onClick={() => setSelectedTemplate('article')}
              >
                <CardHeader className="bg-slate-50 dark:bg-slate-900/50 rounded-t-xl pb-8 border-b border-slate-100 dark:border-slate-800">
                  <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-slate-800/30">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-slate-900 dark:text-slate-100">Case Study Article</CardTitle>
                  <CardDescription className="text-slate-700 dark:text-slate-300">
                    Long-form markdown for blogs/Medium
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-3">
                    {[
                        "Hero Image Generation",
                        "Challenge Overview",
                        "Research & Discovery",
                        "Design Process Walkthrough",
                        "Final Solution Showcase",
                        "Results & Impact metrics",
                        "Conclusion"
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium">
                                {i + 1}
                            </span>
                            {item}
                        </div>
                    ))}
                </CardContent>
                <CardFooter>
                    <Button className="w-full bg-slate-800 hover:bg-slate-900 text-white">
                        Use Template
                    </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
          >
             <Button variant="outline" className="h-24 flex flex-col gap-2 hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/20">
                <ImageIcon className="h-6 w-6 text-slate-500" />
                <span>Export Assets</span>
             </Button>
             <Button variant="outline" className="h-24 flex flex-col gap-2 hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/20">
                <Copy className="h-6 w-6 text-slate-500" />
                <span>Copy Brand Colors</span>
             </Button>
             <Button variant="outline" className="h-24 flex flex-col gap-2 hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/20">
                <MonitorSmartphone className="h-6 w-6 text-slate-500" />
                <span>Device Mockups</span>
             </Button>
             <Button variant="outline" className="h-24 flex flex-col gap-2 hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/20">
                <Layout className="h-6 w-6 text-slate-500" />
                <span>Grid Layouts</span>
             </Button>
          </motion.div>

        </TabsContent>
      </Tabs>
    </div>
  )
}
