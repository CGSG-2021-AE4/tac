import { ImageLoader } from "../utils/image_loader";

// Image coloriser
export class ImageColoriser {
  imageDir: string;
  imageLoader: ImageLoader;

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;


  originalImg: ImageData | null = null;
  currentImg: ImageData | null = null;
  masks: (ImageData)[];

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
      const img = this.imageLoader.get();
      
      this.ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, this.canvas.width, this.canvas.height);
      this.currentImg = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
      this.originalImg = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

      resolve();
    }));
    
    
    // Load masks pixels
    //console.log(masks)
    this.masks = [];
    for (var counter = 0; counter < masks.length; counter++) {
      const i = counter;
      promises.push(new Promise(( resolve, reject ) => {
        // console.log(`start '${masks[i]}'`)
        const img = new Image();
        img.onload = () => {
          this.ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, this.canvas.width, this.canvas.height);
          this.masks[i] = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
          // console.log(`loaded '${this.masks[i]}' pixels`);
          resolve();
        }
        img.onerror = () => {
          console.log(`failed to load '${this.masks[i]}' pixels`);
          reject();
        }
        img.src = this.imageDir + masks[i];
      }));
    }

   return Promise.all(promises);
  }

  setColors( colors: number[] ) {
    if (colors.length != this.masks.length) {
      console.log("ERROR: number of masks and colors do not match");
      return;
    }
    if (!this.originalImg || !this.currentImg) {
      console.log("ERROR: original or current image is null");
      return;
    }

    for (var i = 0; i < this.currentImg.data.length; i++) {
      this.currentImg.data[i] = 255;
    }

    console.log(colors)
    for (var mi = 0; mi < this.masks.length; mi++) {
      for (var i = 0; i < this.currentImg.data.length; i += 4) {
        this.currentImg.data[i + 0] = (((colors[mi] >> 16) & 0xFF) * this.masks[mi].data[i] / 255.0 + this.currentImg.data[i + 0] * (255 - this.masks[mi].data[i]) / 255.0);
        this.currentImg.data[i + 1] = (((colors[mi] >>  8) & 0xFF) * this.masks[mi].data[i] / 255.0 + this.currentImg.data[i + 1] * (255 - this.masks[mi].data[i]) / 255.0);
        this.currentImg.data[i + 2] = (((colors[mi] >>  0) & 0xFF) * this.masks[mi].data[i] / 255.0 + this.currentImg.data[i + 2] * (255 - this.masks[mi].data[i]) / 255.0);
      }
    }

    for (var i = 0; i < this.currentImg.data.length; i++) {
      this.currentImg.data[i] = this.originalImg.data[i] * this.currentImg.data[i] / 255.0;
    }

    this.ctx.putImageData(this.currentImg, 0, 0);
    this.imageLoader.load(this.canvas.toDataURL("image/png"));
  }
}
