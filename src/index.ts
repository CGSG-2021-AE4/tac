import { Config, Workflow } from "./controller";

const config: Config = {
  paletteDir: "resources/palettes/",
  imageDir: "resources/images/",
  scenes: [
    {
      id: 0,
      name: "Sheep",
      img: "sheep/main.jpg",
      masks: ["sheep/wool_mask.jpg", "sheep/skin_mask.jpg"],
      colors: [
        {
          label: "Wool color",
          palette: "sheep_wool",
        },
        {
          label: "Skin color",
          palette: "sheep_skin",
        }
      ]
    }
  ],
};

const wf = new Workflow(config);


wf.load(0);

