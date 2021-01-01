
let calendar = {

    init: function () {
        calendar.drawCalendar()
        calendar.customCalendar()
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
        for (let i = 1; i < 8; i++) {

            // create new row
            const newRow = document.createElement('div')
            // add clasName
            newRow.className = 'cellRow'
            // add at the principale div
            divBoard.append(newRow)

            // Create column and to loop on this
            for (let j = 1; j < 6; j++) {

                // create new column
                const newColumn = document.createElement('div')
                // add className
                newColumn.className = 'cell'
                // add at the new element "newRow"
                newRow.append(newColumn)
            }
        }
    },

    customCalendar: function () {

        // Getting form Month
        const formEl = document.querySelector('.month')
        // Create array options to be added
        let array = [
            'Janvier',
            'Février',
            'Mars',
            'Avril',
            'Mai',
            'Juin',
            'Juillet',
            'Aout',
            'Septembre',
            'Octobre',
            'Novembre',
            'Decembre'
        ]
        // Create and append select list
        const selectList = document.createElement('select')
        selectList.id = 'selectMonth'
        formEl.appendChild(selectList)

        // create and append the options
        
    }
}

document.addEventListener('DOMContentLoaded', calendar.init)