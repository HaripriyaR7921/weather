$(document).ready(function(){



    function info(value){
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q="+value+"&appid=32ba0bfed592484379e51106cef3f204",
            jsonpCallback: "callback",
            dataType: "json",
            success: function(data) {
                    var min=0;
                    var max=0
                    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                    document.getElementById("cardview").innerHTML="";
                    for(i = 0; i<7; i++){
                        min =Number(data.list[i].main.temp_min - 273.15).toFixed(1);
                        max = Number(data.list[i].main.temp_max - 273.15).toFixed(2);
                        document.getElementById("cardview").innerHTML+=`
                        <div class="card card-5">
                                <h2 class="card__title">${weekday[i]}</h2>
                                <p class="card__apply">
                            MIN ${min}C
                            </p>  <p class="card__apply">
                            Max ${max}C
                            </p>
                      </div>
                        `
                    }
                }
          });
    }
    $("#location").on("keyup", function() {
        info(this.value)
    });
    const API_KEY ='92fc5280eb2d26a5ecdd1d0a872b5d0b';
    getWeatherData ()
    function getWeatherData () {
        navigator.geolocation.getCurrentPosition((success) => {
            
                var input = document.getElementById("location").value = "india"
                info("india")
        
    
        })
    }

  });

