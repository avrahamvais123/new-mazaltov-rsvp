import { lime, purple, slate, yellow } from "tailwindcss/colors";

export const generateBowColor = (type) => {
    switch (type) {
      case "pdf":
        return { color: slate[50], shadowcolor: slate[300] };
      case "jpg":
      case "jpeg":
        return { color: lime[600], shadowcolor: lime[800] };
      case "png":
        return { color: purple[600], shadowcolor: purple[800] };
      case "svg":
        return { color: yellow[400], shadowcolor: yellow[600] };
      default:
        return { color: slate[600], shadowcolor: slate[800] };
    }
  };