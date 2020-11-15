// console.log('hello le calendar')

const calendar = document.querySelector('#calendar-content')

// console.log(calendar)

for (let day = 1; day <= 31; day++) {
    // console.log(day)
    calendar.insertAdjacentHTML("beforeend", `<div class="day">${day}</div>`)
}