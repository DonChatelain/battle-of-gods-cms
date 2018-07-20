const basic = require('../data/basicCards.js');

// not a real test

function showClassStats () {
  console.log('testing equality of basic classes')
  
  let RED = {
    atk: 0,
    def: 0,
    qty: 0,
  };
  let BLUE = {
    atk: 0,
    def: 0,
    qty: 0,
  };
  let GREEN = {
    atk: 0,
    def: 0,
    qty: 0,
  };

  basic.RED.forEach(card => {
    for (let i = 0; i < card.qty; i++) {
      RED.qty++;
      RED.atk += card.atk;
      RED.def += card.def;
    }
  });
  basic.BLUE.forEach(card => {
    for (let i = 0; i < card.qty; i++) {
      BLUE.qty++;
      BLUE.atk += card.atk;
      BLUE.def += card.def;
    }
  });
  basic.GREEN.forEach(card => {
    for (let i = 0; i < card.qty; i++) {
      GREEN.qty++;
      GREEN.atk += card.atk;
      GREEN.def += card.def;
    }
  });

  console.log('RED', RED);
  console.log('BLUE', BLUE);
  console.log('GREEN', GREEN);
}