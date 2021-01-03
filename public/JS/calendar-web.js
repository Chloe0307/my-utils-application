let calendar = {


    init: function () {
        calendar.calendar()
    },

    calendar : function() {

        const monthNames= ['Jan','Fev','Mar','Avr','Mai','Jui','Juil','Aou','Sep','Oct','Nov','Dec']
        const jours= ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim']
        const monthDays= [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        const today= new Date()
        const thisDay= today.getDate()
        const year= today.getYear()
        year <= 2000 ? year += 1900 : null
    
        if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)){
            monthDays[1] = 29;
        }
        const nDays= monthDays[today.getMonth()];
        const firstDay= today;
        firstDay.setDate(0);
    
        firstDay.getDate() == 2 ? firstDay.setDate(0) : null;
        
        const startDay = firstDay.getDay();
        
        const tb= document.createElement('table');
        
        const tbr= tb.insertRow(-1);
    
        const tbh= document.createElement("th");
        tbh.setAttribute('colspan','7');
        const tbhtxt= document.createTextNode(monthNames[today.getMonth()+1]+'.'+year);
        tbh.appendChild(tbhtxt);
    
        tbr.appendChild(tbh);
    
        const tbr=tb.insertRow(-1);
    
        for(var i=0 ;i<jours.length ; i++){
    
            tbr.insertCell(-1).appendChild(document.createTextNode(jours[i]));
        }
    
        const tbr= document.createElement("tr");
    
        const column= 0;
    
        for (let i= 0; i < startDay; i++) {
            tbr.insertCell(0);
            column++;
        }
    
        for (let i = 1; i <= nDays; i++) {
        
            var tdd= tbr.insertCell(-1);
    
            i == thisDay ? tdd.style.color="#FF0000" : null;
    
            tdd.appendChild(document.createTextNode(i));
    
            column++;
            if (column == 7) {
                tb.appendChild(tbr);
                var tbr=document.createElement("tr");
                column = 0;
            }
    
            i == nDays ? tb.appendChild(tbr) : null;
    
        }
        document.getElementById('contcalendar').appendChild(tb);
    }

}

document.addEventListener('DOMContentLoaded', calendar.init)