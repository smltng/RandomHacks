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

      var VoteUser = Parse.Object.extend('VoteUser');
      var qVoteUser = new Parse.Query(VoteUser);
      qVoteUser.equalTo('complaintId', complaint);
      qVoteUser.find({
        success: function(results) {
          $('#votes').text(results.length);
          console.log(results.length);

          //attach the upvote event
          $('#votes').one('click', function() {
            if (results.length==0) {
              upVote(VoteUser, complaint);
            }
          });
        },
        error: function(error) {
          console.log(error.message);
        }
      });
		},

		error: function(error) {
  		alert("Error: " + error.code + " " + error.message);
  	}
  });
}

function upVote(VoteUser, complaint) {
  var vote = new VoteUser();
  var user = new Parse.User();
  user.id = 'abcabcabc0';
  vote.set('userId', user);
  vote.set('complaintId', complaint);

  vote.save(null, {
    success: function(vote) {
      var currNum = parseInt( $('#votes').text() );
      $('#votes').text(currNum+1);
    },
    error: function(vote, error) {
      // Execute any logic that should take place if the save fails.
      // error is a Parse.Error with an error code and message.
      alert('Failed to create new object, with error code: ' + error.message);
    }
  });
}