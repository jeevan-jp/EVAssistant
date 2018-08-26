$(function(){
   
    /** Click on Fetch data and display in HTML table **/

    $("#fetchdata").on('click', function(){

        $.get( "/fetchdata", function( data ) {

            var products = data['data'];

            $("#trdata").html('');

            $("#message").hide();

            var string = '';

            $.each(products, function(index, product ) {

                string += '<tr><td>'+product['SNo']+'</td><td>'+product['_id']+'</td><td>'+product['Concession']+'</td><td>'+product['Area']+'</td><td>'+product['sitecode']+'</td><td>'+product['stopName']+'</td><td>'+product['RoadName']+'</td><td>'+product['Towards']+'</td><td>'+product['coordinates']+'</td></tr>';

            });

            $("#trdata").html(string);

        });
    });
 
    /** Import data after click on a button */

    $("#importdata").on('click', function(){

        $.get( "/data/import", function( data ) {

            $("#message").show().html(data['success']);

        });

    });

});