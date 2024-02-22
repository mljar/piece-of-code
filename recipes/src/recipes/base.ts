// import { TablerIconsProps } from '@tabler/icons-react';
import React from 'react';
import { IconProps } from '../icons/props';
import IVariable from '../components/IVariable';


export interface IRecipeProps {
    setCode: (src: string) => void;
    setPackages: (packages: string[]) => void;
    variablesStatus: "loading" | "loaded" | "error" | "unknown";
    variables: IVariable[];
}

export interface IRecipeSet {
    name: string;
    description: string;
    Icon?: React.FC<IconProps>;
    docsLink?: string;
    recipes: Record<string, IRecipe>;
}

export interface IPackage {
    name: string;
    version: string;
}

export interface IRecipe {
    name: string;
    description: string;
    Icon?: React.FC<IconProps>;
    requiredPackages?: [string, string][];
    docsLink?: string;
    ui: React.FC<IRecipeProps>;
}
