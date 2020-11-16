const Calendar = ('fullcalendar/core')
const dayGridPlugin = ('fullcalendar/daygrid')

let app = {

  init : function () {
    app.createCalendar()
  },

  createCalendar : function () {

      const calendarEl = document.getElementById('calendar-content');
      console.log(calendarEl)

      const calendar = new Calendar(calendarEl, {
  
        plugins: [ dayGridPlugin ],
        initialView : 'dayGridMonth'
      });
    
    calendar.render();
  },
};

document.addEventListener('DOMContentLoaded', app.init)
