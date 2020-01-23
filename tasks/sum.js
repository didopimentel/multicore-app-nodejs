const sum = () => {
  let sumResult = 0;
  for (let i = 0; i < 1e9; i++) {
    sumResult += i;
  }

  return sumResult;
};

module.exports = sum;
