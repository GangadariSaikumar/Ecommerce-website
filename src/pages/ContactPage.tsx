
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Your message has been sent! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Contact Us</h1>
        <p className="text-gray-600 mb-10 text-center max-w-2xl mx-auto">
          Have questions, feedback, or need assistance? Reach out to our team and we'll get back to you as soon as possible.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="bg-tech-light-purple p-3 rounded-full mr-4">
                      <Mail className="h-5 w-5 text-tech-purple" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email Us</h3>
                      <p className="text-gray-600 mb-2">For general inquiries:</p>
                      <a href="mailto:info@techtreasure.com" className="text-tech-purple hover:underline">
                        info@techtreasure.com
                      </a>
                      <p className="text-gray-600 mt-2 mb-1">For support:</p>
                      <a href="mailto:support@techtreasure.com" className="text-tech-purple hover:underline">
                        support@techtreasure.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="bg-tech-light-purple p-3 rounded-full mr-4">
                      <Phone className="h-5 w-5 text-tech-purple" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Call Us</h3>
                      <p className="text-gray-600 mb-2">Customer Service:</p>
                      <p className="text-tech-purple font-medium">(123) 456-7890</p>
                      <p className="text-gray-600 mt-2 mb-1">Technical Support:</p>
                      <p className="text-tech-purple font-medium">(123) 456-7891</p>
                      <p className="text-sm text-gray-500 mt-3">
                        Monday - Friday: 9am - 6pm<br />
                        Saturday: 10am - 4pm<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="bg-tech-light-purple p-3 rounded-full mr-4">
                      <MapPin className="h-5 w-5 text-tech-purple" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Visit Us</h3>
                      <p className="text-gray-600 mb-2">Headquarters:</p>
                      <address className="not-italic text-gray-700">
                        123 Tech Street<br />
                        Silicon Valley, CA 94043<br />
                        United States
                      </address>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Send Us a Message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-1">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(123) 456-7890"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-1">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What is this regarding?"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      rows={5}
                      required
                    />
                  </div>
                  
                  <div className="text-center">
                    <Button 
                      type="submit"
                      className="bg-tech-purple hover:bg-tech-deep-purple text-white px-8"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Map */}
        <div className="mt-12 max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-4">Find Us</h2>
          <div className="bg-gray-200 w-full h-80 rounded-lg flex items-center justify-center">
            <div className="text-gray-500">Map placeholder</div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-medium text-tech-purple">What are your shipping options?</h3>
              <p className="text-gray-600 mt-2">
                We offer standard shipping (3-5 business days), express shipping (1-2 business days), and free shipping on orders over $100.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-medium text-tech-purple">What is your return policy?</h3>
              <p className="text-gray-600 mt-2">
                We offer a 30-day return policy for most items. Products must be in original condition with all packaging and accessories.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-medium text-tech-purple">Do you offer international shipping?</h3>
              <p className="text-gray-600 mt-2">
                Yes, we ship to most countries worldwide. International shipping costs and delivery times vary by location.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
