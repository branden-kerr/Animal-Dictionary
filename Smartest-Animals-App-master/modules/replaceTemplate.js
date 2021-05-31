module.exports = (temp, product) => {
  let output = temp.replace(/{%ANIMALNAME%}/g, product.animalName);
  output = output.replace(/{%ANIMALIMAGE%}/g, product.image);
  output = output.replace(/{%ANIMALFROM%}/g, product.from);
  output = output.replace(/{%ANIMALSKILL%}/g, product.skill);
  output = output.replace(/{%ANIMALQUANTITY%}/g, product.quantity);
  output = output.replace(/{%ANIMALCHARITY%}/g, product.charity);
  output = output.replace(/{%ANIMALDESCRIPTION%}/g, product.description);
  output = output.replace(/{%ANIMALDESCRIPTION-AB%}/g, product.description.replace(/^(.{155}[^\s]*).*/, '$1') + '...');

  output = output.replace(/{%ID%}/g, product.id);

  return output;
};
