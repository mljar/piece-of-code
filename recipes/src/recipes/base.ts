import { TablerIconsProps } from '@tabler/icons-react';
import React from 'react';


export interface IRecipeSet {
    name: string;
    description: string;
    icon: (props: TablerIconsProps) => JSX.Element;
}

export interface IPackage {
    name: string;
    version: string;
}

export interface IRecipe {
    parent: IRecipeSet;
    name: string;
    description: string;
    //requiredPackages: IPackage[];
    // ui: JSX.Element;
    ui: React.FC<IProps>;
}

export interface IProps {

}

class Recipe {

    private constructor() { }

}