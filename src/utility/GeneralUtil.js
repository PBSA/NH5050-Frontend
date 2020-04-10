class GeneralUtil {
  //Takes in an array of objects, returns the sum of all values with the key "proceeds"
  static sumProceeds = (objArray) => {
    let data;
    if (objArray.length >= 1) {
      data = objArray.reduce((sum, currentValue) => {
         return Number(sum) + Number(currentValue.proceeds)
      }, 0);
    }

    return data;
  }
}

export default GeneralUtil;