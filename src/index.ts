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
    },
    {
      id: 2,
      name: "test 2",
      img: "sheep/main.jpg",
      masks: [],
      colors: [],
    },
    {
      id: 3,
      name: "test 3",
      img: "sheep/main.jpg",
      masks: [],
      colors: [],
    },
    {
      id: 4,
      name: "test 4",
      img: "sheep/main.jpg",
      masks: [],
      colors: [],
    },
    {
      id: 5,
      name: "test 5",
      img: "sheep/main.jpg",
      masks: [],
      colors: [],
    },
    {
      id: 6,
      name: "test 6",
      img: "sheep/main.jpg",
      masks: [],
      colors: [],
    },
    {
      id: 7,
      name: "test 7",
      img: "sheep/main.jpg",
      masks: [],
      colors: [],
    }
  ],
};

const wf = new Workflow(config);


wf.loadScene(0);

