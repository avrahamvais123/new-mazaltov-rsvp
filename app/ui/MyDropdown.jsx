"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Fragment } from "react";

const MyDropdown = ({ children, title, content, items = [] }) => {
  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {content}
          {items?.map((item, idx) => {
            return (
              <Fragment key={idx}>
                <DropdownMenuItem key={idx} onClick={item?.action}>
                  {item?.text}
                  {item?.shortcut && (
                    <DropdownMenuShortcut>
                      {item?.shortcut}
                    </DropdownMenuShortcut>
                  )}
                </DropdownMenuItem>
                {item?.sub && (
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      {item?.sub?.trigger}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        {item?.sub?.items?.map((subItem, idx) => {
                          return (
                            <Fragment key={idx}>
                              <DropdownMenuItem>
                                {subItem?.text}
                              </DropdownMenuItem>
                              {subItem?.separator && <DropdownMenuSeparator />}
                            </Fragment>
                          );
                        })}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                )}
              </Fragment>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MyDropdown;
