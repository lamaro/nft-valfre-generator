const fs = require("fs");
const childProcess = require("child_process");
const { createCanvas, loadImage } = require("canvas");
const { characters } = require("./data/characters/characters");
const weightedRandomObject = require("weighted-random-object");

const TOTAL_NFTS = 3000; //NFT desired amount
const toCheck = [];

const OFFSET = 0;

// const imageFormat = {
//   width: 2048,
//   height: 2048,
// };
const imageFormat = {
  width: 500,
  height: 500,
};

const dir = {
  traitTypes: `./layers/trait_types`,
  outputs: `./outputs`,
};

const layersNamesHelper = [
  "Background",
  "Pattern",
  "Body",
  "Crust",
  "Eyes",
  "Mouth",
  "Topper",
  "Legal Status",
  "Toast Level",
  "Species",
];

const canvas = createCanvas(imageFormat.width, imageFormat.height);
const ctx = canvas.getContext("2d");

const recreateOutputsDir = () => {
  if (fs.existsSync(dir.outputs)) {
    fs.rmdirSync(dir.outputs, { recursive: true });
  }
  fs.mkdirSync(dir.outputs);
  fs.mkdirSync(`${dir.outputs}/images`);
  fs.mkdirSync(`${dir.outputs}/metadata`);
  fs.mkdirSync(`${dir.outputs}/stats`);
};

const drawImage = async (traitTypes, loopIndex) => {
  const drawableTraits = traitTypes.filter(({ file }) => file !== "");
  for (let index = 0; index < drawableTraits.length; index++) {
    try {
      const val = drawableTraits[index];
      const image = await loadImage(`${dir.traitTypes}/${val.file}`);
      ctx.drawImage(image, 0, 0, imageFormat.width, imageFormat.height);
    } catch (error) {
      console.log("CATCH ERROR", error);
      toCheck.push(drawableTraits[index]);
    }
  }

  //Save metadata
  const metadataTraits = traitTypes.filter(
    ({ type, file }) => type !== false && file !== ""
  );
  const metaAttr = metadataTraits.map((attrs, i) => {
    return { trait_type: attrs.type, value: attrs.name };
  });

  fs.writeFileSync(
    `${dir.outputs}/metadata/${loopIndex + 1}.json`,
    JSON.stringify({
      image: `${loopIndex + 1}.png`,
      //   externalUrl: `https://domain/token/${loopIndex + 1}`,
      description: `Description TBA`,
      name: `Breadverse #${loopIndex + 1}`,
      attributes: metaAttr,
      // files: metaAttrFiles
    }),
    function (err) {
      if (err) throw err;
    }
  );

  //Save image
  fs.writeFileSync(
    `${dir.outputs}/images/${loopIndex + 1}.png`,
    canvas.toBuffer("image/png")
  );

  console.log(
    `==============> Progress: ${loopIndex + 1} / ${
      TOTAL_NFTS + OFFSET
    } <================`
  );
};

const createNFT = async (character, loopIndex) => {
  const {
    traits,
    folderPath,
  } = require(`./data/characters/${character.folder}/traits.js`);

  const layers = [];

  const drawLayer = (index) => {
    const object = weightedRandomObject(traits[index]);
    layers.push({
      ...object,
      file: object.file ? `${folderPath}/${object.file}` : ``,
      type: layersNamesHelper[index],
    });
  };

  const drawLayers = () => {
    drawLayer(0);
    drawLayer(1);
    drawLayer(2);
    drawLayer(3);
    drawLayer(4);
    drawLayer(5);
    drawLayer(6);
    drawLayer(7);
    drawLayer(8);
  };

  drawLayers();

  //Check layers
  //Check conditionals or dispose the layers array and try again.

  //Layer[3] => Crust
  //Layer[4] => Eyes
  //Layer[5] => Mouth
  //Layer[6] => Topper
  if (
    (layers[3].name === "The Mystical Fruit" && layers[6].name === "Breadphones") ||
    (layers[3].name === "The Mystical Fruit" && layers[6].name === "Meowphones") ||
    (layers[3].name !== "Empty" && layers[6].name === "The Flip") ||
    (layers[3].name === "RoboLoaf" && layers[5].name === "Bandana - Purp") ||
    (layers[3].name === "RoboLoaf" && layers[5].name === "Bandana - Red") ||
    (layers[3].name === "All Natural" && layers[5].name === "Bandana - Purp") ||
    (layers[3].name === "All Natural" && layers[5].name === "Bandana - Red") ||
    (layers[3].name === "The Artist" && layers[5].name === "Bandana - Purp") ||
    (layers[3].name === "The Artist" && layers[5].name === "Bandana - Red") ||
    (layers[3].name === "RoboLoaf" && layers[5].name === "Trash Can") ||
    (layers[3].name === "All Natural" && layers[5].name === "Trash Can") ||
    (layers[3].name === "The Artist" && layers[5].name === "Trash Can") ||
    (layers[3].name === "Swords" && layers[5].name === "Trash Can") ||
    (layers[3].name === "Red Backpack" && layers[5].name === "Trash Can") ||
    (layers[3].name === "Blue Backpack" && layers[5].name === "Trash Can") ||
    (layers[3].name === "Black Backpack" && layers[5].name === "Trash Can") ||
    (layers[3].name === "Punk" && layers[5].name === "Trash Can") ||
    (layers[3].name === "Runaway" && layers[5].name === "Trash Can") ||
    (layers[3].name === "The Mystical Fruit" && layers[5].name === "Trash Can") ||
    (layers[4].name === "Cool Shades Red" && layers[6].name === "Deli Wrap Blueberry") ||
    (layers[4].name === "Cool Shades Blue" && layers[6].name === "Deli Wrap Blueberry") ||
    (layers[4].name === "Cool Shades Black" && layers[6].name === "Deli Wrap Blueberry") ||
    (layers[4].name === "Cool Shades Red" && layers[6].name === "Deli Wrap Classic") ||
    (layers[4].name === "Cool Shades Blue" && layers[6].name === "Deli Wrap Classic") ||
    (layers[4].name === "Cool Shades Black" && layers[6].name === "Deli Wrap Classic") ||
    (layers[4].name === "Cool Shades Red" && layers[6].name === "Deli Wrap Grape") ||
    (layers[4].name === "Cool Shades Blue" && layers[6].name === "Deli Wrap Grape") ||
    (layers[4].name === "Cool Shades Black" && layers[6].name === "Deli Wrap Grape") ||
    (layers[4].name === "Cool Shades Red" && layers[6].name === "Deli Wrap Raspberry") ||
    (layers[4].name === "Cool Shades Blue" && layers[6].name === "Deli Wrap Raspberry") ||
    (layers[4].name === "Cool Shades Black" && layers[6].name === "Deli Wrap Raspberry") ||
    (layers[4].name === "Cool Shades Red" && layers[6].name === "Boomer Blue") ||
    (layers[4].name === "Cool Shades Blue" && layers[6].name === "Boomer Blue") ||
    (layers[4].name === "Cool Shades Black" && layers[6].name === "Boomer Blue") ||
    (layers[4].name === "Cool Shades Red" && layers[6].name === "Boomer Red") ||
    (layers[4].name === "Cool Shades Blue" && layers[6].name === "Boomer Red") ||
    (layers[4].name === "Cool Shades Black" && layers[6].name === "Boomer Red") ||
    (layers[4].name === "Cool Shades Red" && layers[6].name === "Magic Hat Black") ||
    (layers[4].name === "Cool Shades Blue" && layers[6].name === "Magic Hat Black") ||
    (layers[4].name === "Cool Shades Black" && layers[6].name === "Magic Hat Black") ||
    (layers[4].name === "Cool Shades Red" && layers[6].name === "Magic Hat Purple") ||
    (layers[4].name === "Cool Shades Blue" && layers[6].name === "Magic Hat Purple") ||
    (layers[4].name === "Cool Shades Black" && layers[6].name === "Magic Hat Purple") ||
    (layers[4].name === "Cool Shades Red" && layers[6].name === "I Do") ||
    (layers[4].name === "Cool Shades Blue" && layers[6].name === "I Do") ||
    (layers[4].name === "Cool Shades Black" && layers[6].name === "I Do") ||
    (layers[4].name === "Cool Shades Red" && layers[6].name === "The Flip") ||
    (layers[4].name === "Cool Shades Blue" && layers[6].name === "The Flip") ||
    (layers[4].name === "Cool Shades Black" && layers[6].name === "The Flip") ||
    (layers[4].name === "Cool Shades Red" && layers[6].name === "Alien Wear Green") ||
    (layers[4].name === "Cool Shades Blue" && layers[6].name === "Alien Wear Green") ||
    (layers[4].name === "Cool Shades Black" && layers[6].name === "Alien Wear Green") ||
    (layers[4].name === "Cool Shades Red" && layers[6].name === "Alien Wear Red") ||
    (layers[4].name === "Cool Shades Blue" && layers[6].name === "Alien Wear Red") ||
    (layers[4].name === "Cool Shades Black" && layers[6].name === "Alien Wear Red") ||
    (layers[4].name === "Cool Shades Red" && layers[6].name === "Buns Blue") ||
    (layers[4].name === "Cool Shades Blue" && layers[6].name === "Buns Blue") ||
    (layers[4].name === "Cool Shades Black" && layers[6].name === "Buns Blue") ||
    (layers[4].name === "Cool Shades Red" && layers[6].name === "Buns Pink") ||
    (layers[4].name === "Cool Shades Blue" && layers[6].name === "Buns Pink") ||
    (layers[4].name === "Cool Shades Black" && layers[6].name === "Buns Pink") ||
    (layers[4].name === "Cool Shades Red" && layers[6].name === "Trash Lid") ||
    (layers[4].name === "Cool Shades Blue" && layers[6].name === "Trash Lid") ||
    (layers[4].name === "Cool Shades Black" && layers[6].name === "Trash Lid") ||
    (layers[4].name === "Nounish Blue" && layers[6].name === "Bunny") ||
    (layers[4].name === "Nounish Red" && layers[6].name === "Bunny") ||
    (layers[4].name === "GM Blue" && layers[6].name === "I Do") ||
    (layers[4].name === "GM Green" && layers[6].name === "I Do") ||
    (layers[4].name === "GM Red" && layers[6].name === "I Do") ||
    (layers[4].name === "Marmaduke" && layers[5].name === "Papa Bear") ||
    (layers[4].name === "Marmaduke" && layers[5].name === "Baby Bear") ||
    (layers[5].name === "Fly Catcher" && layers[6].name === "Flow") ||
    (layers[5].name === "Doobie" && layers[6].name === "Flow") ||
    (layers[5].name === "Eco Friendly Straw" && layers[6].name === "Flow") ||
    (layers[5].name === "Puffer OJ" && layers[6].name === "Flow") ||
    (layers[5].name === "Puffer Purp" && layers[6].name === "Flow") ||
    (layers[5].name === "Puffer Smoke" && layers[6].name === "Flow")
  ) {
    console.log("- Conditional missmatch -");
    try {
      await createNFT(character, loopIndex);
    } catch (error) {
      console.log(
        "- Conditional missmatch -",
        error
      );
    }
    return;
  }

  //Save Image and metadata
  await drawImage(layers, loopIndex);
};

const runScript = (scriptPath, callback) => {
  var invoked = false;
  var process = childProcess.fork(scriptPath);

  process.on("error", function (err) {
    if (invoked) return;
    invoked = true;
    callback(err);
  });

  process.on("exit", function (code) {
    if (invoked) return;
    invoked = true;
    var err = code === 0 ? null : new Error("exit code " + code);
    callback(err);
  });
};

const main = async () => {
  recreateOutputsDir();
  for (let index = OFFSET; index < TOTAL_NFTS + OFFSET; index++) {
    const character = weightedRandomObject(characters);
    await createNFT(character, index);
  }
  //Run Stats
  //   runScript("./stats.js", function (err) {
  //     if (err) throw err;
  //     console.log("finished running stats.js");
  //   });

  const uniqueToCheck = toCheck.reduce(function (a, b) {
    if (a.indexOf(b) < 0) a.push(b);
    return a;
  }, []); //WIP
  fs.writeFileSync(
    `${dir.outputs}/stats/to_check.json`,
    JSON.stringify(uniqueToCheck),
    function (err) {
      if (err) throw err;
    }
  );
};

main();
