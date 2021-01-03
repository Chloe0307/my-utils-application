
let calendar = {

    init: function () {
        calendar.drawCalendar()
        calendar.customMonth()
        calendar.customDays()
    },

    drawCalendar: function () {

        console.log('Je suis le calendrier')
        // I get principale div
        const divBoard = document.querySelector('#board')

        // Create month div content/ add className and Adding at the Board Div
        const formMonth = document.createElement('form')
        formMonth.className = 'month'
        divBoard.append(formMonth)

        // Create row and to loop on this
        for (let r = 1; r < 8; r++) {

            // create new row
            const newColumn = document.createElement('div')
            // add clasName
            newColumn.className = 'column'
            // add at the principale div
            divBoard.append(newColumn)

            // Create column and to loop on this
            for (let c = 1; c < 6; c++) {

                // create new column
                const newCell = document.createElement('div')
                // add className
                newCell.className = 'cell'
                // add at the new element "newRow"
                newColumn.append(newCell)
            }
        }
    },

    customMonth: function () {

        // Getting form Month
        const formEl = document.querySelector('.month')
        // Create array options to be added
        const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre']
    
        // Create and append select list
        const selectList = document.createElement('select')
        selectList.id = 'select-month'
        formEl.appendChild(selectList)

        // create and append the options
        for (let m = 0; m < months.length; m++) {
            const option = document.createElement('option')
            option.value = months[m]
            option.text = months[m]
            selectList.appendChild(option)
        }

    },

    customDays: function () {
        
        const week = document.querySelector('.cellRow')
        const day = document.querySelector('.cell')

        // Create array for days
        let days = ['Lun', 'Mar','Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
        let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]  
        for (let d = 0; d < days.length; d++) {
            const dayContent = document.createElement('p')
            dayContent.className = 'dayName'
            dayContent.textContent = days[d]
            day.appendChild(dayContent)
        }
        
    },

}

document.addEventListener('DOMContentLoaded', calendar.init)