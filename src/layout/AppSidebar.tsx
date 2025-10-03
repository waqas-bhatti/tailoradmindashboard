"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import useSidebar from "../context/SidebarContext";
import { useLanguage } from "@/context/LanguageContext";
import { Receipt, House, Shirt, History, Trash2, User } from 'lucide-react';

// Multilingual nav items define karein
type NavItem = {
  nameEn: string;
  nameUr: string;
  nameHi: string;
  nameAr: string;
  nameDe: string;
  nameFr: string;
  nameTr: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { 
    nameEn: string;
    nameUr: string;
    nameHi: string;
    nameAr: string;
    nameDe: string;
    nameFr: string;
    nameTr: string;
    path: string; 
    pro?: boolean; 
    new?: boolean;
  }[];
};

const navItems: NavItem[] = [
  {
    icon: <House />,
    nameEn: "Home",
    nameUr: "ہوم",
    nameHi: "होम",
    nameAr: "الرئيسية",
    nameDe: "Startseite",
    nameFr: "Accueil",
    nameTr: "Ana Sayfa",
    path: "/dashboard",
  },
  {
    icon: <Shirt />,
    nameEn: "Add Data",
    nameUr: "ڈیٹا شامل کریں",
    nameHi: "डेटा जोड़ें",
    nameAr: "إضافة بيانات",
    nameDe: "Daten hinzufügen",
    nameFr: "Ajouter des données",
    nameTr: "Veri Ekle",
    path: "/dashboard/add-data",
  },
  {
    icon: <History />,
    nameEn: "History",
    nameUr: "تاریخچہ",
    nameHi: "इतिहास",
    nameAr: "السجل",
    nameDe: "Verlauf",
    nameFr: "Historique",
    nameTr: "Geçmiş",
    path: "/dashboard/user-history",
    subItems: [
      { 
        nameEn: "User History",
        nameUr: "صارف کی تاریخ",
        nameHi: "उपयोगकर्ता इतिहास",
        nameAr: "سجل المستخدم",
        nameDe: "Benutzerverlauf",
        nameFr: "Historique utilisateur",
        nameTr: "Kullanıcı Geçmişi",
        path: "/dashboard/user-history", 
        pro: false 
      },
    ],
  },
  {
    icon: <Receipt />,
    nameEn: "Invoice",
    nameUr: "انوائس",
    nameHi: "चालान",
    nameAr: "فاتورة",
    nameDe: "Rechnung",
    nameFr: "Facture",
    nameTr: "Fatura",
    path: "/dashboard/invoice",
  },
  {
    icon: <Trash2 />,
    nameEn: "Trash",
    nameUr: "کچرا",
    nameHi: "कचरा",
    nameAr: "المهملات",
    nameDe: "Papierkorb",
    nameFr: "Corbeille",
    nameTr: "Çöp",
    path: "/dashboard/trash",
  },
  {
    icon: <User />,
    nameEn: "User Profile",
    nameUr: "صارف پروفائل",
    nameHi: "उपयोगकर्ता प्रोफाइल",
    nameAr: "ملف المستخدم",
    nameDe: "Benutzerprofil",
    nameFr: "Profil utilisateur",
    nameTr: "Kullanıcı Profili",
    path: "/dashboard/profile",
  },
];

export const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const { language } = useLanguage();
  const pathname = usePathname();

  // Helper function to get name based on current language - sirf name properties ke liye
  const getName = (item: { 
    nameEn: string;
    nameUr: string;
    nameHi: string;
    nameAr: string;
    nameDe: string;
    nameFr: string;
    nameTr: string;
  }) => {
    const langKey = `name${language.charAt(0).toUpperCase() + language.slice(1)}` as keyof typeof item;
    return item[langKey] || item.nameEn;
  };

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "others"
  ) => (
    <ul className="flex flex-col gap-4">
      {navItems.map((nav, index) => (
        <li key={nav.nameEn}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer justify-start`}
            >
              <span
                className={` ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className={`menu-item-text`}>{getName(nav)}</span>
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                } justify-start`}
              >
                <span
                  className={`${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={`menu-item-text`}>{getName(nav)}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.nameEn}>
                    <Link
                      href={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {/* Sirf name properties pass karein getName function ko */}
                      {getName({
                        nameEn: subItem.nameEn,
                        nameUr: subItem.nameUr,
                        nameHi: subItem.nameHi,
                        nameAr: subItem.nameAr,
                        nameDe: subItem.nameDe,
                        nameFr: subItem.nameFr,
                        nameTr: subItem.nameTr
                      })}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span className="menu-dropdown-badge">
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span className="menu-dropdown-badge">
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    // Check if the current path matches any submenu item
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : [];
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    // If no submenu item matches, close the open submenu
    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname, isActive]);

  useEffect(() => {
    // Set the height of the submenu items when the submenu is opened
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200
        ${
          isExpanded || isMobileOpen
            ? "w-[260px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onClick={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="py-8 flex justify-start">
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="dark:hidden"
                src="/images/logo/t-dark.png"
                alt="Logo"
                width={150}
                height={40}
              />
              <Image
                className="hidden dark:block"
                src="/images/logo/t.png"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <Image
              src="/images/logo/t-icon.png"
              alt="Logo"
              width={38}
              height={38}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              {renderMenuItems(navItems, "main")}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};