import type { ComponentType } from "react";

export type ComponentNavigationItem = {
  id: string;
  name: string;
  variations: string[];
};

export type ComponentNavigationGroup = {
  title: string;
  items: ComponentNavigationItem[];
};

export type DesignSystemSection = {
  id: string;
  Component: ComponentType;
};
