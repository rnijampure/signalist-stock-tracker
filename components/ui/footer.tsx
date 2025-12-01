import Link from "next/link";
import React from "react";

// Type definition for a single footer link
export interface FooterLinkProps {
  text: string;
  linkText: string;
  href: string;
}

// Props can be a single FooterLinkProps or an array
interface SmallLinksProps {
  links: FooterLinkProps | FooterLinkProps[];
}

const SmallLinks: React.FC<SmallLinksProps> = ({ links }) => {
  // Normalize to an array
  const items = Array.isArray(links) ? links : [links];

  return (
    <div>
      {items.map((link) => (
        <ul
          className="text-end pt-4"
          key={`${link.href}-${link.linkText}`} // unique key
        >
          <li className="inline">{link.text}</li>
          <li className="text-sm text-gray-400 inline pl-5">
            <Link href={link.href}>{link.linkText}</Link>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default SmallLinks;
