/* eslint-disable no-console */
const checkStringLength = (string, maxLength) => string.length <= maxLength;

const checkPalindrome = (phrase) => {
  const symbols = phrase
    .toLowerCase()
    .split('')
    .filter((symbol) => symbol !== ' ');

  const string = symbols.join('');
  const invertedString = symbols.reverse().join('');

  return string === invertedString;
};

const getNumber = (string) => {
  const figures = string
    .toString()
    .split('')
    .filter((symbol) => !isNaN(parseInt(symbol, 10)));

  const number = parseInt(figures.join(''), 10);

  return number;
};

const checkMeetingWithinWorkingHours = (startWorkday, endWorkday, startMeeting, durationMeeting) => {
  const getDate = (time, offset = 0) => {
    const date = new Date();
    let [hours, minutes] = time.split(':');
    hours = +hours;
    minutes = +minutes + offset;
    return date.setHours(hours, minutes, 0, 0);
  };

  const dateStartWorkday = getDate(startWorkday);
  const dateEndWorkday = getDate(endWorkday);
  const dateStartMeeting = getDate(startMeeting);
  const dateEndMeeting = getDate(startMeeting, durationMeeting);

  return (dateStartMeeting >= dateStartWorkday && dateEndMeeting <= dateEndWorkday);
};

console.log(checkMeetingWithinWorkingHours('08:00', '17:30', '14:00', 90));
console.log(checkMeetingWithinWorkingHours('8:0', '10:0', '8:0', 120));
console.log(checkMeetingWithinWorkingHours('08:00', '14:30', '14:00', 90));
console.log(checkMeetingWithinWorkingHours('14:00', '17:30', '08:0', 90));
console.log(checkMeetingWithinWorkingHours('8:00', '17:30', '08:00', 900));

checkStringLength('проверяемая строка', 20);
checkPalindrome('топот');
getNumber('2023 год');
