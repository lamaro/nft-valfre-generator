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

const folderPath = "1. WITCHES";

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
      name: "Light Pink Gradient ",
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
    { name: "Light Pink ", file: "2. SKIN/Light Pink.png", weight: 25 },
    { name: "Warm Dark", file: "2. SKIN/Warm Dark.png", weight: 25 },
    { name: "Tan", file: "2. SKIN/Tan.png", weight: 25 },
    { name: "Green", file: "2. SKIN/Green.png", weight: 25 },
  ],
  [
    //3. MAKEUP
    {
      name: "Pink Blush Pink Lip",
      file: "3. MAKEUP/Pink Blush Pink Lip.png",
      weight: 50,
    },
    {
      name: "Pink Blush Black Lip",
      file: "3. MAKEUP/Pink Blush Black Lip.png",
      weight: 50,
    },
  ],
  [
    //4. BODY ART
    { name: "Empty", file: "", weight: 95 },
    {
      name: "Full Body Tattoos I",
      file: "4. BODY ART/Full Body Tattoos I.png",
      weight: 1,
    },
    {
      name: "Full Body Tattoos II",
      file: "4. BODY ART/Full Body Tattoos II.png",
      weight: 1,
    },
    {
      name: "Full Body Tattoos III",
      file: "4. BODY ART/Full Body Tattoos III.png",
      weight: 1,
    },
    {
      name: "Full Body Tattoos IV",
      file: "4. BODY ART/Full Body Tattoos IV.png",
      weight: 1,
    },
    {
      name: "Full Body Tattoos V",
      file: "4. BODY ART/Full Body Tattoos V.png",
      weight: 1,
    },
  ],
  [
    //5. FACE ACCESSORIES
    { name: "Empty", file: "", weight: 100 },
  ],
  [
    //6. CLOTHING
    {
      name: "Black Spiderweb Top",
      file: "6. CLOTHING/Black Spiderweb Top.png",
      weight: 5,
    },
    {
      name: "Blue One Shoulder Top",
      file: "6. CLOTHING/Blue One Shoulder Top.png",
      weight: 5,
    },
    {
      name: "Green Flames Tee",
      file: "6. CLOTHING/Green Flames Tee.png",
      weight: 10,
    },
    {
      name: "Green Tartan Top",
      file: "6. CLOTHING/Green Tartan Top.png",
      weight: 5,
    },
    {
      name: "Heart Diamond Top",
      file: "6. CLOTHING/Heart Diamond Top.png",
      weight: 5,
    },
    {
      name: "Lavender One Shoulder Top",
      file: "6. CLOTHING/Lavender One Shoulder Top.png",
      weight: 5,
    },
    {
      name: "Lavender Spiderweb Corset",
      file: "6. CLOTHING/Lavender Spiderweb Corset.png",
      weight: 5,
    },
    {
      name: "Pink Flames Tee",
      file: "6. CLOTHING/Pink Flames Tee.png",
      weight: 10,
    },
    {
      name: "Pink One Shoulder Top",
      file: "6. CLOTHING/Pink One Shoulder Top.png",
      weight: 5,
    },
    {
      name: "Pink Ying Yang Tee",
      file: "6. CLOTHING/Pink Ying Tang Tee.png",
      weight: 5,
    },
    {
      name: "Red Tartan Top",
      file: "6. CLOTHING/Red Tartan Top.png",
      weight: 5,
    },
    { name: "Stripes Tee", file: "6. CLOTHING/Stripes Tee.png", weight: 10 },
    {
      name: "White Spiderweb Corset",
      file: "6. CLOTHING/White Spiderweb Corset.png",
      weight: 5,
    },
    {
      name: "White Spiderweb Top",
      file: "6. CLOTHING/White Spiderweb Top.png",
      weight: 5,
    },
    {
      name: "White Ying Yang Tee",
      file: "6. CLOTHING/White Ying Yang Tee.png",
      weight: 5,
    },
    {
      name: "Yellow Flames Tee",
      file: "6. CLOTHING/Yellow Flames Tee.png",
      weight: 10,
    },
  ],
  [
    //7. OUTERWEAR
    { name: "Empty", file: "", weight: 70 },
    {
      name: "Leopard Print Coat",
      file: "7. OUTERWEAR/Leopard Print Coat.png",
      weight: 10,
    },
    {
      name: "Red Tartan Coat",
      file: "7. OUTERWEAR/Red Tartan Coat.png",
      weight: 10,
    },
    {
      name: "Zebra Print Coat",
      file: "7. OUTERWEAR/Zebra Print Coat.png",
      weight: 10,
    },
  ],
  [
    //8. HAIRSTYLE
    {
      name: "Black Bubble Pigtails",
      file: "8. HAIRSTYLE/Black Bubble Pigtails.png",
      weight: 10,
    },
    {
      name: "Green Medusa Ponytail",
      file: "8. HAIRSTYLE/Green Medusa Ponytail.png",
      weight: 5,
    },
    {
      name: "Lavender Long Pigtails",
      file: "8. HAIRSTYLE/Lavender Long Pigtails.png",
      weight: 10,
    },
    {
      name: "Light Green Bubble Pigtails",
      file: "8. HAIRSTYLE/Light Green Bubble Pigtails.png",
      weight: 10,
    },
    {
      name: "Magenta Bubble Pigtails",
      file: "8. HAIRSTYLE/Magenta Bubble Pigtails.png",
      weight: 10,
    },
    {
      name: "Peach Bubble Pigtails",
      file: "8. HAIRSTYLE/Peach Bubble Pigtails.png",
      weight: 10,
    },
    {
      name: "Peach Long Pigtails",
      file: "8. HAIRSTYLE/Peach Long Pigtails.png",
      weight: 5,
    },
    {
      name: "Pink Bangs Bob Hair",
      file: "8. HAIRSTYLE/Pink Bangs Bob Hair.png",
      weight: 5,
    },
    {
      name: "Pink Bubble Pigtails",
      file: "8. HAIRSTYLE/Pink Bubble Pigtails.png",
      weight: 10,
    },
    {
      name: "Pink Medusa Ponytail",
      file: "8. HAIRSTYLE/Pink Medusa Ponytail.png",
      weight: 5,
    },
    {
      name: "Red Bangs Bob Hair",
      file: "8. HAIRSTYLE/Red Bangs Bob Hair.png",
      weight: 5,
    },
    {
      name: "White Bubble Pigtails",
      file: "8. HAIRSTYLE/White Bubble Pigtails.png",
      weight: 10,
    },
    {
      name: "White Curly Pigtails",
      file: "8. HAIRSTYLE/White Curly Pigtails.png",
      weight: 5,
    },
  ],
  [
    //9. NECK ACCESSORIES
    { name: "Empty", file: "", weight: 50 },
    {
      name: "Moon Choker",
      file: "9. NECK ACCESSORIES/Moon Choker.png",
      weight: 15,
    },
    {
      name: "Black Safetypin Choker",
      file: "9. NECK ACCESSORIES/Black Safetypin Choker.png",
      weight: 15,
    },
    {
      name: "Skull Chain Choker",
      file: "9. NECK ACCESSORIES/Skull Chain Choker.png",
      weight: 10,
    },
    {
      name: "Spike Choker",
      file: "9. NECK ACCESSORIES/Spike Choker.png",
      weight: 10,
    },
  ],
  [
    //10. EYEWEAR
    { name: "Empty", file: "", weight: 65 },
    {
      name: "Red Cateye Sunglasses",
      file: "10. EYEWEAR/Red Cateye Sunglasses.png",
      weight: 5,
    },
    {
      name: "Spiderweb Sunglasses ",
      file: "10. EYEWEAR/Spiderweb Sunglasses.png",
      weight: 5,
    },
    {
      name: "Black Broken Heart Eye Patch",
      file: "10. EYEWEAR/Black Broken Heart Eye Patch.png",
      weight: 5,
    },
    {
      name: "Pink Broken Heart Eye Patch",
      file: "10. EYEWEAR/Pink Broken Heart Eye Patch.png",
      weight: 5,
    },
    {
      name: "Red Broken Heart Eye Patch",
      file: "10. EYEWEAR/Red Broken Heart Eye Patch.png",
      weight: 5,
    },
    {
      name: "Black Spiderweb Eye Patch",
      file: "10. EYEWEAR/Black Spiderweb Eye Patch.png",
      weight: 5,
    },
    {
      name: "Pink Spiderweb Eye Patch",
      file: "10. EYEWEAR/Pink Spiderweb Eye Patch.png",
      weight: 5,
    },
  ],
  [
    //11. HEADWEAR
    {
      name: "Black Skull Beret",
      file: "11. HEADWEAR/Black Skull Beret.png",
      weight: 10,
    },
    {
      name: "Black Spiderweb Beret",
      file: "11. HEADWEAR/Black Spiderweb Beret.png",
      weight: 3,
    },
    {
      name: "Horns Black Beret",
      file: "11. HEADWEAR/Horns Black Beret.png",
      weight: 13,
    },
    {
      name: "Lavender Skull Beret",
      file: "11. HEADWEAR/Lavender Skull Beret.png",
      weight: 13,
    },
    {
      name: "Lime Skull Beret",
      file: "11. HEADWEAR/Lime Skull Beret.png",
      weight: 10,
    },
    {
      name: "Pink Skull Beret",
      file: "11. HEADWEAR/Pink Skull Beret.png",
      weight: 10,
    },
    {
      name: "Pink Spiderweb Beret",
      file: "11. HEADWEAR/Pink Spiderweb Beret.png",
      weight: 10,
    },
    {
      name: "Witch Safetypin Hat",
      file: "11. HEADWEAR/Witch Safetypin Hat.png",
      weight: 15,
    },
    {
      name: "Witch Spikes Hat",
      file: "11. HEADWEAR/Witch Spikes Hat.png",
      weight: 15,
    },
  ],
];

module.exports = {
  traits,
  folderPath,
};
