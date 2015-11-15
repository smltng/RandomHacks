$(document).ready(function() {
  Parse.initialize("z9ajnPiKmHIXc05vn7bojsGlH1gRVBIElbF0XcgU", "s8EsAA7ZNUab0UYTCYDOP20LylqYaKeaTyAFdsKm");
  fetchComplaintData();
 });

function fetchComplaintData(){

	var url=window.location.search;
	var id=""+url.substring(4);

	var Complaint = Parse.Object.extend("Complaint");
  	var query = new Parse.Query(Complaint);
  	query.get(id, {
  		success: function(complaint) {
  			$('#subject').text(complaint.get("subject"));
  			$('#description').text(complaint.get("description"));
  		},

  		error: function(error) {
    		alert("Error: " + error.code + " " + error.message);
    	}
  	});

}