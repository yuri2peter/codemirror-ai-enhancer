import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import React from 'react';

export default function NavLinks({
  links,
}: {
  links: { label: string; href: string }[];
}) {
  return (
    <nav>
      <Breadcrumb>
        <BreadcrumbList>
          {links.map((link, index) => {
            const isLast = index === links.length - 1;
            if (isLast) {
              return (
                <BreadcrumbItem key={index}>
                  <BreadcrumbPage>{link.label}</BreadcrumbPage>
                </BreadcrumbItem>
              );
            }
            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={link.href}>{link.label}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
}
