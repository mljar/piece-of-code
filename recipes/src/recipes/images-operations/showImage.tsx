import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Numeric } from "../../components/Numeric";
import { SelectPath } from "../../components/SelectPath";
import { addImageIcon } from "../../icons/addImage";

const DOCS_URL = "how-show-images-jupyter-notebook";

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
    let src = `# variables:\n`;
    src += `path="${image}"\n`;
    if (!advanced) {
        src += `\n# code:\n`;
        src += `with Image.open(path) as i:\n`;
        src += `\tdisplay(i)`;
    } else {
        src += `size=${width? width:250},${height? height:250}\n`  
        src += `\n# code:\n`;
        src += `with Image.open(path) as i:\n`;
        src += `\ti.thumbnail(size)\n`
        src += `\tdisplay(i)`;
    }
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
        label={"Show Image"}
        advanced={advanced}
        setAdvanced={setAdvanced}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <SelectPath
        label={"Select image"}
        defaultPath={image}
        setPath={setImage}
        tooltip={"You can upload *.png, *.jpg, *.jpeg, *.svg"}
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
  name: "Show Image",
  longName: "How to show images in Jupyter Notebook using Python",
  parentName: "Python",
  description:
    "Display PNG, JPG, JPEG, and SVG images in Jupyter Notebook using Python. This simple code resizes images to your desired dimensions before displaying them, allowing you to easily control the output size.",
  shortDescription:
    "Display PNG, JPG, JPEG, and SVG images in Jupyter Notebook using Python. This simple code resizes images to your desired dimensions before displaying them, allowing you to easily control the output size.",
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
