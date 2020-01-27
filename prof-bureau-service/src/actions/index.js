export function setComission(comName) {
    return {
      type: "SET_COMISSION",
      name: comName
    }
}

export function changePage(page) {
    return {
        type: "CHANGE_PAGE",
        page: page
    }
}

export function login(userInfo) {
    return {
        type: "LOGIN",
        login: userInfo.name,
        course: userInfo.course,
        stNum: userInfo.stNum,
    }
}

export function setPersonalInfo(personalInfo) {
    return {
        type: "SET_INFO",
        data: personalInfo
    }   
}

export function reloadLogin(infoArray) {
    return {
        type: "LOGIN",
        login: infoArray[0],
        course: infoArray[1],
        stNum: infoArray[2]
    }
}