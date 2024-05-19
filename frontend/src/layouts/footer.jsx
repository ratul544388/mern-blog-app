import { LinkedinIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../components/logo";
import Input from "../components/input";
import Separator from "../components/ui/separator";
import { Button } from "../components/ui/button";

const Footer = () => {
  
const footerLinks = [
    {
      label: "Download",
      links: [
        {
          label: "Windows App",
          href: "#windows-app",
        },
        {
          label: "Mac App",
          href: "#mac-app",
        },
        {
          label: "Desktop App",
          href: "#desktop-app",
        },
        {
          label: "Linux App",
          href: "#linux-app",
        },
      ],
    },
    {
      label: "Products",
      links: [
        {
          label: "Web",
          href: "#web",
        },
        {
          label: "App",
          href: "#web",
        },
        {
          label: "Software",
          href: "#web",
        },
        {
          label: "Ecommerce",
          href: "#web",
        },
      ],
    },
    {
      label: "Services",
      links: [
        {
          label: "Design",
          href: "#design",
        },
        {
          label: "Development",
          href: "#design",
        },
      ],
    },
    {
      label: "Company",
      links: [
        {
          label: "Terms & Conditions",
          href: "#terms-and-conditions",
        },
        {
          label: "Privary Policy",
          href: "#privacy-policy",
        },
      ],
    },
  ];

  const icons = [
    {
      icon: LinkedinIcon,
      href: "#LinkedinIcon",
    },
    {
      icon: LinkedinIcon,
      href: "#LinkedinIcon",
    },
    {
      icon: LinkedinIcon,
      href: "#linkdin",
    },
  ];

  return (
    <footer className="bg-neutral-900 font-medium text-sm">
      <div className="p-10 flex flex-col gap-10 items-center">
        <div className="flex flex-wrap gap-12 w-full justify-center">
          <div className="flex flex-col gap-3">
            <Logo />
            <p className="text-gray-400 font-normal text-sm max-w-[300px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
              natus consequuntur obcaecati est laboriosam quisquam?
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {footerLinks.map(({ label, links }) => (
              <div key={label}>
                <h5 className="font-medium text-gray-300">{label}</h5>
                <ul className="mt-2 flex flex-col gap-1 text-gray-400">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        to={href}
                        className="hover:text-gray-300 transition-colors whitespace-nowrap"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="w-full max-w-[500px]">
            <h5 className="text-gray-300">Get in touch</h5>
            <ul className="flex gap-1.5 mt-2">
              {icons.map(({ icon: Icon, href }, index) => (
                <li key={index}>
                  <Link
                    to={href}
                    className="border border-muted-foreground p-1 rounded-full block text-gray-400"
                  >
                    <Icon className="size-4" />
                  </Link>
                </li>
              ))}
            </ul>
            <label className="block mt-5 text-gray-300">Subscribe</label>
            <div className="flex w-full items-center gap-5 mt-1">
              <Input className="h-10 max-w-[400px]" />
              <Button className="h-10">Subscribe</Button>
            </div>
          </div>
        </div>
        <Separator />
        <p className="text-gray-300 font-normal">
          ©2024 | Developer Ratul Hossain
        </p>
      </div>
    </footer>
  );
};

export default Footer;
