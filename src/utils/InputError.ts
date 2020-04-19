export default function InputError(error:string = ''): number  {
  if (error != '') {
    if (error) {

      if (error.indexOf('name') > -1) {
        return 0;
      }
      if (error.indexOf('gain') > -1) {
        return 1;
      }
      if (error.indexOf('gastoEduc') > -1) {
        return 2;
      }
      if (error.indexOf('gastoSaude') > -1) {
        return 3;
      }
      if (error.indexOf('gastoDeduc') > -1) {
        return 4;
      }
    } else {
      return -1;
    }
  } else {
    return -1;
  }
  return -1;
}