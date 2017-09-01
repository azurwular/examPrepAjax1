var lastTarget = null;

function infoGen(country) 
{
    var borders;
    if (country[0].borders.length === 0) 
    {
        borders = "No-one";
    } else 
    {
        borders = country[0].borders.join(", ");
    }

    return "<p>"
            + "Country: " + country[0].name
            + "<br/>Population: " + country[0].population
            + "<br/>Area: " + country[0].area
            + "<br/>Borders: " + borders
            + "</p>";
}


function getStrISO(targetId) 
{
    var strISO = "http://restcountries.eu/rest/v1/alpha?codes=";
    if (targetId.length <= 2) 
    {
        strISO += targetId;
    } 
    else 
    {
        strISO += targetId.substring(0, targetId.indexOf('-'));
    }
    return strISO;
}

function hitCountry() 
{
    return event.target.id !== "svg2" && event.target.id !== "Large masses of water";
}

function getInfo(event) 
{
    console.log(event.target.id);
    if (hitCountry()) 
    {
        var targetId = event.target.id;
    if (lastTarget !== null) 
    {
        lastTarget.style.fill = "c0c0c0";
    }
    lastTarget = event.target;
    event.target.style.fill = "red";




        var promise = fetch(getStrISO(targetId));
        promise.then(function (response) {
            return response.json();
        }).then(function (country) {
            document.getElementById("getInfo").innerHTML = infoGen(country);

        });
    }
}

document.getElementById("svg2").addEventListener("click", getInfo);



