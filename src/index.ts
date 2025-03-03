import { Config, Workflow } from "./controller";

const config: Config = {
  paletteDir: "resources/palettes/",
  imageDir: "resources/images/",
  scenes: [
    {
      id: 0,
      name: "Sheep",
      img: "sheep/main.jpg",
      masks: ["sheep/skin_mask.jpg", "sheep/wool_mask.jpg"],
      colors: [
        {
          label: "Skin color",
          baseColor: "0xFFFFFF",
          palette: "sheep_skin",
        },
        {
          label: "Wool color",
          baseColor: "0xFFFFFF",
          palette: "sheep_wool",
        }
      ]
    },
    {
      id: 1,
      name: "Hoarse",
      img: "hoarse/main.jpg",
      masks: ["hoarse/skin_mask.jpg", "hoarse/hair_mask.jpg"],
      colors: [
        {
          label: "Skin color",
          baseColor: "0xFFFFFF",
          palette: "sheep_skin",
        },
        {
          label: "Hair color",
          baseColor: "0xFFFFFF",
          palette: "viscose",
        }
      ]
    }
  ],
};

const wf = new Workflow(config);


wf.loadScene(0);

