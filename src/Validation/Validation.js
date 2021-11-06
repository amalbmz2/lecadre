export const checkempty = (data) => {
  
	if (data.length === 0 || data === 0) {
		return true;
	} else {
		return false;
	}
};

export const isEmail=(value)=> {
    if (value != null) {
      if (value.length > 0)
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        );
      else return true;
    } else {
      return false;
    }
  };
  export const isPassword=(data)=> {
    if (data != null) {
      if (data.length > 0)
    if (data.length > 7) {
      return true;} else {
      return false;}
  }
};
