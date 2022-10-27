const fs = require("fs");
const childProcess = require("child_process");
const { createCanvas, loadImage } = require("canvas");
const { characters } = require("./data/characters/characters");
const weightedRandomObject = require("weighted-random-object");

const TOTAL_NFTS = 10000; //NFT desired amount
const toCheck = [];
const chracterLayers = [];

const OFFSET = 0;

const imageFormat = {
  width: 1500,
  height: 1500,
};
// const imageFormat = {
//   width: 500,
//   height: 500,
// };

const dir = {
  traitTypes: `./layers/trait_types`,
  outputs: `./outputs`,
};

const layersNamesHelper = [
  "Background",
  "Wings",
  "Skin",
  "Makeup",
  "Body Art",
  "Face Accessories",
  "Clothing",
  "Outwear",
  "Hairstyle",
  "Neck Accessories",
  "Eyewear",
  "Headwear"
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

const drawImage = async (traitTypes, loopIndex, character) => {
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

  const metaAttrWithCharacter = [...metaAttr, { "trait_type": "Character", "value": `${character}` }]

  fs.writeFileSync(
    `${dir.outputs}/metadata/${loopIndex + 1}.json`,
    JSON.stringify({
      image: `${loopIndex + 1}.png`,
      //   externalUrl: `https://domain/token/${loopIndex + 1}`,
      description: `Valfrélandia is a collection of 10,000 unique NFT’s which were hand-drawn by iconic Mexican artist Ilse Valfré. This drop features 15 of her unique character types and has over 400 hand drawn traits. Each NFT will act as your Community Membership into Valfrélandia and will grant special perks from future art drops to IRL events and more.`,
      name: `Valfrélandia #${loopIndex + 1}`,
      attributes: metaAttrWithCharacter,
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
    drawLayer(9);
    drawLayer(10);
    drawLayer(11);
  };

  drawLayers();

  //Check layers
  //Check conditionals or dispose the layers array and try again.

/*
0. BACKGROUNDS
1. WINGS
2. SKIN
3. MAKEUP
4. BODY ART
5. FACE ACCESSORIES
6. CLOTHING
7. OUTERWEAR
8. HAIRSTYLE
9. NECK ACCESSORIES
10. EYEWEAR
11. HEADWEAR
 */
  if (
  
    (layers[4].name === "Full Body Tattoos I" && layers[7].name === "Black and Blue Coat") ||
    (layers[4].name === "Full Body Tattoos II" && layers[7].name === "Black and Blue Coat") ||
    (layers[4].name === "Full Body Tattoos III" && layers[7].name === "Black and Blue Coat") ||
    (layers[4].name === "Full Body Tattoos IV" && layers[7].name === "Black and Blue Coat") ||
    (layers[4].name === "Full Body Tattoos V" && layers[7].name === "Black and Blue Coat") ||
    (layers[4].name === "Bandaid" && layers[7].name === "Black and Blue Coat") ||
    (layers[4].name === "Full Body Tattoos I" && layers[7].name === "Black and Lavender Coat") ||
    (layers[4].name === "Full Body Tattoos II" && layers[7].name === "Black and Lavender Coat") ||
    (layers[4].name === "Full Body Tattoos III" && layers[7].name === "Black and Lavender Coat") ||
    (layers[8].name === "Color Cables Buns Braids" && layers[11].name === "Black and White Checkered Beret") ||
    (layers[8].name === "Color Cables Buns Braids" && layers[11].name === "Black and White Checkered Beret") ||
    (layers[8].name === "Black Curly Horns" && layers[11].name === "Black Baby Beret") ||
    (layers[8].name === "Weed Blue Braids" && layers[11].name === "Black Baby Beret") ||
    (layers[8].name === "Weed Lavender Braids" && layers[11].name === "Black Baby Beret") ||
    (layers[8].name === "Weed Pink Bob Hair" && layers[11].name === "Black Baby Beret") ||
    (layers[8].name === "Weed Light Green Bob Hair" && layers[11].name === "Black Baby Beret") ||
    (layers[8].name === "Venus Trap Hair" && layers[11].name === "Black Daisy Beret") ||
    (layers[8].name === "Venus Trap Hair" && layers[11].name === "Black Dots Beret") ||
    (layers[8].name === "Black Spike Hair" && layers[11].name === "Black Horns") ||
    (layers[8].name === "Blue Pigtails" && layers[11].name === "Black Horns") ||
    (layers[8].name === "Lavender Eye Bows Bob Hair" && layers[11].name === "Black Horns") ||
    (layers[8].name === "Limegreen Pigtails" && layers[11].name === "Black Horns") ||
    (layers[8].name === "Limegreen Spike Long Hair" && layers[11].name === "Black Horns") ||
    (layers[8].name === "Limegreen Spike Hair" && layers[11].name === "Black Horns") ||
    (layers[8].name === "Mint Eye Bows Bob Hair" && layers[11].name === "Black Horns") ||
    (layers[8].name === "Orange Pigtails" && layers[11].name === "Black Horns") ||
    (layers[8].name === "Orange Spike Hair" && layers[11].name === "Black Horns") ||
    (layers[8].name === "Pink Eye Bows Bob Hair" && layers[11].name === "Black Horns") ||
    (layers[8].name === "Pink Pigtails" && layers[11].name === "Black Horns") ||
    (layers[8].name === "Pink Spike Hair" && layers[11].name === "Black Horns") ||
    (layers[8].name === "Pink Spike Long Hair" && layers[11].name === "Black Horns") ||
    (layers[8].name === "Red Spike Hair" && layers[11].name === "Black Horns") ||
    (layers[8].name === "Red Spike Long Hair" && layers[11].name === "Black Horns") ||
    (layers[8].name === "Black Spike Hair" && layers[11].name === "Black Skull Beret") ||
    (layers[8].name === "Blue Pigtails" && layers[11].name === "Black Skull Beret") ||
    (layers[8].name === "Lavender Eye Bows Bob Hair" && layers[11].name === "Black Skull Beret") ||
    (layers[8].name === "Limegreen Pigtails" && layers[11].name === "Black Skull Beret") ||
    (layers[8].name === "Limegreen Spike Long Hair" && layers[11].name === "Black Skull Beret") ||
    (layers[8].name === "Limegreen Spike Hair" && layers[11].name === "Black Skull Beret") ||
    (layers[8].name === "Mint Eye Bows Bob Hair" && layers[11].name === "Black Skull Beret") ||
    (layers[8].name === "Orange Pigtails" && layers[11].name === "Black Skull Beret") ||
    (layers[8].name === "Orange Spike Hair" && layers[11].name === "Black Skull Beret") ||
    (layers[8].name === "Pink Eye Bows Bob Hair" && layers[11].name === "Black Skull Beret") ||
    (layers[8].name === "Pink Pigtails" && layers[11].name === "Black Skull Beret") ||
    (layers[6].name === "Black Lace Collar Safetypin Top" && layers[9].name === "Black Heart Choker") ||
    (layers[6].name === "Black Lace Collar Safetypin Top" && layers[9].name === "Black Heart Choker") ||
    (layers[6].name === "Blue Bow Sailor Top" && layers[9].name === "Black Heart Choker") ||
    (layers[6].name === "Red Bow Black Sailor Top" && layers[9].name === "Black Heart Choker") ||
    (layers[6].name === "Red Bow Sailor Top" && layers[9].name === "Black Heart Choker") ||
    (layers[6].name === "Blue Bows Psychedelic Top" && layers[9].name === "Black Heart Choker") ||
    (layers[6].name === "Lavender Bows Psychedelic Top" && layers[9].name === "Black Heart Choker") ||
    (layers[6].name === "Red Bows Psychedelic Top" && layers[9].name === "Black Heart Choker") ||
    (layers[6].name === "White Bows Psychedelic Top" && layers[9].name === "Black Heart Choker") ||
    (layers[6].name === "Green Ying Yang Harness Bra" && layers[9].name === "Black Ring Choker") ||
    (layers[6].name === "Pink Ying Yang Harness Bra" && layers[9].name === "Black Ring Choker") ||
    (layers[6].name === "White Ying Yang Harness Bra" && layers[9].name === "Black Ring Choker") ||
    (layers[6].name === "Blue Bows Psychedelic Top" && layers[9].name === "Black Ring Choker") ||
    (layers[6].name === "Lavender Bows Psychedelic Top" && layers[9].name === "Black Ring Choker") ||
    (layers[6].name === "Red Bows Psychedelic Top" && layers[9].name === "Black Ring Choker") ||
    (layers[6].name === "White Bows Psychedelic Top" && layers[9].name === "Black Ring Choker") ||
    (layers[6].name === "Black Sailor Top" && layers[9].name === "Black Ring Choker") ||
    (layers[6].name === "Pink Sailor Top" && layers[9].name === "Black Ring Choker") ||
    (layers[6].name === "Lavender Roses Bra" && layers[9].name === "Black Safetypin Choker") ||
    (layers[6].name === "Orange Roses Bra" && layers[9].name === "Black Safetypin Choker") ||
    (layers[6].name === "Pink Roses Bra" && layers[9].name === "Black Safetypin Choker") ||
    (layers[6].name === "Red Roses Bra" && layers[9].name === "Black Safetypin Choker") ||
    (layers[6].name === "Black and Pink Kawaii Top" && layers[9].name === "Gold Heart Lock Choker") ||
    (layers[6].name === "Black and Red Kawaii Top" && layers[9].name === "Gold Heart Lock Choker") ||
    (layers[6].name === "Black and White Kawaii Top" && layers[9].name === "Gold Heart Lock Choker") ||
    (layers[6].name === "Black and Lavender Kawaii Top" && layers[9].name === "Gold Heart Lock Choker") ||
    (layers[6].name === "Black Cyber Longsleeve Top" && layers[9].name === "Gold Heart Lock Choker") ||
    (layers[6].name === "Green Ying Yang Harness Bra" && layers[9].name === "Heart Metal Choker") ||
    (layers[6].name === "Pink Ying Yang Harness Bra" && layers[9].name === "Heart Metal Choker") ||
    (layers[6].name === "White Ying Yang Harness Bra" && layers[9].name === "Heart Metal Choker") ||
    (layers[6].name === "Blue Bows Psychedelic Top" && layers[9].name === "Heart Metal Choker") ||
    (layers[6].name === "Baby Blue Checkered Cardigan" && layers[7].name === "Black and Blue Coat") ||
    (layers[6].name === "Green Checkered Cardigan" && layers[7].name === "Black and Blue Coat") ||
    (layers[6].name === "Red Checkered Cardigan" && layers[7].name === "Black and Blue Coat") ||
    (layers[6].name === "Baby Blue Checkered Cardigan" && layers[7].name === "Black and Lavender Coat") ||
    (layers[6].name === "Green Checkered Cardigan" && layers[7].name === "Black and Lavender Coat") ||
    (layers[6].name === "Red Checkered Cardigan" && layers[7].name === "Black and Lavender Coat") ||
    (layers[6].name === "Lavender Roses Bra" && layers[7].name === "Black and Orange Dots Coat") ||
    (layers[6].name === "Orange Roses Bra" && layers[7].name === "Black and Orange Dots Coat") ||
    (layers[6].name === "Pink Roses Bra" && layers[7].name === "Black and Orange Dots Coat") ||
    (layers[6].name === "Red Roses Bra" && layers[7].name === "Black and Orange Dots Coat") ||
    (layers[6].name === "Black and Lavender Kawaii Top" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[6].name === "Black and Pink Kawaii Top" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[8].name === "Pink Spike Hair" && layers[11].name === "Black Skull Beret") ||
    (layers[8].name === "Pink Spike Long Hair" && layers[11].name === "Black Skull Beret") ||
    (layers[4].name === "Full Body Tattoos IV" && layers[7].name === "Black and Lavender Coat") ||
    (layers[4].name === "Full Body Tattoos V" && layers[7].name === "Black and Lavender Coat") ||
    (layers[4].name === "Bandaid" && layers[7].name === "Black and Lavender Coat") ||
    (layers[4].name === "Full Body Tattoos I" && layers[7].name === "Black and Orange Dots Coat") ||
    (layers[4].name === "Full Body Tattoos II" && layers[7].name === "Black and Orange Dots Coat") ||
    (layers[4].name === "Full Body Tattoos III" && layers[7].name === "Black and Orange Dots Coat") ||
    (layers[4].name === "Full Body Tattoos IV" && layers[7].name === "Black and Orange Dots Coat") ||
    (layers[4].name === "Full Body Tattoos V" && layers[7].name === "Black and Orange Dots Coat") ||
    (layers[4].name === "Full Body Tattoos I" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[4].name === "Full Body Tattoos II" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[4].name === "Full Body Tattoos III" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[4].name === "Full Body Tattoos IV" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[4].name === "Full Body Tattoos V" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[4].name === "Full Body Tattoos I" && layers[7].name === "Black Spiderweb Coat") ||
    (layers[4].name === "Full Body Tattoos II" && layers[7].name === "Black Spiderweb Coat") ||
    (layers[4].name === "Full Body Tattoos III" && layers[7].name === "Black Spiderweb Coat") ||
    (layers[4].name === "Full Body Tattoos IV" && layers[7].name === "Black Spiderweb Coat") ||
    (layers[4].name === "Full Body Tattoos V" && layers[7].name === "Black Spiderweb Coat") ||
    (layers[4].name === "Full Body Tattoos I" && layers[7].name === "Green Coat") ||
    (layers[4].name === "Full Body Tattoos II" && layers[7].name === "Green Coat") ||
    (layers[8].name === "Red Spike Hair" && layers[11].name === "Black Skull Beret") ||
    (layers[8].name === "Red Spike Long Hair" && layers[11].name === "Black Skull Beret") ||
    (layers[8].name === "Black Bubble Pigtails" && layers[11].name === "Black Skull Beret") ||
    (layers[8].name === "Black Spike Hair" && layers[11].name === "Black Spiderweb Beret") ||
    (layers[8].name === "Blue Pigtails" && layers[11].name === "Black Spiderweb Beret") ||
    (layers[7].name === "Black Leopard Print Coat" && layers[8].name === "Color Cables Buns Braids") ||
    (layers[6].name === "Black and Red Kawaii Top" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[6].name === "Black and White Kawaii Top" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[6].name === "Black Cyber Longsleeve Top" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[6].name === "Black Safetypin Longsleeve" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[6].name === "Gold Cyber Bralette" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[6].name === "Pink Cyber Bralette" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[6].name === "Pink Cyber Longsleeve Top" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[6].name === "Black Patch Tee" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[6].name === "Pastels Patch Tee" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[6].name === "Lavender Bows Psychedelic Top" && layers[9].name === "Heart Metal Choker") ||
    (layers[6].name === "Red Bows Psychedelic Top" && layers[9].name === "Heart Metal Choker") ||
    (layers[6].name === "White Bows Psychedelic Top" && layers[9].name === "Heart Metal Choker") ||
    (layers[6].name === "Black Sailor Top" && layers[9].name === "Heart Metal Choker") ||
    (layers[6].name === "Pink Sailor Top" && layers[9].name === "Heart Metal Choker") ||
    (layers[4].name === "Full Body Tattoos III" && layers[7].name === "Green Coat") ||
    (layers[4].name === "Full Body Tattoos IV" && layers[7].name === "Green Coat") ||
    (layers[4].name === "Full Body Tattoos V" && layers[7].name === "Green Coat") ||
    (layers[4].name === "Full Body Tattoos I" && layers[7].name === "Green Psychodelic Coat") ||
    (layers[4].name === "Full Body Tattoos II" && layers[7].name === "Green Psychodelic Coat") ||
    (layers[4].name === "Full Body Tattoos III" && layers[7].name === "Green Psychodelic Coat") ||
    (layers[4].name === "Full Body Tattoos IV" && layers[7].name === "Green Psychodelic Coat") ||
    (layers[4].name === "Full Body Tattoos V" && layers[7].name === "Green Psychodelic Coat") ||
    (layers[4].name === "Full Body Tattoos I" && layers[7].name === "Leather Jacket") ||
    (layers[4].name === "Full Body Tattoos II" && layers[7].name === "Leather Jacket") ||
    (layers[4].name === "Full Body Tattoos III" && layers[7].name === "Leather Jacket") ||
    (layers[4].name === "Full Body Tattoos IV" && layers[7].name === "Leather Jacket") ||
    (layers[4].name === "Full Body Tattoos V" && layers[7].name === "Leather Jacket") ||
    (layers[4].name === "Full Body Tattoos I" && layers[7].name === "Leopard Print Coat") ||
    (layers[4].name === "Full Body Tattoos II" && layers[7].name === "Leopard Print Coat") ||
    (layers[4].name === "Full Body Tattoos III" && layers[7].name === "Leopard Print Coat") ||
    (layers[4].name === "Full Body Tattoos IV" && layers[7].name === "Leopard Print Coat") ||
    (layers[4].name === "Full Body Tattoos V" && layers[7].name === "Leopard Print Coat") ||
    (layers[6].name === "Green Ying Yang Harness Bra" && layers[9].name === "Leopard Heart Choker") ||
    (layers[6].name === "Pink Ying Yang Harness Bra" && layers[9].name === "Leopard Heart Choker") ||
    (layers[6].name === "White Ying Yang Harness Bra" && layers[9].name === "Leopard Heart Choker") ||
    (layers[6].name === "Blue Bows Psychedelic Top" && layers[9].name === "Leopard Heart Choker") ||
    (layers[6].name === "Lavender Bows Psychedelic Top" && layers[9].name === "Leopard Heart Choker") ||
    (layers[8].name === "Lavender Eye Bows Bob Hair" && layers[11].name === "Black Spiderweb Beret") ||
    (layers[8].name === "Limegreen Pigtails" && layers[11].name === "Black Spiderweb Beret") ||
    (layers[8].name === "Limegreen Spike Long Hair" && layers[11].name === "Black Spiderweb Beret") ||
    (layers[8].name === "Limegreen Spike Hair" && layers[11].name === "Black Spiderweb Beret") ||
    (layers[8].name === "Mint Eye Bows Bob Hair" && layers[11].name === "Black Spiderweb Beret") ||
    (layers[8].name === "Orange Pigtails" && layers[11].name === "Black Spiderweb Beret") ||
    (layers[6].name === "Red Flower Vest" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[6].name === "Yellow Ying Yang Vest" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[6].name === "Black Patch Tee" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[6].name === "Green Checkered Cardigan" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[4].name === "Full Body Tattoos I" && layers[7].name === "Pink Dots Coat") ||
    (layers[4].name === "Full Body Tattoos II" && layers[7].name === "Pink Dots Coat") ||
    (layers[4].name === "Full Body Tattoos III" && layers[7].name === "Pink Dots Coat") ||
    (layers[4].name === "Full Body Tattoos IV" && layers[7].name === "Pink Dots Coat") ||
    (layers[4].name === "Full Body Tattoos V" && layers[7].name === "Pink Dots Coat") ||
    (layers[4].name === "Full Body Tattoos I" && layers[7].name === "Pink Psychodelic Coat") ||
    (layers[4].name === "Full Body Tattoos II" && layers[7].name === "Pink Psychodelic Coat") ||
    (layers[2].name === "Lavender Scales" && layers[3].name === "Pink Blush Pink Lip") ||
    (layers[2].name === "Pink Scales" && layers[3].name === "Lavender Blush Black Lip") ||
    (layers[2].name === "Green Scales" && layers[3].name === "Lavender Blush Black Lip") ||
    (layers[2].name === "Lavender Scales" && layers[3].name === "Green Blush Black Lip") ||
    (layers[2].name === "Pink Scales" && layers[3].name === "Green Blush Black Lip") ||
    (layers[2].name === "Green Scales" && layers[3].name === "Pink Blush Pink Lip") ||
    (layers[4].name === "Full Body Tattoos III" && layers[7].name === "Pink Psychodelic Coat") ||
    (layers[4].name === "Full Body Tattoos IV" && layers[7].name === "Pink Psychodelic Coat") ||
    (layers[4].name === "Full Body Tattoos V" && layers[7].name === "Pink Psychodelic Coat") ||
    (layers[4].name === "Full Body Tattoos I" && layers[7].name === "Red Psychodelic Coat") ||
    (layers[4].name === "Full Body Tattoos II" && layers[7].name === "Red Psychodelic Coat") ||
    (layers[8].name === "Limegreen Spike Long Hair" && layers[9].name === "White Lock Choker") ||
    (layers[8].name === "Pink Spike Long Hair" && layers[9].name === "White Lock Choker") ||
    (layers[8].name === "Red Spike Long Hair" && layers[9].name === "White Lock Choker") ||
    (layers[6].name === "Pastels Patch Tee" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[6].name === "Red Checkered Cardigan" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[6].name === "Red Flower Vest" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[6].name === "Yellow Ying Yang Vest" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[8].name === "Orange Spike Hair" && layers[11].name === "Black Spiderweb Beret") ||
    (layers[8].name === "Pink Eye Bows Bob Hair" && layers[11].name === "Black Spiderweb Beret") ||
    (layers[8].name === "Pink Pigtails" && layers[11].name === "Black Spiderweb Beret") ||
    (layers[8].name === "Pink Spike Hair" && layers[11].name === "Black Spiderweb Beret") ||
    (layers[8].name === "Pink Spike Long Hair" && layers[11].name === "Black Spiderweb Beret") ||
    (layers[8].name === "Red Spike Hair" && layers[11].name === "Black Spiderweb Beret") ||
    (layers[8].name === "Red Spike Long Hair" && layers[11].name === "Black Spiderweb Beret") ||
    (layers[8].name === "Black Bubble Pigtails" && layers[11].name === "Black Spiderweb Beret") ||
    (layers[8].name === "Black Curly Horns" && layers[11].name === "Black Spike Cowbabe Hat") ||
    (layers[8].name === "Black Bubble Pigtails" && layers[11].name === "Black Spike Cowbabe Hat") ||
    (layers[8].name === "Black Curly Horns" && layers[11].name === "Black Weed Beret") ||
    (layers[8].name === "Weed Blue Braids" && layers[11].name === "Black Weed Beret") ||
    (layers[8].name === "Weed Lavender Braids" && layers[11].name === "Black Weed Beret") ||
    (layers[8].name === "Weed Pink Bob Hair" && layers[11].name === "Black Weed Beret") ||
    (layers[8].name === "Weed Light Green Bob Hair" && layers[11].name === "Black Weed Beret") ||
    (layers[8].name === "Weed Blue Braids" && layers[11].name === "Blue Baby Beret") ||
    (layers[8].name === "Weed Lavender Braids" && layers[11].name === "Blue Baby Beret") ||
    (layers[8].name === "Weed Pink Bob Hair" && layers[11].name === "Blue Baby Beret") ||
    (layers[8].name === "Weed Light Green Bob Hair" && layers[11].name === "Blue Baby Beret") ||
    (layers[8].name === "Color Cables Buns Braids" && layers[11].name === "Blue Safetypin Beret") ||
    (layers[8].name === "Color Cables Buns Braids" && layers[11].name === "Coding Pink Beret") ||
    (layers[8].name === "Black Spike Hair" && layers[11].name === "Green Horns") ||
    (layers[8].name === "Blue Pigtails" && layers[11].name === "Green Horns") ||
    (layers[8].name === "Lavender Eye Bows Bob Hair" && layers[11].name === "Green Horns") ||
    (layers[8].name === "Limegreen Pigtails" && layers[11].name === "Green Horns") ||
    (layers[8].name === "Limegreen Spike Long Hair" && layers[11].name === "Green Horns") ||
    (layers[8].name === "Limegreen Spike Hair" && layers[11].name === "Green Horns") ||
    (layers[8].name === "Mint Eye Bows Bob Hair" && layers[11].name === "Green Horns") ||
    (layers[8].name === "Orange Pigtails" && layers[11].name === "Green Horns") ||
    (layers[8].name === "Orange Spike Hair" && layers[11].name === "Green Horns") ||
    (layers[8].name === "Pink Eye Bows Bob Hair" && layers[11].name === "Green Horns") ||
    (layers[8].name === "Pink Pigtails" && layers[11].name === "Green Horns") ||
    (layers[8].name === "Pink Spike Hair" && layers[11].name === "Green Horns") ||
    (layers[8].name === "Pink Spike Long Hair" && layers[11].name === "Green Horns") ||
    (layers[8].name === "Red Spike Hair" && layers[11].name === "Green Horns") ||
    (layers[8].name === "Red Spike Long Hair" && layers[11].name === "Green Horns") ||
    (layers[8].name === "Weed Blue Braids" && layers[11].name === "Green Weed Beret") ||
    (layers[8].name === "Weed Lavender Braids" && layers[11].name === "Green Weed Beret") ||
    (layers[8].name === "Weed Pink Bob Hair" && layers[11].name === "Green Weed Beret") ||
    (layers[8].name === "Weed Light Green Bob Hair" && layers[11].name === "Green Weed Beret") ||
    (layers[8].name === "Black Spike Hair" && layers[11].name === "Horn Matches") ||
    (layers[8].name === "Blue Pigtails" && layers[11].name === "Horn Matches") ||
    (layers[8].name === "Lavender Eye Bows Bob Hair" && layers[11].name === "Horn Matches") ||
    (layers[8].name === "Limegreen Pigtails" && layers[11].name === "Horn Matches") ||
    (layers[8].name === "Limegreen Spike Long Hair" && layers[11].name === "Horn Matches") ||
    (layers[8].name === "Limegreen Spike Hair" && layers[11].name === "Horn Matches") ||
    (layers[8].name === "Mint Eye Bows Bob Hair" && layers[11].name === "Horn Matches") ||
    (layers[8].name === "Orange Pigtails" && layers[11].name === "Horn Matches") ||
    (layers[8].name === "Orange Spike Hair" && layers[11].name === "Horn Matches") ||
    (layers[8].name === "Pink Eye Bows Bob Hair" && layers[11].name === "Horn Matches") ||
    (layers[8].name === "Pink Pigtails" && layers[11].name === "Horn Matches") ||
    (layers[8].name === "Pink Spike Hair" && layers[11].name === "Horn Matches") ||
    (layers[8].name === "Pink Spike Long Hair" && layers[11].name === "Horn Matches") ||
    (layers[8].name === "Red Spike Hair" && layers[11].name === "Horn Matches") ||
    (layers[8].name === "Red Spike Long Hair" && layers[11].name === "Horn Matches") ||
    (layers[8].name === "Black Bubble Pigtails" && layers[11].name === "Horns Black Beret") ||
    (layers[8].name === "Weed Blue Braids" && layers[11].name === "Lavender Daisy Beret") ||
    (layers[8].name === "Weed Lavender Braids" && layers[11].name === "Lavender Daisy Beret") ||
    (layers[8].name === "Weed Pink Bob Hair" && layers[11].name === "Lavender Daisy Beret") ||
    (layers[8].name === "Weed Light Green Bob Hair" && layers[11].name === "Lavender Daisy Beret") ||
    (layers[8].name === "Venus Trap Hair" && layers[11].name === "Lavender Dots Beret") ||
    (layers[8].name === "Black Spike Hair" && layers[11].name === "Lavender Horns") ||
    (layers[8].name === "Blue Pigtails" && layers[11].name === "Lavender Horns") ||
    (layers[8].name === "Lavender Eye Bows Bob Hair" && layers[11].name === "Lavender Horns") ||
    (layers[8].name === "Limegreen Pigtails" && layers[11].name === "Lavender Horns") ||
    (layers[8].name === "Limegreen Spike Long Hair" && layers[11].name === "Lavender Horns") ||
    (layers[8].name === "Limegreen Spike Hair" && layers[11].name === "Lavender Horns") ||
    (layers[8].name === "Mint Eye Bows Bob Hair" && layers[11].name === "Lavender Horns") ||
    (layers[8].name === "Orange Pigtails" && layers[11].name === "Lavender Horns") ||
    (layers[8].name === "Orange Spike Hair" && layers[11].name === "Lavender Horns") ||
    (layers[8].name === "Pink Eye Bows Bob Hair" && layers[11].name === "Lavender Horns") ||
    (layers[8].name === "Pink Pigtails" && layers[11].name === "Lavender Horns") ||
    (layers[8].name === "Pink Spike Hair" && layers[11].name === "Lavender Horns") ||
    (layers[8].name === "Pink Spike Long Hair" && layers[11].name === "Lavender Horns") ||
    (layers[8].name === "Red Spike Hair" && layers[11].name === "Lavender Horns") ||
    (layers[8].name === "Red Spike Long Hair" && layers[11].name === "Lavender Horns") ||
    (layers[8].name === "Lavender Roses Hair" && layers[11].name === "Lavender Roses Hair") ||
    (layers[8].name === "Black Spike Hair" && layers[11].name === "Lavender Skull Beret") ||
    (layers[8].name === "Blue Pigtails" && layers[11].name === "Lavender Skull Beret") ||
    (layers[8].name === "Lavender Eye Bows Bob Hair" && layers[11].name === "Lavender Skull Beret") ||
    (layers[8].name === "Limegreen Pigtails" && layers[11].name === "Lavender Skull Beret") ||
    (layers[8].name === "Limegreen Spike Hair" && layers[11].name === "Lavender Skull Beret") ||
    (layers[8].name === "Limegreen Spike Long Hair" && layers[11].name === "Lavender Skull Beret") ||
    (layers[8].name === "Mint Eye Bows Bob Hair" && layers[11].name === "Lavender Skull Beret") ||
    (layers[8].name === "Orange Pigtails" && layers[11].name === "Lavender Skull Beret") ||
    (layers[8].name === "Orange Spike Hair" && layers[11].name === "Lavender Skull Beret") ||
    (layers[8].name === "Pink Eye Bows Bob Hair" && layers[11].name === "Lavender Skull Beret") ||
    (layers[8].name === "Pink Pigtails" && layers[11].name === "Lavender Skull Beret") ||
    (layers[8].name === "Pink Spike Hair" && layers[11].name === "Lavender Skull Beret") ||
    (layers[8].name === "Pink Spike Long Hair" && layers[11].name === "Lavender Skull Beret") ||
    (layers[8].name === "Red Spike Hair" && layers[11].name === "Lavender Skull Beret") ||
    (layers[8].name === "Red Spike Long Hair" && layers[11].name === "Lavender Skull Beret") ||
    (layers[8].name === "Color Cables Buns Braids" && layers[11].name === "Leopard Print Beret") ||
    (layers[8].name === "Venus Trap Hair" && layers[11].name === "Leopard Print Beret") ||
    (layers[8].name === "Black Spike Hair" && layers[11].name === "Lime Skull Beret") ||
    (layers[8].name === "Blue Pigtails" && layers[11].name === "Lime Skull Beret") ||
    (layers[8].name === "Lavender Eye Bows Bob Hair" && layers[11].name === "Lime Skull Beret") ||
    (layers[8].name === "Limegreen Pigtails" && layers[11].name === "Lime Skull Beret") ||
    (layers[8].name === "Limegreen Spike Long Hair" && layers[11].name === "Lime Skull Beret") ||
    (layers[8].name === "Limegreen Spike Hair" && layers[11].name === "Lime Skull Beret") ||
    (layers[8].name === "Mint Eye Bows Bob Hair" && layers[11].name === "Lime Skull Beret") ||
    (layers[8].name === "Orange Pigtails" && layers[11].name === "Lime Skull Beret") ||
    (layers[8].name === "Orange Spike Hair" && layers[11].name === "Lime Skull Beret") ||
    (layers[8].name === "Pink Eye Bows Bob Hair" && layers[11].name === "Lime Skull Beret") ||
    (layers[8].name === "Pink Pigtails" && layers[11].name === "Lime Skull Beret") ||
    (layers[8].name === "Pink Spike Hair" && layers[11].name === "Lime Skull Beret") ||
    (layers[8].name === "Pink Spike Long Hair" && layers[11].name === "Lime Skull Beret") ||
    (layers[8].name === "Red Spike Hair" && layers[11].name === "Lime Skull Beret") ||
    (layers[8].name === "Red Spike Long Hair" && layers[11].name === "Lime Skull Beret") ||
    (layers[8].name === "Light Orange Side Ponytail" && layers[11].name === "Orange Catrina Flowers") ||
    (layers[8].name === "Red Side Ponytail" && layers[11].name === "Orange Catrina Flowers") ||
    (layers[8].name === "Black Curly Horns" && layers[11].name === "Orange Catrina Flowers") ||
    (layers[8].name === "Baby Blue Buns Braids" && layers[11].name === "Orange Roses Crown") ||
    (layers[8].name === "Light Green Buns Braids" && layers[11].name === "Orange Roses Crown") ||
    (layers[8].name === "Pink Buns Braids" && layers[11].name === "Orange Roses Crown") ||
    (layers[8].name === "Lavender Roses Hair" && layers[11].name === "Orange Roses Crown") ||
    (layers[8].name === "Pink Roses Hair" && layers[11].name === "Orange Roses Crown") ||
    (layers[8].name === "Red Roses Hair" && layers[11].name === "Orange Roses Crown") ||
    (layers[8].name === "Orange Roses Hair" && layers[11].name === "Orange Roses Crown") ||
    (layers[8].name === "Orange Roses Hair" && layers[11].name === "Orange Roses Hair") ||
    (layers[8].name === "Weed Blue Braids" && layers[11].name === "Pink Baby Beret") ||
    (layers[8].name === "Weed Lavender Braids" && layers[11].name === "Pink Baby Beret") ||
    (layers[8].name === "Weed Pink Bob Hair" && layers[11].name === "Pink Baby Beret") ||
    (layers[8].name === "Weed Light Green Bob Hair" && layers[11].name === "Pink Baby Beret") ||
    (layers[8].name === "Light Orange Side Ponytail" && layers[11].name === "Pink Catrina Flowers") ||
    (layers[8].name === "Red Side Ponytail" && layers[11].name === "Pink Catrina Flowers") ||
    (layers[8].name === "Black Curly Horns" && layers[11].name === "Pink Catrina Flowers") ||
    (layers[8].name === "Lavender Roses Hair" && layers[11].name === "Pink Catrina Flowers") ||
    (layers[8].name === "Pink Roses Hair" && layers[11].name === "Pink Catrina Flowers") ||
    (layers[8].name === "Red Roses Hair" && layers[11].name === "Pink Catrina Flowers") ||
    (layers[8].name === "Orange Roses Hair" && layers[11].name === "Pink Catrina Flowers") ||
    (layers[8].name === "Venus Trap Hair" && layers[11].name === "Pink Dots Beret") ||
    (layers[8].name === "Black Spike Hair" && layers[11].name === "Pink Red Horns") ||
    (layers[8].name === "Blue Pigtails" && layers[11].name === "Pink Red Horns") ||
    (layers[8].name === "Lavender Eye Bows Bob Hair" && layers[11].name === "Pink Red Horns") ||
    (layers[8].name === "Limegreen Pigtails" && layers[11].name === "Pink Red Horns") ||
    (layers[8].name === "Limegreen Spike Long Hair" && layers[11].name === "Pink Red Horns") ||
    (layers[8].name === "Limegreen Spike Hair" && layers[11].name === "Pink Red Horns") ||
    (layers[8].name === "Mint Eye Bows Bob Hair" && layers[11].name === "Pink Red Horns") ||
    (layers[8].name === "Orange Pigtails" && layers[11].name === "Pink Red Horns") ||
    (layers[8].name === "Orange Spike Hair" && layers[11].name === "Pink Red Horns") ||
    (layers[8].name === "Pink Eye Bows Bob Hair" && layers[11].name === "Pink Red Horns") ||
    (layers[8].name === "Pink Pigtails" && layers[11].name === "Pink Red Horns") ||
    (layers[8].name === "Pink Spike Hair" && layers[11].name === "Pink Red Horns") ||
    (layers[8].name === "Pink Spike Long Hair" && layers[11].name === "Pink Red Horns") ||
    (layers[8].name === "Red Spike Hair" && layers[11].name === "Pink Red Horns") ||
    (layers[8].name === "Red Spike Long Hair" && layers[11].name === "Pink Red Horns") ||
    (layers[8].name === "Baby Blue Buns Braids" && layers[11].name === "Pink Roses Crown") ||
    (layers[8].name === "Light Green Buns Braids" && layers[11].name === "Pink Roses Crown") ||
    (layers[8].name === "Pink Buns Braids" && layers[11].name === "Pink Roses Crown") ||
    (layers[8].name === "Lavender Roses Hair" && layers[11].name === "Pink Roses Crown") ||
    (layers[8].name === "Pink Roses Hair" && layers[11].name === "Pink Roses Crown") ||
    (layers[8].name === "Red Roses Hair" && layers[11].name === "Pink Roses Crown") ||
    (layers[8].name === "Orange Roses Hair" && layers[11].name === "Pink Roses Crown") ||
    (layers[8].name === "Pink Roses Hair" && layers[11].name === "Pink Roses Hair") ||
    (layers[8].name === "Black Spike Hair" && layers[11].name === "Pink Skull Beret") ||
    (layers[8].name === "Blue Pigtails" && layers[11].name === "Pink Skull Beret") ||
    (layers[8].name === "Lavender Eye Bows Bob Hair" && layers[11].name === "Pink Skull Beret") ||
    (layers[8].name === "Limegreen Pigtails" && layers[11].name === "Pink Skull Beret") ||
    (layers[8].name === "Limegreen Spike Long Hair" && layers[11].name === "Pink Skull Beret") ||
    (layers[8].name === "Limegreen Spike Hair" && layers[11].name === "Pink Skull Beret") ||
    (layers[8].name === "Mint Eye Bows Bob Hair" && layers[11].name === "Pink Skull Beret") ||
    (layers[8].name === "Orange Pigtails" && layers[11].name === "Pink Skull Beret") ||
    (layers[8].name === "Orange Spike Hair" && layers[11].name === "Pink Skull Beret") ||
    (layers[8].name === "Pink Eye Bows Bob Hair" && layers[11].name === "Pink Skull Beret") ||
    (layers[8].name === "Pink Pigtails" && layers[11].name === "Pink Skull Beret") ||
    (layers[8].name === "Pink Spike Hair" && layers[11].name === "Pink Skull Beret") ||
    (layers[8].name === "Pink Spike Long Hair" && layers[11].name === "Pink Skull Beret") ||
    (layers[8].name === "Red Spike Hair" && layers[11].name === "Pink Skull Beret") ||
    (layers[8].name === "Red Spike Long Hair" && layers[11].name === "Pink Skull Beret") ||
    (layers[8].name === "Black Spike Hair" && layers[11].name === "Pink Spiderweb Beret") ||
    (layers[8].name === "Blue Pigtails" && layers[11].name === "Pink Spiderweb Beret") ||
    (layers[8].name === "Lavender Eye Bows Bob Hair" && layers[11].name === "Pink Spiderweb Beret") ||
    (layers[8].name === "Limegreen Pigtails" && layers[11].name === "Pink Spiderweb Beret") ||
    (layers[8].name === "Limegreen Spike Long Hair" && layers[11].name === "Pink Spiderweb Beret") ||
    (layers[8].name === "Limegreen Spike Hair" && layers[11].name === "Pink Spiderweb Beret") ||
    (layers[8].name === "Mint Eye Bows Bob Hair" && layers[11].name === "Pink Spiderweb Beret") ||
    (layers[8].name === "Orange Pigtails" && layers[11].name === "Pink Spiderweb Beret") ||
    (layers[8].name === "Orange Spike Hair" && layers[11].name === "Pink Spiderweb Beret") ||
    (layers[8].name === "Pink Eye Bows Bob Hair" && layers[11].name === "Pink Spiderweb Beret") ||
    (layers[4].name === "Full Body Tattoos III" && layers[7].name === "Red Psychodelic Coat") ||
    (layers[4].name === "Full Body Tattoos IV" && layers[7].name === "Red Psychodelic Coat") ||
    (layers[4].name === "Full Body Tattoos V" && layers[7].name === "Red Psychodelic Coat") ||
    (layers[4].name === "Full Body Tattoos I " && layers[7].name === "Red Tartan Coat") ||
    (layers[4].name === "Full Body Tattoos II" && layers[7].name === "Red Tartan Coat") ||
    (layers[4].name === "Full Body Tattoos III" && layers[7].name === "Red Tartan Coat") ||
    (layers[4].name === "Full Body Tattoos IV" && layers[7].name === "Red Tartan Coat") ||
    (layers[4].name === "Full Body Tattoos V" && layers[7].name === "Red Tartan Coat") ||
    (layers[4].name === "Full Body Tattoos I " && layers[7].name === "Zebra Print Coat") ||
    (layers[4].name === "Full Body Tattoos II" && layers[7].name === "Zebra Print Coat") ||
    (layers[4].name === "Full Body Tattoos III" && layers[7].name === "Zebra Print Coat") ||
    (layers[4].name === "Full Body Tattoos IV" && layers[7].name === "Zebra Print Coat") ||
    (layers[4].name === "Full Body Tattoos V" && layers[7].name === "Zebra Print Coat") ||
    (layers[4].name === "Bandaid" && layers[6].name === "Pink Cowbabe Flower Shirt") ||
    (layers[4].name === "Boot Tattoo" && layers[6].name === "Pink Cowbabe Flower Shirt") ||
    (layers[4].name === "Cactus Tattoo" && layers[6].name === "Pink Cowbabe Flower Shirt") ||
    (layers[4].name === "Shoehorse Tattoo" && layers[6].name === "Pink Cowbabe Flower Shirt") ||
    (layers[4].name === "Bandaid" && layers[6].name === "Yellow Cowbabe Flower Shirt") ||
    (layers[4].name === "Boot Tattoo" && layers[6].name === "Yellow Cowbabe Flower Shirt") ||
    (layers[4].name === "Cactus Tattoo" && layers[6].name === "Yellow Cowbabe Flower Shirt") ||
    (layers[4].name === "Shoehorse Tattoo" && layers[6].name === "Yellow Cowbabe Flower Shirt") ||
    (layers[4].name === "Full Body Tattoos I" && layers[6].name === "Black and Lavender Kawaii Top") ||
    (layers[4].name === "Full Body Tattoos II" && layers[6].name === "Black and Lavender Kawaii Top") ||
    (layers[4].name === "Full Body Tattoos III" && layers[6].name === "Black and Lavender Kawaii Top") ||
    (layers[4].name === "Full Body Tattoos IV" && layers[6].name === "Black and Lavender Kawaii Top") ||
    (layers[4].name === "Full Body Tattoos V" && layers[6].name === "Black and Lavender Kawaii Top") ||
    (layers[6].name === "Red Bows Psychedelic Top" && layers[9].name === "Leopard Heart Choker") ||
    (layers[6].name === "White Bows Psychedelic Top" && layers[9].name === "Leopard Heart Choker") ||
    (layers[6].name === "Black Sailor Top" && layers[9].name === "Leopard Heart Choker") ||
    (layers[6].name === "Pink Sailor Top" && layers[9].name === "Leopard Heart Choker") ||
    (layers[6].name === "Black Lace Collar Safetypin Top" && layers[9].name === "Leopard Heart Choker ") ||
    (layers[6].name === "Black Sailor Top" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[6].name === "Blue Cherries Cardigan" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[6].name === "Blue Cherries Cardigan" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[6].name === "Lavender Bows Psychedelic Top" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[6].name === "Musical Notes Cardigan" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[6].name === "Musical Notes Cardigan" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[6].name === "Pink Cherries Cardigan" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[6].name === "Pink Cherries Cardigan" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[6].name === "Pink Sailor Top" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[6].name === "Red Bows Psychedelic Top" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[6].name === "White Bows Psychedelic Top" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[6].name === "Baby Blue Checkered Cardigan" && layers[7].name === "Black Leopard Print Coat") ||
    (layers[6].name === "Lavender Roses Bra" && layers[7].name === "Black Spiderweb Coat") ||
    (layers[6].name === "Orange Roses Bra" && layers[7].name === "Black Spiderweb Coat") ||
    (layers[6].name === "Pink Roses Bra" && layers[7].name === "Black Spiderweb Coat") ||
    (layers[6].name === "Red Roses Bra" && layers[7].name === "Black Spiderweb Coat") ||
    (layers[4].name === "Full Body Tattoos I" && layers[6].name === "Black and Pink Kawaii Top") ||
    (layers[4].name === "Full Body Tattoos II" && layers[6].name === "Black and Pink Kawaii Top") ||
    (layers[4].name === "Full Body Tattoos III" && layers[6].name === "Black and Pink Kawaii Top") ||
    (layers[4].name === "Full Body Tattoos IV" && layers[6].name === "Black and Pink Kawaii Top") ||
    (layers[4].name === "Full Body Tattoos V" && layers[6].name === "Black and Pink Kawaii Top") ||
    (layers[4].name === "Full Body Tattoos I" && layers[6].name === "Black and Red Kawaii Top") ||
    (layers[4].name === "Full Body Tattoos II" && layers[6].name === "Black and Red Kawaii Top") ||
    (layers[4].name === "Full Body Tattoos III" && layers[6].name === "Black and Red Kawaii Top") ||
    (layers[4].name === "Full Body Tattoos IV" && layers[6].name === "Black and Red Kawaii Top") ||
    (layers[4].name === "Full Body Tattoos V" && layers[6].name === "Black and Red Kawaii Top") ||
    (layers[4].name === "Full Body Tattoos I" && layers[6].name === "Black and White Kawaii Top") ||
    (layers[4].name === "Full Body Tattoos II" && layers[6].name === "Black and White Kawaii Top") ||
    (layers[4].name === "Full Body Tattoos III" && layers[6].name === "Black and White Kawaii Top") ||
    (layers[4].name === "Full Body Tattoos IV" && layers[6].name === "Black and White Kawaii Top") ||
    (layers[4].name === "Full Body Tattoos V" && layers[6].name === "Black and White Kawaii Top") ||
    (layers[4].name === "Full Body Tattoos I" && layers[6].name === "Black Cyber Longsleeve Top") ||
    (layers[4].name === "Full Body Tattoos II" && layers[6].name === "Black Cyber Longsleeve Top") ||
    (layers[4].name === "Full Body Tattoos III" && layers[6].name === "Black Cyber Longsleeve Top") ||
    (layers[4].name === "Full Body Tattoos IV" && layers[6].name === "Black Cyber Longsleeve Top") ||
    (layers[4].name === "Full Body Tattoos V" && layers[6].name === "Black Cyber Longsleeve Top") ||
    (layers[4].name === "Full Body Tattoos I" && layers[6].name === "Black Safetypin Longsleeve") ||
    (layers[4].name === "Full Body Tattoos II" && layers[6].name === "Black Safetypin Longsleeve") ||
    (layers[4].name === "Full Body Tattoos III" && layers[6].name === "Black Safetypin Longsleeve") ||
    (layers[4].name === "Full Body Tattoos IV" && layers[6].name === "Black Safetypin Longsleeve") ||
    (layers[4].name === "Full Body Tattoos V" && layers[6].name === "Black Safetypin Longsleeve") ||
    (layers[4].name === "Full Body Tattoos I" && layers[6].name === "Pink Cyber Longsleeve Top") ||
    (layers[4].name === "Full Body Tattoos II" && layers[6].name === "Pink Cyber Longsleeve Top") ||
    (layers[4].name === "Full Body Tattoos III" && layers[6].name === "Pink Cyber Longsleeve Top") ||
    (layers[4].name === "Full Body Tattoos IV" && layers[6].name === "Pink Cyber Longsleeve Top") ||
    (layers[4].name === "Full Body Tattoos V" && layers[6].name === "Pink Cyber Longsleeve Top") ||
    (layers[4].name === "Full Body Tattoos I" && layers[6].name === "Baby Blue Checkered Cardigan") ||
    (layers[4].name === "Full Body Tattoos II" && layers[6].name === "Baby Blue Checkered Cardigan") ||
    (layers[4].name === "Full Body Tattoos III" && layers[6].name === "Baby Blue Checkered Cardigan") ||
    (layers[4].name === "Full Body Tattoos IV" && layers[6].name === "Baby Blue Checkered Cardigan") ||
    (layers[6].name === "Black Lace Collar Safetypin Top" && layers[9].name === "Leopard Heart Choker ") ||
    (layers[6].name === "Blue Bow Sailor Top" && layers[9].name === "Leopard Heart Choker ") ||
    (layers[6].name === "Red Bow Black Sailor Top" && layers[9].name === "Leopard Heart Choker ") ||
    (layers[6].name === "Red Bow Sailor Top" && layers[9].name === "Leopard Heart Choker ") ||
    (layers[6].name === "Black Ribcage Halter Top" && layers[9].name === "Moon Choker") ||
    (layers[6].name === "Blue Ribcage Halter Top" && layers[9].name === "Moon Choker") ||
    (layers[6].name === "Lavender Ribcage Halter Top" && layers[9].name === "Moon Choker") ||
    (layers[6].name === "Lime Ribcage Halter Top" && layers[9].name === "Moon Choker") ||
    (layers[6].name === "Pink Ribcage Halter Top" && layers[9].name === "Moon Choker") ||
    (layers[6].name === "Lavender Roses Bra" && layers[9].name === "Moon Choker") ||
    (layers[6].name === "Orange Roses Bra" && layers[9].name === "Moon Choker") ||
    (layers[6].name === "Pink Roses Bra" && layers[9].name === "Moon Choker") ||
    (layers[6].name === "Red Roses Bra" && layers[9].name === "Moon Choker") ||
    (layers[6].name === "Black Lace Collar Safetypin Top" && layers[9].name === "Pink Heart Choker ") ||
    (layers[6].name === "Black Lace Collar Safetypin Top" && layers[9].name === "Pink Heart Choker ") ||
    (layers[6].name === "Blue Bow Sailor Top" && layers[9].name === "Pink Heart Choker ") ||
    (layers[6].name === "Red Bow Black Sailor Top" && layers[9].name === "Pink Heart Choker ") ||
    (layers[6].name === "Red Bow Sailor Top" && layers[9].name === "Pink Heart Choker ") ||
    (layers[6].name === "Blue Bows Psychedelic Top" && layers[9].name === "Pink Heart Choker ") ||
    (layers[6].name === "Lavender Bows Psychedelic Top" && layers[9].name === "Pink Heart Choker ") ||
    (layers[6].name === "Red Bows Psychedelic Top" && layers[9].name === "Pink Heart Choker ") ||
    (layers[6].name === "White Bows Psychedelic Top" && layers[9].name === "Pink Heart Choker ") ||
    (layers[6].name === "Black Ribcage Halter Top" && layers[9].name === "Skull Chain Choker") ||
    (layers[6].name === "Blue Ribcage Halter Top" && layers[9].name === "Skull Chain Choker") ||
    (layers[6].name === "Green Checkered Safetypin Top" && layers[7].name === "Green Coat") ||
    (layers[6].name === "Red Checkered Safetypin Top" && layers[7].name === "Green Coat") ||
    (layers[6].name === "Black Sailor Top" && layers[7].name === "Green Psychodelic Coat") ||
    (layers[6].name === "Blue Cherries Cardigan" && layers[7].name === "Green Psychodelic Coat") ||
    (layers[6].name === "Blue Cherries Cardigan" && layers[7].name === "Green Psychodelic Coat") ||
    (layers[6].name === "Lavender Bows Psychedelic Top" && layers[7].name === "Green Psychodelic Coat") ||
    (layers[6].name === "Musical Notes Cardigan" && layers[7].name === "Green Psychodelic Coat") ||
    (layers[6].name === "Musical Notes Cardigan" && layers[7].name === "Green Psychodelic Coat") ||
    (layers[6].name === "Pink Cherries Cardigan" && layers[7].name === "Green Psychodelic Coat") ||
    (layers[6].name === "Pink Cherries Cardigan" && layers[7].name === "Green Psychodelic Coat") ||
    (layers[6].name === "Pink Sailor Top" && layers[7].name === "Green Psychodelic Coat") ||
    (layers[6].name === "Red Bows Psychedelic Top" && layers[7].name === "Green Psychodelic Coat") ||
    (layers[6].name === "White Bows Psychedelic Top" && layers[7].name === "Green Psychodelic Coat") ||
    (layers[6].name === "Beat it Creep Green Tee" && layers[7].name === "Leather Jacket") ||
    (layers[6].name === "Beat it Creep Red Tee" && layers[7].name === "Leather Jacket") ||
    (layers[6].name === "Lolita Dress" && layers[7].name === "Leather Jacket") ||
    (layers[6].name === "Mesh Sleeves Black Tee" && layers[7].name === "Leather Jacket") ||
    (layers[6].name === "Daisy Lavender Tee" && layers[7].name === "Leather Jacket") ||
    (layers[6].name === "Green Checkered Safetypin Top" && layers[7].name === "Leather Jacket") ||
    (layers[6].name === "Lavender Cowprint Tee" && layers[7].name === "Leather Jacket") ||
    (layers[6].name === "Red Checkered Safetypin Top" && layers[7].name === "Leather Jacket") ||
    (layers[6].name === "White Cowprint Tee" && layers[7].name === "Leather Jacket") ||
    (layers[6].name === "Green Checkered Safetypin Top" && layers[7].name === "Leopard Print Coat") ||
    (layers[6].name === "Red Checkered Safetypin Top" && layers[7].name === "Leopard Print Coat") ||
    (layers[6].name === "Lavender Roses Bra" && layers[7].name === "Pink Dots Coat") ||
    (layers[6].name === "Orange Roses Bra" && layers[7].name === "Pink Dots Coat") ||
    (layers[6].name === "Pink Roses Bra" && layers[7].name === "Pink Dots Coat") ||
    (layers[6].name === "Red Roses Bra" && layers[7].name === "Pink Dots Coat") ||
    (layers[6].name === "Baby Blue Checkered Cardigan" && layers[7].name === "Pink Dots Coat") ||
    (layers[6].name === "Green Checkered Cardigan" && layers[7].name === "Pink Dots Coat") ||
    (layers[6].name === "Red Checkered Cardigan" && layers[7].name === "Pink Dots Coat") ||
    (layers[6].name === "Black Sailor Top" && layers[7].name === "Pink Psychodelic Coat") ||
    (layers[6].name === "Blue Cherries Cardigan" && layers[7].name === "Pink Psychodelic Coat") ||
    (layers[6].name === "Blue Cherries Cardigan" && layers[7].name === "Pink Psychodelic Coat") ||
    (layers[6].name === "Lavender Bows Psychedelic Top" && layers[7].name === "Pink Psychodelic Coat") ||
    (layers[6].name === "Musical Notes Cardigan" && layers[7].name === "Pink Psychodelic Coat") ||
    (layers[6].name === "Musical Notes Cardigan" && layers[7].name === "Pink Psychodelic Coat") ||
    (layers[6].name === "Pink Cherries Cardigan" && layers[7].name === "Pink Psychodelic Coat") ||
    (layers[6].name === "Pink Cherries Cardigan" && layers[7].name === "Pink Psychodelic Coat") ||
    (layers[6].name === "Pink Sailor Top" && layers[7].name === "Pink Psychodelic Coat") ||
    (layers[6].name === "Red Bows Psychedelic Top" && layers[7].name === "Pink Psychodelic Coat") ||
    (layers[6].name === "White Bows Psychedelic Top" && layers[7].name === "Pink Psychodelic Coat") ||
    (layers[6].name === "Black Sailor Top" && layers[7].name === "Red Psychodelic Coat") ||
    (layers[6].name === "Blue Cherries Cardigan" && layers[7].name === "Red Psychodelic Coat") ||
    (layers[6].name === "Lavender Ribcage Halter Top" && layers[9].name === "Skull Chain Choker") ||
    (layers[6].name === "Lime Ribcage Halter Top" && layers[9].name === "Skull Chain Choker") ||
    (layers[6].name === "Pink Ribcage Halter Top" && layers[9].name === "Skull Chain Choker") ||
    (layers[6].name === "Lavender Roses Bra" && layers[9].name === "Skull Chain Choker") ||
    (layers[6].name === "Orange Roses Bra" && layers[9].name === "Skull Chain Choker") ||
    (layers[6].name === "Pink Roses Bra" && layers[9].name === "Skull Chain Choker") ||
    (layers[6].name === "Red Roses Bra" && layers[9].name === "Skull Chain Choker") ||
    (layers[6].name === "Black Ribcage Halter Top" && layers[9].name === "Spike Choker") ||
    (layers[4].name === "Full Body Tattoos V" && layers[6].name === "Baby Blue Checkered Cardigan") ||
    (layers[4].name === "Bandaid" && layers[6].name === "Baby Blue Checkered Cardigan") ||
    (layers[4].name === "Full Body Tattoos I" && layers[6].name === "Black Daisy Longsleeve") ||
    (layers[4].name === "Full Body Tattoos II" && layers[6].name === "Black Daisy Longsleeve") ||
    (layers[4].name === "Full Body Tattoos III" && layers[6].name === "Black Daisy Longsleeve") ||
    (layers[4].name === "Full Body Tattoos IV" && layers[6].name === "Black Daisy Longsleeve") ||
    (layers[4].name === "Full Body Tattoos V" && layers[6].name === "Black Daisy Longsleeve") ||
    (layers[4].name === "Bandaid" && layers[6].name === "Black Daisy Longsleeve") ||
    (layers[4].name === "Full Body Tattoos I" && layers[6].name === "Black Sailor Top") ||
    (layers[4].name === "Full Body Tattoos II" && layers[6].name === "Black Sailor Top") ||
    (layers[4].name === "Full Body Tattoos III" && layers[6].name === "Black Sailor Top") ||
    (layers[4].name === "Full Body Tattoos IV" && layers[6].name === "Black Sailor Top") ||
    (layers[4].name === "Full Body Tattoos V" && layers[6].name === "Black Sailor Top") ||
    (layers[4].name === "Full Body Tattoos I" && layers[6].name === "Blue Cherries Cardigan") ||
    (layers[4].name === "Full Body Tattoos II" && layers[6].name === "Blue Cherries Cardigan") ||
    (layers[4].name === "Full Body Tattoos III" && layers[6].name === "Blue Cherries Cardigan") ||
    (layers[4].name === "Full Body Tattoos IV" && layers[6].name === "Blue Cherries Cardigan") ||
    (layers[4].name === "Full Body Tattoos V" && layers[6].name === "Blue Cherries Cardigan") ||
    (layers[4].name === "Full Body Tattoos I" && layers[6].name === "Green Checkered Cardigan") ||
    (layers[4].name === "Full Body Tattoos II" && layers[6].name === "Green Checkered Cardigan") ||
    (layers[4].name === "Full Body Tattoos III" && layers[6].name === "Green Checkered Cardigan") ||
    (layers[4].name === "Full Body Tattoos IV" && layers[6].name === "Green Checkered Cardigan") ||
    (layers[4].name === "Full Body Tattoos V" && layers[6].name === "Green Checkered Cardigan") ||
    (layers[4].name === "Bandaid" && layers[6].name === "Green Checkered Cardigan") ||
    (layers[4].name === "Full Body Tattoos I" && layers[6].name === "Green Daisy Longsleeve") ||
    (layers[4].name === "Full Body Tattoos II" && layers[6].name === "Green Daisy Longsleeve") ||
    (layers[4].name === "Full Body Tattoos III" && layers[6].name === "Green Daisy Longsleeve") ||
    (layers[4].name === "Full Body Tattoos IV" && layers[6].name === "Green Daisy Longsleeve") ||
    (layers[4].name === "Full Body Tattoos V" && layers[6].name === "Green Daisy Longsleeve") ||
    (layers[4].name === "Bandaid" && layers[6].name === "Green Daisy Longsleeve") ||
    (layers[4].name === "Full Body Tattoos I" && layers[6].name === "Lavender Daisy Longsleeve") ||
    (layers[4].name === "Full Body Tattoos II" && layers[6].name === "Lavender Daisy Longsleeve") ||
    (layers[4].name === "Full Body Tattoos III" && layers[6].name === "Lavender Daisy Longsleeve") ||
    (layers[6].name === "Blue Ribcage Halter Top" && layers[9].name === "Spike Choker") ||
    (layers[6].name === "Lavender Ribcage Halter Top" && layers[9].name === "Spike Choker") ||
    (layers[6].name === "Lime Ribcage Halter Top" && layers[9].name === "Spike Choker") ||
    (layers[6].name === "Pink Ribcage Halter Top" && layers[9].name === "Spike Choker") ||
    (layers[6].name === "Lavender Roses Bra" && layers[9].name === "Spike Choker") ||
    (layers[6].name === "Orange Roses Bra" && layers[9].name === "Spike Choker") ||
    (layers[6].name === "Pink Roses Bra" && layers[9].name === "Spike Choker") ||
    (layers[6].name === "Red Roses Bra" && layers[9].name === "Spike Choker") ||
    (layers[6].name === "Happy Face Black Halter Top" && layers[9].name === "White Chain Ring Choker") ||
    (layers[6].name === "Happy Face White Halter Top" && layers[9].name === "White Chain Ring Choker") ||
    (layers[6].name === "Black Daisy Longsleeve" && layers[9].name === "White Chain Ring Choker") ||
    (layers[6].name === "Lavender Daisy Longsleeve" && layers[9].name === "White Chain Ring Choker") ||
    (layers[6].name === "Green Daisy Longsleeve" && layers[9].name === "White Chain Ring Choker") ||
    (layers[6].name === "Green Ying Yang Harness Bra" && layers[9].name === "White Lock Choker") ||
    (layers[6].name === "Pink Ying Yang Harness Bra" && layers[9].name === "White Lock Choker") ||
    (layers[6].name === "White Ying Yang Harness Bra" && layers[9].name === "White Lock Choker") ||
    (layers[6].name === "Blue Bows Psychedelic Top" && layers[9].name === "White Lock Choker") ||
    (layers[6].name === "Lavender Bows Psychedelic Top" && layers[9].name === "White Lock Choker") ||
    (layers[6].name === "Red Bows Psychedelic Top" && layers[9].name === "White Lock Choker") ||
    (layers[6].name === "White Bows Psychedelic Top" && layers[9].name === "White Lock Choker") ||
    (layers[6].name === "Black Sailor Top" && layers[9].name === "White Lock Choker") ||
    (layers[6].name === "Pink Sailor Top" && layers[9].name === "White Lock Choker") ||
    (layers[4].name === "Full Body Tattoos IV" && layers[6].name === "Lavender Daisy Longsleeve") ||
    (layers[4].name === "Full Body Tattoos V" && layers[6].name === "Lavender Daisy Longsleeve") ||
    (layers[4].name === "Bandaid" && layers[6].name === "Lavender Daisy Longsleeve") ||
    (layers[8].name === "Pink Pigtails" && layers[11].name === "Pink Spiderweb Beret") ||
    (layers[8].name === "Pink Spike Hair" && layers[11].name === "Pink Spiderweb Beret") ||
    (layers[8].name === "Pink Spike Long Hair" && layers[11].name === "Pink Spiderweb Beret") ||
    (layers[8].name === "Red Spike Hair" && layers[11].name === "Pink Spiderweb Beret") ||
    (layers[8].name === "Red Spike Long Hair" && layers[11].name === "Pink Spiderweb Beret") ||
    (layers[8].name === "Light Orange Side Ponytail" && layers[11].name === "Red Catrina Flowers") ||
    (layers[8].name === "Red Side Ponytail" && layers[11].name === "Red Catrina Flowers") ||
    (layers[8].name === "Black Curly Horns" && layers[11].name === "Red Catrina Flowers") ||
    (layers[8].name === "Lavender Roses Hair" && layers[11].name === "Red Catrina Flowers") ||
    (layers[8].name === "Pink Roses Hair" && layers[11].name === "Red Catrina Flowers") ||
    (layers[8].name === "Red Roses Hair" && layers[11].name === "Red Catrina Flowers") ||
    (layers[8].name === "Orange Roses Hair" && layers[11].name === "Red Catrina Flowers") ||
    (layers[8].name === "Black Spike Hair" && layers[11].name === "Red Horns") ||
    (layers[8].name === "Blue Pigtails" && layers[11].name === "Red Horns") ||
    (layers[8].name === "Lavender Eye Bows Bob Hair" && layers[11].name === "Red Horns") ||
    (layers[8].name === "Limegreen Pigtails" && layers[11].name === "Red Horns") ||
    (layers[8].name === "Limegreen Spike Long Hair" && layers[11].name === "Red Horns") ||
    (layers[8].name === "Limegreen Spike Hair" && layers[11].name === "Red Horns") ||
    (layers[8].name === "Mint Eye Bows Bob Hair" && layers[11].name === "Red Horns") ||
    (layers[8].name === "Orange Pigtails" && layers[11].name === "Red Horns") ||
    (layers[8].name === "Orange Spike Hair" && layers[11].name === "Red Horns") ||
    (layers[8].name === "Pink Eye Bows Bob Hair" && layers[11].name === "Red Horns") ||
    (layers[8].name === "Pink Pigtails" && layers[11].name === "Red Horns") ||
    (layers[8].name === "Pink Spike Hair" && layers[11].name === "Red Horns") ||
    (layers[8].name === "Pink Spike Long Hair" && layers[11].name === "Red Horns") ||
    (layers[8].name === "Red Spike Hair" && layers[11].name === "Red Horns") ||
    (layers[6].name === "Blue Cherries Cardigan" && layers[7].name === "Red Psychodelic Coat") ||
    (layers[6].name === "Lavender Bows Psychedelic Top" && layers[7].name === "Red Psychodelic Coat") ||
    (layers[6].name === "Musical Notes Cardigan" && layers[7].name === "Red Psychodelic Coat") ||
    (layers[6].name === "Musical Notes Cardigan" && layers[7].name === "Red Psychodelic Coat") ||
    (layers[6].name === "Pink Cherries Cardigan" && layers[7].name === "Red Psychodelic Coat") ||
    (layers[6].name === "Pink Cherries Cardigan" && layers[7].name === "Red Psychodelic Coat") ||
    (layers[6].name === "Pink Sailor Top" && layers[7].name === "Red Psychodelic Coat") ||
    (layers[6].name === "Red Bows Psychedelic Top" && layers[7].name === "Red Psychodelic Coat") ||
    (layers[6].name === "White Bows Psychedelic Top" && layers[7].name === "Red Psychodelic Coat") ||
    (layers[4].name === "Full Body Tattoos I" && layers[6].name === "Musical Notes Cargidan") ||
    (layers[4].name === "Full Body Tattoos II" && layers[6].name === "Musical Notes Cargidan") ||
    (layers[4].name === "Full Body Tattoos III" && layers[6].name === "Musical Notes Cargidan") ||
    (layers[4].name === "Full Body Tattoos IV" && layers[6].name === "Musical Notes Cargidan") ||
    (layers[4].name === "Full Body Tattoos V" && layers[6].name === "Musical Notes Cargidan") ||
    (layers[4].name === "Full Body Tattoos I" && layers[6].name === "Pink Cherries Cardigan") ||
    (layers[8].name === "Red Spike Long Hair" && layers[11].name === "Red Horns") ||
    (layers[8].name === "Red Roses Hair" && layers[11].name === "Red Roses Hair") ||
    (layers[8].name === "Black Bubble Pigtails" && layers[11].name === "Witch Safetypin Hat") ||
    (layers[8].name === "Black Bubble Pigtails" && layers[11].name === "Witch Spikes Hat") ||
    (layers[8].name === "Venus Trap Hair" && layers[11].name === "Yellow Dots Beret") ||
    (layers[4].name === "Full Body Tattoos II" && layers[6].name === "Pink Cherries Cardigan") ||
    (layers[4].name === "Full Body Tattoos III" && layers[6].name === "Pink Cherries Cardigan") ||
    (layers[4].name === "Full Body Tattoos IV" && layers[6].name === "Pink Cherries Cardigan") ||
    (layers[4].name === "Full Body Tattoos V" && layers[6].name === "Pink Cherries Cardigan") ||
    (layers[4].name === "Full Body Tattoos I" && layers[6].name === "Pink Sailor Top") ||
    (layers[4].name === "Full Body Tattoos II" && layers[6].name === "Pink Sailor Top") ||
    (layers[4].name === "Full Body Tattoos III" && layers[6].name === "Pink Sailor Top") ||
    (layers[4].name === "Full Body Tattoos IV" && layers[6].name === "Pink Sailor Top") ||
    (layers[4].name === "Full Body Tattoos V" && layers[6].name === "Pink Sailor Top") ||
    (layers[4].name === "Full Body Tattoos I" && layers[6].name === "Red Checkered Cardigan") ||
    (layers[4].name === "Full Body Tattoos II" && layers[6].name === "Red Checkered Cardigan") ||
    (layers[4].name === "Full Body Tattoos III" && layers[6].name === "Red Checkered Cardigan") ||
    (layers[4].name === "Full Body Tattoos IV" && layers[6].name === "Red Checkered Cardigan") ||
    (layers[4].name === "Full Body Tattoos V" && layers[6].name === "Red Checkered Cardigan") ||
    (layers[4].name === "Bandaid" && layers[6].name === "Red Checkered Cardigan") ||
    (layers[8].name === "Red Side Ponytail" && layers[11].name === "Pink Catrina Flowers") ||
    (layers[8].name === "Red Side Ponytail" && layers[11].name === "Red Catrina Flowers") ||
    (layers[8].name === "Red Side Ponytail" && layers[11].name === "Orange Catrina Flowers") ||
    (layers[8].name === "Peach Side Ponytail" && layers[11].name === "Pink Catrina Flowers") ||
    (layers[8].name === "Peach Side Ponytail" && layers[11].name === "Red Catrina Flowers") ||
    (layers[8].name === "Peach Side Ponytail" && layers[11].name === "Orange Catrina Flowers") ||
    (layers[8].name === "Lavender Roses Hair" && layers[11].name !== "Empty") ||
    (layers[8].name === "Pink Roses Hair" && layers[11].name !== "Empty") ||
    (layers[8].name === "Red Roses Hair" && layers[11].name !== "Empty") ||
    (layers[8].name === "Orange Roses Hair" && layers[11].name !== "Empty") ||
    // (layers[8].name === "Blue Buns Braids" && layers[11].name === "Orange Catrina Flowers") ||
    // (layers[8].name === "Green Buns Braids" && layers[11].name === "Orange Catrina Flowers") ||
    // (layers[8].name === "Pink Buns Braids" && layers[11].name === "Orange Catrina Flowers") ||
    // (layers[8].name === "Blue Buns Braids" && layers[11].name === "Pink Catrina Flowers") ||
    // (layers[8].name === "Green Buns Braids" && layers[11].name === "Pink Catrina Flowers") ||
    // (layers[8].name === "Pink Buns Braids" && layers[11].name === "Pink Catrina Flowers") ||
    (layers[8].name === "Black Spike Hair" && layers[11].name !== "Empty") ||
    (layers[8].name === "Blue Pigtails" && layers[11].name !== "Empty") ||
    (layers[8].name === "Lavender Eye Bows Bob Hair" && layers[11].name !== "Empty") ||
    (layers[8].name === "Limegreen Pigtails" && layers[11].name !== "Empty") ||
    (layers[8].name === "Limegreen Spike Hair" && layers[11].name !== "Empty") ||
    (layers[8].name === "Limegreen Spike Long Hair" && layers[11].name !== "Empty") ||
    (layers[8].name === "Mint Eye Bows Bob Hair" && layers[11].name !== "Empty") ||
    (layers[8].name === "Orange Pigtails" && layers[11].name !== "Empty") ||
    (layers[8].name === "Orange Spike Hair" && layers[11].name !== "Empty") ||
    (layers[8].name === "Pink Eye Bows Bob Hair" && layers[11].name !== "Empty") ||
    (layers[8].name === "Pink Pigtails" && layers[11].name !== "Empty") ||
    (layers[8].name === "Pink Spike Hair" && layers[11].name !== "Empty") ||
    (layers[8].name === "Pink Spike Long Hair" && layers[11].name !== "Empty") ||
    (layers[8].name === "Red Spike Hair" && layers[11].name !== "Empty") ||
    (layers[8].name === "Red Spike Long Hair" && layers[11].name !== "Empty") ||
    
    (layers[8].name === "Peach Side Ponytail" && layers[11].name === "Empty") ||
    (layers[8].name === "Red Side Ponytail" && layers[11].name === "Empty") ||
    (layers[8].name === "Blue Buns Braids" && layers[11].name === "Empty") ||
    (layers[8].name === "Green Buns Braids" && layers[11].name === "Empty") ||
    (layers[8].name === "Pink Buns Braids" && layers[11].name === "Empty") ||
    (layers[8].name === "Black Curly Horns" && layers[11].name === "Empty") ||

    (layers[8].name === "Blue Buns Braids" && layers[11].name === "Orange Roses Crown") ||
    (layers[8].name === "Green Buns Braids" && layers[11].name === "Orange Roses Crown") ||
    (layers[8].name === "Pink Buns Braids" && layers[11].name === "Orange Roses Crown") ||
    (layers[8].name === "Blue Buns Braids" && layers[11].name === "Pink Roses Crown") ||
    (layers[8].name === "Green Buns Braids" && layers[11].name === "Pink Roses Crown") ||
    (layers[8].name === "Pink Buns Braids" && layers[11].name === "Pink Roses Crown")
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

   //Check duplicates

   const stringLayers = JSON.stringify(layers);
   if(chracterLayers.indexOf(stringLayers) > -1) {
     console.log('same NFT combination founded! Trying it again');
     try{
       await createNFT(character, loopIndex);
     } catch(e){
       if(e.toString() === 'RangeError: Maximum call stack size exceeded'){
         console.log('You are trying to generate more NFTs than the amount of possible combinations that you can build.', e);
       } 
     }
     return;
   }
   chracterLayers.push(stringLayers);

   //Check if noodle, change layer order
   if(character.name === 'Nood'){
        const hair = layers[8];
        layers.splice(8, 1);
        layers.splice(9, 0, hair);
   }
  //Save Image and metadata
  await drawImage(layers, loopIndex, character.name);
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
