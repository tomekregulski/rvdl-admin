export const isValidJwt = () => {
  const allCookies = document.cookie.split('; ');
  const jwtKey = 'roop-verma-library';
  console.log(allCookies);
  for (let i = 0; i < allCookies.length; i++) {
    const currentCookie = allCookies[i].split('=');
    if (currentCookie[0] === jwtKey) {
      console.log('jwt found!');
      // TODO: check for expired
      return { foundJwt: true, jwt: currentCookie[1] };
    }
  }
  console.log('no jwt found, please log in');
  return;
};
