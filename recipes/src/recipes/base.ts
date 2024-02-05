// import { TablerIconsProps } from '@tabler/icons-react';
import React from 'react';
import { IconProps } from '../icons/props';


export interface IRecipeProps {

}

export interface IRecipeSet {
    name: string;
    description: string;
    Icon?: React.FC<IconProps>;
    recipes: IRecipe[];
}

export interface IPackage {
    name: string;
    version: string;
}

export interface IRecipe {
    name: string;
    description: string;
    Icon?: React.FC<IconProps>;
    //requiredPackages: IPackage[];
    ui: React.FC<IRecipeProps>;
}
