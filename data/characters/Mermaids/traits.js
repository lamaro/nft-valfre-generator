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

const folderPath = "2. MERMAIDS";

const traits = [
  [
    //0. BACKGROUNDS
    {
      name: "Baby Blue Gradient",
      file: "0. BACKGROUNDS/Baby Blue Gradient.png",
      weight: 20,
    },
    {
      name: "Lavender Gradient",
      file: "0. BACKGROUNDS/Lavender Gradient.png",
      weight: 20,
    },
    {
      name: "Light Pink Gradient",
      file: "0. BACKGROUNDS/Light Pink Gradient.png",
      weight: 20,
    },
    {
      name: "Peach Gradient",
      file: "0. BACKGROUNDS/Peach Gradient.png",
      weight: 20,
    },
    {
      name: "Pink Gradient",
      file: "0. BACKGROUNDS/Pink Gradient.png",
      weight: 20,
    },
  ],
  [
    //1. WINGS
    { name: "Empty", file: "", weight: 100 },
  ],
  [
    //2. SKIN
    {
      name: "Lavender Scales",
      file: "2. SKIN/Lavender Scales.png",
      weight: 33,
    },
    { name: "Pink Scales", file: "2. SKIN/Pink Scales.png", weight: 33 },
    { name: "Green Scales", file: "2. SKIN/Green Scales.png", weight: 33 },
  ],
  [
    //3. MAKEUP
    {
      name: "Pink Blush Pink Lip",
      file: "3. MAKEUP/Pink Blush Pink Lip.png",
      weight: 33,
    },
    {
      name: "Green Blush Black Lip",
      file: "3. MAKEUP/Green Blush Black Lip.png",
      weight: 33,
    },
    {
      name: "Lavender Blush Black Lip",
      file: "3. MAKEUP/Lavender Blush Black Lip.png",
      weight: 33,
    },
  ],
  [
    //4. BODY ART
    { name: "Empty", file: "", weight: 100 },
  ],
  [
    //5. FACE ACCESSORIES
    { name: "Empty", file: "", weight: 100 },
  ],
  [
    //6. CLOTHING
    {
      name: "Black Shell Bra",
      file: "6. CLOTHING/Black Shell Bra.png",
      weight: 23,
    },
    {
      name: "Lavender Shell Corset",
      file: "6. CLOTHING/Lavender Shell Corset.png",
      weight: 23,
    },
    {
      name: "Pink Shell Bra",
      file: "6. CLOTHING/Pink Shell Bra.png",
      weight: 3,
    },
    {
      name: "White Shell Bra",
      file: "6. CLOTHING/White Shell Bra.png",
      weight: 17,
    },
    {
      name: "Black Shell Halter Top",
      file: "6. CLOTHING/Black Shell Halter Top.png",
      weight: 17,
    },
    {
      name: "White Shell Halter Top",
      file: "6. CLOTHING/White Shell Halter Top.png",
      weight: 17,
    },
  ],
  [
    //7. OUTERWEAR
    { name: "Empty", file: "", weight: 100 },
  ],
  [
    //8. HAIRSTYLE
    {
      name: "Pearl Crown Long Blue Hair",
      file: "8. HAIRSTYLE/Pearl Crown Long Blue Hair.png",
      weight: 13,
    },
    {
      name: "Pearl Crown Long Pink Hair",
      file: "8. HAIRSTYLE/Pearl Crown Long Pink Hair.png",
      weight: 13,
    },
    {
      name: "Sea Stars Black Bob Hair",
      file: "8. HAIRSTYLE/Sea Stars Black Bob Hair.png",
      weight: 13,
    },
    {
      name: "Sea Stars Lavender Bob Hair",
      file: "8. HAIRSTYLE/Sea Stars Lavender Bob Hair.png",
      weight: 13,
    },
    {
      name: "Shell Clips Short Blonde Hair",
      file: "8. HAIRSTYLE/Shell Clips Short Blonde Hair.png",
      weight: 13,
    },
    {
      name: "Shell Clips Short Blue Hair",
      file: "8. HAIRSTYLE/Shell Clips Short Blue Hair.png",
      weight: 13,
    },
    {
      name: "Crystals Black Hair",
      file: "8. HAIRSTYLE/Crystals Black Hair.png",
      weight: 4,
    },
    {
      name: "Crystals White Hair",
      file: "8. HAIRSTYLE/Crystals White Hair.png",
      weight: 4,
    },
    {
      name: "Shells Lavender Buns Hair",
      file: "8. HAIRSTYLE/Shells Lavender Buns Hair.png",
      weight: 7,
    },
    {
      name: "Shells Pink Buns Hair",
      file: "8. HAIRSTYLE/Shells Pink Buns Hair.png",
      weight: 7,
    },
  ],
  [
    //9. NECK ACCESSORIES
    {
      name: "Black Safetypin Choker",
      file: "9. NECK ACCESSORIES/Black Safetypin Choker.png",
      weight: 20,
    },
    {
      name: "Blue Safetypin Choker",
      file: "9. NECK ACCESSORIES/Blue Safetypin Choker.png",
      weight: 20,
    },
    {
      name: "Pink Safetypin Choker",
      file: "9. NECK ACCESSORIES/Pink Safetypin Choker.png",
      weight: 20,
    },
    {
      name: "Pearl Necklace",
      file: "9. NECK ACCESSORIES/Pearl Necklace.png",
      weight: 20,
    },
    {
      name: "White Chain Choker",
      file: "9. NECK ACCESSORIES/White Chain Choker.png",
      weight: 20,
    },
  ],
  [
    //10. EYEWEAR
    { name: "Empty", file: "", weight: 75 },
    {
      name: "Shell Sunglasses",
      file: "10. EYEWEAR/Shell Sunglasses.png",
      weight: 25,
    },
  ],
  [
    //11. HEADWEAR
    { name: "Empty", file: "", weight: 100 },
  ],
];

module.exports = {
  traits,
  folderPath,
};
