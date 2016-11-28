$(document).ready(function(){
    var $placeImage = $("#placeImage");
    var $searchForm = $("#searchForm");
    var $placeInfo = $("#placeNytInfo");

    $searchForm.submit(function(e){
        loadData(e);
    });

    function loadData(e){
        e.preventDefault();
        
        var $streetSource = $("#street");
        var $citySource = $("#city");
        var $completeAddress = $streetSource.val() + ', ' + $citySource.val();
        var loadingText = "<h4>Searching in New York Times articles ....</h4>";
        // NewYork Times API request
        var newYorkTimesURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        newYorkTimesURL += '?'+ $.param({
            'api-key':"76bd84159cd34d57ab3169c66ade9e8a",
            'q': $streetSource.val()
        });
        
        $placeImage.empty(); // Remove previous searched image to Insert New image per search
        $placeInfo.empty(); // Remove previous NYT news to Insert New news hedings per search

        // Add image from Google Street View API of matched address
        $placeImage.append("<img src='https://maps.googleapis.com/maps/api/streetview?size=500x300&location="+$completeAddress+"&key=AIzaSyDGxY_Mg_cOM4uNKdFe-TaBYqpBBBfxSQM'>");
        
        $placeInfo.append(loadingText);
        // API request
        $.getJSON(newYorkTimesURL,function(data){
            console.log(data.response.docs);
            
            var title = "<h4>Matched results from New York Times magazine.</h4>"
            var matchItems = data.response.docs; // Array of matched search news in NYT
            var outDiv = '<ul>'
            matchItems.forEach(function(item){
                console.log(item);
                outDiv += '<li><a target="_blank" href="'+item.web_url+'">'+item.headline.main+'</a><p>'+item.lead_paragraph+'</p></li>';
            });
            outDiv +='</ul>';
            $placeInfo.empty(); // Remove previous NYT news to Insert New news hedings per search
            $placeInfo.append(title);
            $placeInfo.append(outDiv);
        });

        // Empty search fields items in the end
        $streetSource.val("");
        $citySource.val("");
    };
});


