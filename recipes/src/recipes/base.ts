// import { TablerIconsProps } from '@tabler/icons-react';
import React from 'react';


export interface IRecipeProps {

}

export interface IRecipeSet {
    name: string;
    description: string;
    // icon: (props: TablerIconsProps) => JSX.Element;
    recipes: IRecipe[];
}

export interface IPackage {
    name: string;
    version: string;
}

export interface IRecipe {
    name: string;
    description: string;
    // icon: (props: TablerIconsProps) => JSX.Element;
    //requiredPackages: IPackage[];
    ui: React.FC<IRecipeProps>;
}
