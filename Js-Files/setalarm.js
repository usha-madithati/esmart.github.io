function setAlarm() {
    const alarmDate = document.getElementById('alarmDate').value;
    const alarmTime = document.getElementById('alarmTime').value;
  
    // Combine date and time into a single string
    const alarmDateTimeString = alarmDate + 'T' + alarmTime;
  
    // Create a Date object from the combined date and time
    const alarm = new Date(alarmDateTimeString);
    const now = new Date();
  
    const timeToAlarm = alarm - now;
  
    if (timeToAlarm > 0) {
      setTimeout(() => {
        alert('Alarm! Time to do something!');
      }, timeToAlarm);
    } else {
      alert('Please choose a future date and time for the alarm.');
    }
  }