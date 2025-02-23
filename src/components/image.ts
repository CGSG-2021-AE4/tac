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
    // Load main image
    await this.imageLoader.load(this.imageDir + mainImg);

    // Stretch canvas
    this.canvas.width = this.imageLoader.get().width;
    this.canvas.height = this.imageLoader.get().height;
    
    var promises: Promise<void>[] = [];

    // Load main image pixels
    promises.push(new Promise((resolve) => {
      const img = this.imageLoader.get()
    
      this.ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, this.canvas.width, this.canvas.height);
      this.currentImg = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
      this.originalImg = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

      console.log(`loaded '${mainImg}' pixels`)
      resolve();
    }));
    
    
    // Load masks pixels
    console.log(masks)
    this.masks = [];
    for (var counter = 0; counter < masks.length; counter++) {
      const i = counter;
      this.masks.push(null);
      promises.push(new Promise(( resolve, reject ) => {
        console.log(`start '${masks[i]}'`)
        const img = new Image();
        img.onload = () => {
          this.ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, this.canvas.width, this.canvas.height);
          this.masks[i] = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
          console.log(`loaded '${this.masks[i]}' pixels`);
          resolve();
        }
        img.onerror = () => {
          console.log(`failed to load '${this.masks[i]}' pixels`);
          reject();
        }
        img.src = this.imageDir + masks[i];
      }));
    }

    // Extra check
    // setTimeout(() => {
    //   if(!this.originalPixels || !this.currentPixels || !this.woolMask || !this.skinMask) {
    //     console.log("!!!something did not loaded");
    //     console.log("EXTRA");
    //     this.loadImgs();         
    //   }
    // }, 1000);
    return Promise.all(promises);
  }
}
