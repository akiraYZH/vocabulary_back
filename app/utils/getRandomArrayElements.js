//Randomly eleminate elements in an array
module.exports = function getRandomArrayElements(arr, count) {
  // Copy array
  let _arr = arr.slice(0);
  let selected_arr = [];

  while (selected_arr.length < count) {
    let index = Math.floor(_arr.length * Math.random());

    // Push to target array
    selected_arr.push(_arr.splice(index, 1)[0]);
  }

  return selected_arr;
};
