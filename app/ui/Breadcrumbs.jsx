"use client";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

export default function Breadcrumbs({ items = [] }) {
  console.log("items: ", items);
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-white">
        {items.map(({ title, href, withSeparator = false }, index) => {
          return (
            <Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink href={href}>{title}</BreadcrumbLink>
              </BreadcrumbItem>
              {withSeparator && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
