import { IRecipeSet } from "../base";
import { MarkdownIcon } from "../../icons/Markdown";

export const MarkdownRecipes: IRecipeSet = {
    name: "Markdown",
    longName: "Markdown cheatsheet",
    docsUrl: "markdown",
    description: `

## Headings
\`\`\`markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
\`\`\`

## Text Formatting
\`\`\`markdown
**Bold** or __Bold__
*Italic* or _Italic_
~~Strikethrough~~

**_Bold and Italic_**

> Blockquote
\`\`\`

## Lists
### Unordered List
\`\`\`markdown
- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2
\`\`\`

### Ordered List
\`\`\`markdown
1. Item 1
2. Item 2
   1. Subitem 2.1
   2. Subitem 2.2
\`\`\`

## Links and Images
### Links
\`\`\`markdown
[Link Text](http://example.com)

[Link Text](http://example.com "Optional Title")
\`\`\`

### Images
\`\`\`markdown
![Alt Text](http://example.com/image.jpg)

![Alt Text](http://example.com/image.jpg "Optional Title")
\`\`\`

## Code

### Inline Code
\`\`\`markdown
some text with \`inline code\` and rest of text
\`\`\`

### Code Block
\`\`\`language
code block
\`\`\`

### Indented Code Block
\`\`\`
    This is an indented code block.
\`\`\`

## Tables
\`\`\`markdown
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
\`\`\`

## Horizontal Rule
\`\`\`markdown
---
or
***
or
___
\`\`\`

## Task Lists
\`\`\`markdown
- [x] Task 1
- [ ] Task 2
\`\`\`


    `,
    shortDescription: "Markdown code formatting snippets",
    tags: ["markdown"],
    Icon: MarkdownIcon,
    recipes: {}
};
