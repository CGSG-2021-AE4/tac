// Main data structures

import { ColorMenuDescriptor } from "./color_menu";

export class SceneDescriptor {
  id: number;
  name: string;

  img: string;                   // URL to main image fron image dir
  masks: string[];               // Array of URLs to masks images
  colors: ColorMenuDescriptor[]; // Array of color menu descriptors that corresponds to masks at the same order
}

export class SceneMenuOption {
  id: number;
  name: string;
}

export class SceneMenu {
  container: JQuery<HTMLElement>; 
  optionsContainer: JQuery<HTMLElement>;
  buttonElement: JQuery<HTMLInputElement>;

  optionElements: HTMLElement[] = [];

  public onchange: ( s: SceneMenuOption ) => Promise<void>;

  async change( s: SceneMenuOption ) {
    this.buttonElement.text(s.name);
    return this.onchange(s);
  }

  constructor( container: JQuery<HTMLElement> ) {
    this.container = container;

    this.buttonElement = $(`<button class="scene-menu-button">Scene name</button>`);
    this.buttonElement.on("click", () => {
      this.optionsContainer.toggleClass("hidden");
    });
    console.log("AAA")
    console.log(this.buttonElement)
    
    this.buttonElement.appendTo(this.container);

    // Create options container
    this.optionsContainer = $('<div class="scene-menu-content hidden"></div>');
    this.optionsContainer.appendTo(this.container);

    // Create options
    document.addEventListener("click", ( e ) => {
      if (!e.target)
        return;
      if (!this.optionElements.includes(e.target as HTMLElement) && (e.target as HTMLElement) != this.buttonElement.get()[0])
        this.optionsContainer.addClass("hidden");
    });
  }

  loadConfig( options: SceneMenuOption[] ) {
    console.log("sceneeeee");
    console.log(options);
    this.optionsContainer.append(options.map( ( s: SceneMenuOption ) => {
      const e = $(`<div class="scene-menu-option">${s.name}</div>`);
      e.on("click", () => {
        this.change(s);
      });
      return e;
    }));
  }
}
