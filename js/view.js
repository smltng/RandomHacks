$(document).ready(function() {
  Parse.initialize("z9ajnPiKmHIXc05vn7bojsGlH1gRVBIElbF0XcgU", "s8EsAA7ZNUab0UYTCYDOP20LylqYaKeaTyAFdsKm");
  
  fetchComplaintData();
  
 });


function submitNewComment(complaint){
  var comment_text = $('#comment').val();
  var Comment = Parse.Object.extend("Comment");
  var comment_obj = new Comment();
  comment_obj.set('complaintId', complaint);

  var user = new Parse.User();
  user.id = "srd83";
  comment_obj.set('commenterId', user);
  comment_obj.set('Content',comment_text);

  //alert(window.location.href + '?id=' + complaint.id);
  comment_obj.save(null, {
    success: function(comment_obj) {

      window.location.href = jQuery.query.set('id', ''+complaint.id);

    }



  });
}

function fetchComplaintData(){
	var url=window.location.search;
	var id=""+url.substring(4);

	var Complaint = Parse.Object.extend("Complaint");
	var query = new Parse.Query(Complaint);
	query.get(id, {
		success: function(complaint) {
			$('#subject').text(complaint.get("subject"));
			$('#description').text(complaint.get("description"));
      setTagValue('#tags', complaint);

      retrieveVoteData(complaint);
      retrieveCommentData(complaint);
      $('#submit').on('click', function() {
        submitNewComment(complaint);

      });
		},

		error: function(error) {
  		alert("Error: " + error.code + " " + error.message);
  	}
  });
}

function retrieveCommentData(complaint) {
  //get comment data
  var Comment = Parse.Object.extend('Comment');
  var qComment = new Parse.Query(Comment);
  qComment.equalTo('complaintId', complaint);
  qComment.descending('updatedAt');
  qComment.find({
    success: function(comments) {
      for (var i=0; i<comments.length; i++) {
        var comment = comments[i];
        appendComment(comment);
      }
    },
    error: function(error) {
      console.log(error.message);
    }
  });
}

function retrieveVoteData(complaint) {
  //get vote data
  var VoteUser = Parse.Object.extend('VoteUser');
  var qVoteUser = new Parse.Query(VoteUser);
  qVoteUser.equalTo('complaintId', complaint);
  qVoteUser.find({
    success: function(results) {
      $('#votes').text(results.length);
      
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
}

function upVote(VoteUser, complaint) {
  var vote = new VoteUser();
  var user = new Parse.User();
  user.id = 'abcabcabc0';
  vote.set('userId', user);
  vote.set('complaintId', complaint);

  var currNum = parseInt( $('#votes').text() );
  vote.save(null, {
    success: function(vote) {
      $('#votes').text(currNum+1);
    },
    error: function(vote, error) {
      // Execute any logic that should take place if the save fails.
      // error is a Parse.Error with an error code and message.
      alert('Failed to create new object, with error code: ' + error.message);
    }
  });


  complaint.set('vote', currNum+1);
  complaint.save();
}

function setTagValue(idDom, complaint) {
  var Label = Parse.Object.extend('Label');
  var qLabel = new Parse.Query(Label);
  qLabel.get('' + complaint.get("category").id, {
    success: function(result) {
      $(idDom).html( '<strong>Category: </strong>' + result.get('name') );
    },
    error: function(error) {
      alert('Failed to retrieve tag name');
    }
  });
}

function appendComment(comment) {
  var listSaAnswer = $('#sa-answer-list');
  var listComment = $('#student-comment-list');

  var qUser = new Parse.Query(Parse.User);
  qUser.get(comment.get('commenterId').id, {
    success: function(user) {
      if (comment.get('isSaAnswer')) {
        listSaAnswer.append(
          '<div class="row sa-answer">' +
            '<div class="col-md-2 sa-answer-netid">Answer by: ' + user.get('netId') + '</div>' +
            '<div class="col-md-10 sa-answer-content">' + comment.get('Content') + '</div>' +
          '</div>'
        );
      }
      else {
        listComment.append(
          '<div class="row student-comment">' +
            '<div class="col-md-2 student-comment-netid">Comment by: ' + user.get('netId') + '</div>' +
            '<div class="col-md-10 student-comment-content">' + comment.get('Content') + '</div>' +
          '</div>'
        );
      } 
    },
    error: function(user) {
      alert('Failed to create new object, with error code: ' + error.message);
    }
  });
}