const utilityFunctions = {};

utilityFunctions.setCookie = (cookieName , cookieValue , expirationHours) => {

    const d = new Date();
    d.setTime(d.getTime() + (expirationHours * 60 * 60 * 1000))
    const expires = "expires" + d.toUTCString();
    document.cookie = `${cookieName} = ${cookieValue}; ${expires}; path=/; SameSite=Strict`;

}

utilityFunctions.checkCookieExists = (cookieName) => {
    const cookies = document.cookie.split(";")
    for(let i=0; i<cookies.length; i++){
        const cookie = cookies[i].trim();
        if (cookie.indexOf(cookieName + '=') === 0){
            return true;
        }
    }
    return false
}

utilityFunctions.getCookieValue = (cookieName) => {
    const name = cookieName + "=";
    const decodeCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodeCookie.split(';');
    for (let i=0; i<cookieArray.length; i++){
        let cookie = cookieArray[i];
        while(cookie.charAt(0)=== ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0){
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
}

utilityFunctions.removeCookie = (cookieName) => {
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00UTC; path=/; SameSite=Strict";
  }

export {utilityFunctions};