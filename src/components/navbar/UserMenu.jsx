"use client";
import { Dropdown, DropdownMenu, DropdownItem, DropdownTrigger, Avatar,} from "@heroui/react";

export default function UserMenu() {
    return (
        <Dropdown>
            <DropdownTrigger>
                <Avatar
                    isBordered
                    className="cursor-pointer"
                    src="https://i.pravatar.cc/150"
                />
            </DropdownTrigger>

            <DropdownMenu>
                <DropdownItem key="dashboard">
                    Dashboard
                </DropdownItem>

                <DropdownItem
                    key="logout"
                    className="text-danger"
                    color="danger">
                    Logout
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
