// Main data structures

import { ColorMenuDescriptor } from "./color";

export class SceneDescriptor {
  id: number;
  name: string;
  img: string;                   // URL to main image fron image dir
  masks: string[];               // Array of URLs to masks images
  colors: ColorMenuDescriptor[]; // Array of color menu descriptors that corresponds to masks at the same order
}
