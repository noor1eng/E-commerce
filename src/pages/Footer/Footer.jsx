import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: t("Home"), href: "/" },
    { label: t("Products"), href: "/ProductWeb" },
    { label: t("Categories"), href: "/ategorieWeb" },
    { label: t("About Us"), href: "/about" },
    { label: t("Contact Us"), href: "/contact" },
  ];

  const companyLinks = [
    { label: t("Privacy Policy") },
    { label: t("Terms of Use") },
    { label: t("Return Policy") },
    { label: t("Shipping & Delivery") },
    { label: t("FAQ") },
  ];

  const contactInfo = [
    { icon: Phone, text: "+966 50 000 0000" },
    { icon: Mail, text: "info@ecommerce.com" },
    { icon: MapPin, text: t("حماة , سوريا") },
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
              {t(
                "A leading e-commerce platform providing the best products and services to our valued customers at competitive prices and high quality.",
              )}
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
              {t("Quick Links")}
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
            <h4 className="mb-6 text-lg font-bold text-gray-900">
              {t("Company")}
            </h4>
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
            <h4 className="mb-6 text-lg font-bold text-gray-900">
              {t("Contact Us")}
            </h4>
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
            © {currentYear} N7LY. {t("All rights reserved")}
          </p>
          <div className="flex gap-6">
            <Link className="text-sm text-gray-600 transition-colors hover:text-black">
              {t("Privacy")}
            </Link>
            <Link className="text-sm text-gray-600 transition-colors hover:text-black">
              {t("Terms")}
            </Link>
            <Link className="text-sm text-gray-600 transition-colors hover:text-black">
              {t("Sitemap")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
