// this function calculates the post created time duration from present date
export const timeStamp = (value: number) => {
  const currentDate = Number(new Date());
  const postedDate = Number(new Date(value));
  const difference = currentDate - postedDate;

  let seconds = Math.floor(difference / 1000),
    minutes = Math.floor(seconds / 60),
    hours = Math.floor(minutes / 60),
    days = Math.floor(hours / 24),
    months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  seconds %= 60;
  minutes %= 60;
  hours %= 24;
  days %= 30;
  months %= 12;

  let createdDuration;
  if (years >= 1) {
    if (years === 1) {
      createdDuration = years + ' y';
    } else {
      createdDuration = years + ' y';
    }
  } else if (months >= 1) {
    if (months === 1) {
      createdDuration = months + ' mo';
    } else {
      createdDuration = months + ' mos';
    }
  } else if (days >= 1) {
    if (days === 1) {
      createdDuration = days + ' d';
    } else {
      createdDuration = days + ' d';
    }
  } else if (hours >= 1) {
    if (hours === 1) {
      createdDuration = hours + ' h';
    } else {
      createdDuration = hours + ' h';
    }
  } else if (minutes >= 1) {
    if (minutes === 1) {
      createdDuration = minutes + ' min';
    } else {
      createdDuration = minutes + ' min';
    }
  } else if (seconds >= 1) {
    if (seconds === 1) {
      createdDuration = seconds + ' s';
    } else {
      createdDuration = seconds + ' s';
    }
  }
  return createdDuration;
};
