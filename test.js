const Accessory = require('./models/accessory');

(async () => {
  const accessory = await Accessory.factory(1);
  console.log(accessory.status);
})();
