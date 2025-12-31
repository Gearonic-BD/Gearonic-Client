import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import { footerLinks } from "@/data/footerLinks";
import FooterLinkList from "./FooterLinkList";

const Footer = () => {
  const socialIcons = {
    Facebook: Facebook,
    Twitter: Twitter,
    Instagram: Instagram,
  };

  return (
    <footer className="bg-white border-t border-gray-100 mt-20">
      {/* Main Footer Content */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info & Logo */}
          <div className="lg:col-span-1">
            <img src="/logo2.svg" alt="Gadget City BD" className="w-28" />
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {footerLinks.companyInfo.description}
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone size={16} className="text-primary flex-shrink-0" />
                <span>{footerLinks.companyInfo.contact.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail size={16} className="text-primary flex-shrink-0" />
                <span>{footerLinks.companyInfo.contact.email}</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <MapPin
                  size={16}
                  className="text-primary flex-shrink-0 mt-0.5"
                />
                <span>{footerLinks.companyInfo.contact.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <FooterLinkList title="Quick Links" links={footerLinks.quickLinks} />

          {/* Customer Service */}
          <FooterLinkList
            title="Information"
            links={footerLinks.customerService}
          />

          {/* Categories */}
          <FooterLinkList title="Categories" links={footerLinks.categories} />
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-sm text-gray-600">
              © 2024 Gearonic BD. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {footerLinks.socialLinks.map((social) => {
                const IconComponent =
                  socialIcons[social.platform as keyof typeof socialIcons];
                return (
                  <Link
                    key={social.platform}
                    href={social.href}
                    className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <IconComponent size={18} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
