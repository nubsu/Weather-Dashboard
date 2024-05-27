function showweather(a){

    const x = 
    $(`
        <div class='deleteondisplayweather'>
            <h2>${a.city.name} ${dayjs().format('M/D/YYYY')}<img src="http://openweathermap.org/img/w/${a.list[0].weather[0].icon}.png" alt="Weather icon"></h2>
            <p>Temp: ${Math.round((((a.list[0].main.temp - 273.15)*1.8)+32)*100)/100}°F</p>
            <p>Wind: ${a.list[0].wind.speed} MPH</p>
            <p>Humidity: ${a.list[0].main.humidity}%</p>
        </div
    `)

    $('#actualweather').append(x)
}

function showforecast(a){

    const x =
    $(`
        <div class='row gx-3 deleteondisplayweather'>
            <h3>5 day forecast</h3>
            <div class='col'>
                <div class='px-2 card'>
                    <h4>${dayjs().add(1, 'day').format('M/D/YYYY')}</h4>
                    <img style='max-width: 50px;' src="http://openweathermap.org/img/w/${a.list[8].weather[0].icon}.png" alt="Weather icon">
                    <p>Temp: ${Math.round((((a.list[8].main.temp - 273.15)*1.8)+32)*100)/100}°F</p>
                    <p>Wind: ${a.list[8].wind.speed} MPH</p>
                    <p>Humidity: ${a.list[8].main.humidity}%</p>
                </div>
            </div>
            <div class='col'>
                <div class='px-2 card'>
                    <h4>${dayjs().add(2, 'day').format('M/D/YYYY')}</h4>
                    <img style='max-width: 50px;' src="http://openweathermap.org/img/w/${a.list[16].weather[0].icon}.png" alt="Weather icon">
                    <p>Temp: ${Math.round((((a.list[16].main.temp - 273.15)*1.8)+32)*100)/100}°F</p>
                    <p>Wind: ${a.list[16].wind.speed} MPH</p>
                    <p>Humidity: ${a.list[16].main.humidity}%</p>
                </div>
            </div>
            <div class='col'>
                <div class='px-2 card'>
                    <h4>${dayjs().add(3, 'day').format('M/D/YYYY')}</h4>
                    <img style='max-width: 50px;' src="http://openweathermap.org/img/w/${a.list[24].weather[0].icon}.png" alt="Weather icon">
                    <p>Temp: ${Math.round((((a.list[24].main.temp - 273.15)*1.8)+32)*100)/100}°F</p>
                    <p>Wind: ${a.list[24].wind.speed} MPH</p>
                    <p>Humidity: ${a.list[24].main.humidity}%</p>
                </div>
            </div>
            <div class='col'>
                <div class='px-2 card'>
                    <h4>${dayjs().add(4, 'day').format('M/D/YYYY')}</h4>
                    <img style='max-width: 50px;' src="http://openweathermap.org/img/w/${a.list[32].weather[0].icon}.png" alt="Weather icon">
                    <p>Temp: ${Math.round((((a.list[32].main.temp - 273.15)*1.8)+32)*100)/100}°F</p>
                    <p>Wind: ${a.list[32].wind.speed} MPH</p>
                    <p>Humidity: ${a.list[32].main.humidity}%</p>
                </div>
            </div>
            <div class='col'>
                <div class='px-2 card'>
                    <h4>${dayjs().add(5, 'day').format('M/D/YYYY')}</h4>
                    <img style='max-width: 50px;' src="http://openweathermap.org/img/w/${a.list[39].weather[0].icon}.png" alt="Weather icon">
                    <p>Temp: ${Math.round((((a.list[39].main.temp - 273.15)*1.8)+32)*100)/100}°F</p>
                    <p>Wind: ${a.list[39].wind.speed} MPH</p>
                    <p>Humidity: ${a.list[39].main.humidity}%</p>
                </div>
            </div>

        </div>
    `)

    $('#5dayforecast').append(x)
}

function renderSearchHistory(){
    if(localStorage.searchhistory){
        const a = $('#searchhistory')
        const b = JSON.parse(localStorage.searchhistory)

        for(i=0;i<b.length;i++){
            const c = 
            $(`
                <button type='button' class='col-12 btn btn-outline-secondary text-center historyy'>
                    ${b[i]}
                </button>
                <div style='height:8px'></div>
            `)

            a.append(c)
        }
    }else{
        console.log('search history empty')
    }
}

function getweather(a){
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${a}&limit=1&appid=838bcd69640afa8ed848b7123072a025`)
    .then(function(response){
        if (!response.ok) {
            throw new Error(response.status)
          }
        return response.json()
    })
    .then(function(data){
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=838bcd69640afa8ed848b7123072a025`)
        .then(function(response){
            if (!response.ok) {
                throw new Error(response.status)
              }
            return response.json()
        })
        .then(function(data){
            console.log(data)
            showweather(data)
            showforecast(data)
        })
        .catch(function(error){
            console.error(error)
        })
    })
    .catch(function(error){
        console.error(error)
    })
}

$(document).ready(function(){

    renderSearchHistory()

    $('#searched').submit(function(event){
        event.preventDefault()
        $('.deleteondisplayweather').remove()
        if($('#searchfield').val()){

            getweather($('#searchfield').val())

            if(!localStorage.searchhistory){
                const a = [$('#searchfield').val()]

                localStorage.setItem('searchhistory', JSON.stringify(a))
            }else if(localStorage.searchhistory){
                if(JSON.parse(localStorage.searchhistory).length<=5){
                    const a = $('#searchfield').val()
                    const b = JSON.parse(localStorage.getItem('searchhistory'))
    
                    b.unshift(a)
    
                    localStorage.setItem('searchhistory', JSON.stringify(b))
                }else{
                    const a = $('#searchfield').val()
                    const b = JSON.parse(localStorage.getItem('searchhistory'))
    
                    b.unshift(a)
                    b.pop()
    
                    localStorage.setItem('searchhistory', JSON.stringify(b))
                }
            }

        }else{
            console.log('empty')
        }
    })

    $('.historyy').click(function(event){
        $('.deleteondisplayweather').remove()
        getweather($(event.currentTarget).text().trim())
    })

})
