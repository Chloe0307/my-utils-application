// console.log('hello le calendar')

//  le signe % renvoie le reste entier de la division. ex: 12 % 5 = 2 (divisible par 5 unqiuement le 10 et il reste 2 pour aller a 12)
const isWeekend = day => {
    // 6 when it's saturday, 0 when it's sunday
    return day % 7 == 6 || day % 7 == 0;
}

const calendar = document.querySelector('#calendar-content')

// console.log(calendar)

for (let day = 1; day <= 31; day++) {
    // console.log(day)

    const weekend = isWeekend(day)
    // renvoie dans la console 5 = false (du lundi au vendredi) et 2 = true = weekend (samedi/dimanche)
     console.log(weekend ? "weekend" : "")
    calendar.insertAdjacentHTML("beforeend", `<div class="day ${weekend ? " weekend " : ""}">${day}</div>`)
}