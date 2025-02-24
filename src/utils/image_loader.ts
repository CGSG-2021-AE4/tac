export class ImageLoader {
  container: JQuery<HTMLDivElement>; // HTML Container

  frontImg: HTMLImageElement;        // Front image element
  backImg: HTMLImageElement;         // Back image element
  loadingImg: HTMLDivElement;        // Loading icon div element

  defered: JQuery.Deferred<any, any, any>;    // Current defered object
  nextDefered: JQuery.Deferred<any, any, any> | null = null; // Next defered object

  // Some other vars
  backZIndex = -10;
  frontZIndex = 10;
  requestCounter = 0;
  isTransition = false;

  nextSrc: string | undefined = undefined;

  // Some callbacks

  ontransitionend = () => {
    console.log("transition end")
    this.frontImg.ontransitionend = null;

    this.backImg.classList.add("transparent"); // Instantly make it transparent

    // Swap images
    const i = this.backImg;
    this.backImg = this.frontImg;
    this.frontImg = i;

    this.isTransition = false;
    if (this.nextSrc) {
      this.load(this.nextSrc);
      this.nextSrc = undefined;
    }
  }

  onload = () => {
    console.log(`loaded '${this.frontImg.src.substring(0, Math.min(this.frontImg.src.length, 20))}'`);

    // this.backImg.classList.add("transparent");
    this.frontImg.ontransitionend = this.ontransitionend; // Setup callback
    this.isTransition = true;                             // Starting transition
    this.frontImg.classList.remove("transparent");        // Show loaded image
    this.loadingImg.classList.add("transparent");         // Hide loading icon
    this.defered.resolve();
  };

  onerror = () => {
    console.log("image loading failed");
    this.loadingImg.classList.add("transparent");         // Hide loading icon
    this.defered.reject();
    // Sometimes it will shrink if fails
    // Nothing critical it will be fixed next successful request
    // It happens when try to load the main image because the size depends only on it
    // But image loading failure is any way a fail
    // So who cares what happens after :)
  }

  constructor( c: JQuery<HTMLDivElement> ) {
    // Container init
    if (!c.empty()) {
      throw new Error("Image loader container is not empty");
    }
    this.container = c;
    this.container.addClass("image-loader container");
    
    // Init front and back image elements
    this.frontImg = new Image();
    this.frontImg.onload = this.onload;
    this.frontImg.onerror = this.onerror;
    $(this.frontImg).addClass("image-loader element transparent");
    
    this.backImg = new Image();
    this.backImg.onload = this.onload;
    this.backImg.onerror = this.onerror;
    $(this.backImg).addClass("image-loader element transparent additional");

    // Loading icon element
    this.loadingImg = $('<div class="image-loader loading-container additional transparent"><div class="image-loader loading-icon"></div></div>').get()[0] as HTMLDivElement;

    // Attach layers to the container
    this.container.append(this.backImg, this.frontImg, this.loadingImg);
  }

  async load( src: string ) {
    if (this.isTransition) {
      console.log(`defer '${src.substring(0, Math.min(src.length, 20))}' during transition`);
      this.nextSrc = src;
      this.nextDefered = $.Deferred();
      return this.nextDefered.promise();
    }
    
    // If somebody started loading we will cut it
    if (this.defered)
      this.defered.reject();
    if (this.nextDefered) {
      this.defered = this.nextDefered;
      this.nextDefered = null;
    } else
      this.defered = $.Deferred();

    console.log(`loading '${src.substring(0, Math.min(src.length, 20))}'`);

    this.loadingImg.classList.remove("transparent");
    this.frontImg.src = src;
    return this.defered.promise();
  }

  get(): HTMLImageElement {
    if (this.isTransition)
      return this.frontImg;
    return this.backImg;
  }
}
