import React from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "الرئيسية", href: "/" },
    { label: "المنتجات", href: "/ProductWeb" },
    { label: "الأقسام", href: "/ategorieWeb" },
    { label: "من نحن", href: "/about" },
    { label: "اتصل بنا", href: "/contact" },
  ];

  const companyLinks = [
    { label: "سياسة الخصوصية" },
    { label: "شروط الاستخدام" },
    { label: "سياسة الاسترجاع" },
    { label: "الشحن والتوصيل" },
    { label: "الأسئلة الشائعة" },
  ];

  const contactInfo = [
    { icon: Phone, text: "+966 50 000 0000" },
    { icon: Mail, text: "info@ecommerce.com" },
    { icon: MapPin, text: "الرياض، المملكة العربية السعودية" },
  ];

  const socialLinks = [
    { icon: Facebook, label: "Facebook" },
    { icon: Twitter, label: "Twitter" },
    { icon: Instagram, label: "Instagram" },
    { icon: Linkedin, label: "LinkedIn" },
  ];

  return (
    <footer className="bg-white text-gray-900 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-[10px] bg-gray-900 flex items-center justify-center">
                <MdOutlineShoppingCart className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                N7LY
              </span>
            </Link>
            <p className="mb-6 text-sm text-gray-600 leading-relaxed">
              منصة تجارة إلكترونية رائدة توفر أفضل المنتجات والخدمات لعملائنا
              الكرام بأسعار منافسة وجودة عالية.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-all hover:bg-black hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 text-lg font-bold text-gray-900">
              روابط سريعة
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-600 transition-colors hover:text-black"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-6 text-lg font-bold text-gray-900">الشركة</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-600 transition-colors hover:text-black"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-6 text-lg font-bold text-gray-900">تواصل معنا</h4>
            <ul className="space-y-4">
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <li key={index} className="flex gap-3 text-gray-600">
                    <Icon className="h-5 w-5 flex-shrink-0 text-gray-600 mt-0.5" />
                    <span className="text-sm">{contact.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Separator */}
        <Separator className="my-8 bg-gray-200" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-600">
            © {currentYear} N7LY. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-6">
            <Link className="text-sm text-gray-600 transition-colors hover:text-black">
              الخصوصية
            </Link>
            <Link className="text-sm text-gray-600 transition-colors hover:text-black">
              الشروط
            </Link>
            <Link className="text-sm text-gray-600 transition-colors hover:text-black">
              خريطة الموقع
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
