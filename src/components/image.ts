import { ImageLoader } from "../utils/image_loader";

// Image coloriser
export class ImageColoriser {
  imageDir: string;
  imageLoader: ImageLoader;

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;


  originalImg: ImageData | null = null;
  currentImg: ImageData | null = null;
  masks: (ImageData | null)[];

  constructor( c: JQuery<HTMLDivElement>, imageDir: string ) {
    this.imageDir = imageDir;
    this.imageLoader = new ImageLoader(c);

    // Init rendring canvas
    this.canvas = document.createElement("canvas");
    const ctx = this.canvas.getContext("2d");
    if (!ctx) {
      alert("Error creating context");
      return;
    }
    this.ctx = ctx;
  }

  async load( mainImg: string, masks: string[] ) {
    await this.imageLoader.load(this.imageDir + mainImg);
    console.log("loaded");
  }
}
