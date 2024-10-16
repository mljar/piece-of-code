// import { TablerIconsProps } from '@tabler/icons-react';
import React from 'react';
import { IconProps } from '../icons/props';
import IVariable from '../components/IVariable';


export interface IRecipeProps {
    setCode: (src: string) => void;
    setPackages: (packages: string[]) => void;
    variablesStatus: "loading" | "loaded" | "error" | "unknown";
    variables: IVariable[];
    runCell?: () => void;
    setKeepOpen?: (keepOpen: boolean) => void;
    metadata?: any;
    setMetadata?: (m: any) => void;
    setEnv?: (envVariables: [string, string][]) => void;
    hideTitle?: boolean;
}

export interface IRecipeSet {
    name: string;
    longName: string;
    docsUrl: string;
    description: string;
    shortDescription: string;
    Icon?: React.FC<IconProps>;
    docsLink?: string;
    recipes: Record<string, IRecipe>;
    tags?: string[];
}

export interface IPackage {
    importName: string;
    installationName: string;
    version: string;
}

export interface IRecipe {
    name: string;
    longName: string;
    parentName: string;
    description: string;
    shortDescription: string;
    tags?: string[];
    codeExplanation: string;
    Icon?: React.FC<IconProps>;
    requiredPackages?: IPackage[];
    docsUrl?: string;
    ui: React.FC<IRecipeProps>;
    defaultVariables?: IVariable[];
}
