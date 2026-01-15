"use client";

import { useState } from "react";
import Input from "@/components/Input";
import { footerLinks } from "@/data/footerLinks";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: "#222222" }}>
            Contact Us
          </h1>
          <p className="text-sm mb-8" style={{ color: "#666666" }}>
            We would love to hear from you. Get in touch with us!
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <h2
                className="text-2xl font-semibold mb-6"
                style={{ color: "#222222" }}
              >
                Get in Touch
              </h2>

              <div className="space-y-6">
                <div>
                  <h3
                    className="text-lg font-medium mb-2"
                    style={{ color: "#ff9800" }}
                  >
                    Address
                  </h3>
                  <p style={{ color: "#666666" }}>
                    {footerLinks.companyInfo.contact.address}
                  </p>
                </div>

                <div>
                  <h3
                    className="text-lg font-medium mb-2"
                    style={{ color: "#ff9800" }}
                  >
                    Phone
                  </h3>
                  <p style={{ color: "#666666" }}>
                    <a
                      href={`tel:${footerLinks.companyInfo.contact.phone}`}
                      className="hover:underline"
                    >
                      {footerLinks.companyInfo.contact.phone}
                    </a>
                  </p>
                </div>

                <div>
                  <h3
                    className="text-lg font-medium mb-2"
                    style={{ color: "#ff9800" }}
                  >
                    Email
                  </h3>
                  <p style={{ color: "#666666" }}>
                    <a
                      href={`mailto:${footerLinks.companyInfo.contact.email}`}
                      className="hover:underline"
                    >
                      {footerLinks.companyInfo.contact.email}
                    </a>
                  </p>
                </div>

                <div>
                  <h3
                    className="text-lg font-medium mb-2"
                    style={{ color: "#ff9800" }}
                  >
                    Business Hours
                  </h3>
                  <p style={{ color: "#666666" }}>
                    Saturday to Thursday
                    <br />
                    9:00 AM - 6:00 PM (GMT+6)
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2
                className="text-2xl font-semibold mb-6"
                style={{ color: "#222222" }}
              >
                Send us a Message
              </h2>

              {submitSuccess && (
                <div
                  className="mb-6 p-4 rounded-lg"
                  style={{ backgroundColor: "#d4edda", color: "#155724" }}
                >
                  Thank you for your message! We will get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  className=""
                  label="Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                />

                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  className=""
                  label="Email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />

                <Input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  className=""
                  label="Phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                />

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#666666" }}
                    htmlFor="subject"
                  >
                    Subject <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full border border-gray-300 outline-none rounded-xs text-sb px-3 py-2 ${
                      errors.subject
                        ? "border-red-500 focus:border-red-500"
                        : "focus:border-primary"
                    }`}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="product">Product Inquiry</option>
                    <option value="order">Order Issue</option>
                    <option value="return">Return/Exchange</option>
                    <option value="complaint">Complaint</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#666666" }}
                    htmlFor="message"
                  >
                    Message <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={6}
                    placeholder="Enter your message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full border border-gray-300 outline-none rounded-xs text-sb px-3 py-2 resize-none ${
                      errors.message
                        ? "border-red-500 focus:border-red-500"
                        : "focus:border-primary"
                    }`}
                    required
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 rounded-xs text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#ff9800" }}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Us - Gadget City BD",
            description:
              "Get in touch with Gadget City BD. Contact us via phone, email, or visit our store in Dhaka, Bangladesh.",
            mainEntity: {
              "@type": "Organization",
              name: "Gadget City BD",
              telephone: "+880-1928-316192",
              email: "gadgetcitybangladesh@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Shop 128, 68-69 Concept Tower",
                addressLocality: "Greenroad",
                addressRegion: "Dhaka",
                postalCode: "1205",
                addressCountry: "BD",
              },
            },
          }),
        }}
      />
    </div>
  );
}
