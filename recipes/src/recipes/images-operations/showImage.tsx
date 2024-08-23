import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Numeric } from "../../components/Numeric";
import { SelectPath } from "../../components/SelectPath";
import { addImageIcon } from "../../icons/addImage";

const DOCS_URL = "how-to-show-images-jupyter-notebook";

export const ShowImage: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
}) => {
  const [image, setImage] = useState("myImage.png");
  const [advanced, setAdvanced] = useState(false);
  const [width, setWidth] = useState(250);
  const [height, setHeight] = useState(250);

  useEffect(() => {
    let src = ``;

    if (advanced) {
     src += `# set image path and size\n`;
     src += `path=r"${image}"\n`;
     src += `size=${width? width:250},${height? height:250}\n\n`;
    } else {
      src += `# set image path\n`;
      src += `path=r"${image}"\n\n`;
    }
    src += `# open and display image\n`;
    src += `with Image.open(path) as i:\n`
    if (advanced) src += `    i.thumbnail(size)\n`;
    src += `    display(i)`

    setCode(src);
    setPackages([
      "from IPython.display import display",
      "from PIL import Image",
    ]);
    if (setMetadata) {
      setMetadata({
        image,
        width,
        height,
        advanced,
        docsUrl: DOCS_URL,
      });
    }
  }, [image,width,height,advanced]);
  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["image"] !== undefined) setImage(metadata["image"]);
      if (metadata["width"] !== undefined) setWidth(metadata["width"]);
      if (metadata["height"] !== undefined) setHeight(metadata["height"]);
      if (metadata["advanced"] !== undefined) setAdvanced(metadata["advanced"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={addImageIcon}
        label={"Show image"}
        advanced={advanced}
        setAdvanced={setAdvanced}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <SelectPath
        label={"Select image"}
        defaultPath={image}
        setPath={setImage}
        tooltip={"You can upload *.png, *.jpg, *.jpeg"}
      />
      {advanced && (
        <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
          <Numeric
            label={"Set width"}
            name={width}
            setName={setWidth}
            tooltip={"Set image width in pixels (px)"}
            minValue={1}
          />
          <Numeric 
            label={"Set height"}
            name={height}
            setName={setHeight}
            tooltip={"Set image height in pixels (px)"}
            minValue={1}
          />
          </div>
      )}
    </div>
  );
};

export const ShowImageRecipe: IRecipe = {
  name: "Show image",
  longName: "How to show images in the Python Notebook",
  parentName: "Images Operations",
  description:
    "Learn how to open and display an image in Python. This recipe walks you through setting the image path, resizing it to a thumbnail of a specified size, and displaying the resized image. Perfect for handling image files, adjusting their size, and viewing them directly within your Python notebook.",
  shortDescription:
    "Learn how to open and display an image in Python. This recipe covers setting the image path, resizing it to a thumbnail, and displaying it. Ideal for resizing and viewing images in your Python projects.",
  codeExplanation: `
  1. Set image path and optionally size.
  2. Show the chosen image in Jupyter Notebook.`,
  ui: ShowImage,
  Icon: addImageIcon,
  requiredPackages: [
    { importName: "PIL", installationName: "pillow", version: ">=10.2.0" },
  ],
  docsUrl: DOCS_URL,
};

export default ShowImageRecipe;
