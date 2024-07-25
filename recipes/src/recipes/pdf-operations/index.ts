import { IRecipeSet } from "../base";

import { PDFIcon } from "../../icons/PDF";

import { DisplayPDFRecipe } from "./displayPDF";


export const PDFRecipes: IRecipeSet = {
  name: "PDF Operations",
  longName: "Python code recipes for PDF operations",
  docsUrl: "python-pdf",
  description: "Unlock the power of PDF manipulation in Python with our detailed guide. Dive into essential operations such as creating, modifying, and extracting data from PDFs using popular libraries. Whether you're a developer, data analyst, or hobbyist, this guidebook provides practical insights and examples to streamline your PDF handling tasks efficiently.",
  shortDescription: "Discover essential PDF operations in Python with our comprehensive guide. Learn how to create, modify, and extract data from PDFs using popular libraries. Perfect for developers and data enthusiasts alike!",
  tags: ["python", "pdf"],
  Icon: PDFIcon,
  recipes: {
    [DisplayPDFRecipe.name]: DisplayPDFRecipe,
  },
};
