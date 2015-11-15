/**
 * File   : index.js
 * Author : author.js
 */

 $(document).ready(function() {
  Parse.initialize("z9ajnPiKmHIXc05vn7bojsGlH1gRVBIElbF0XcgU", "s8EsAA7ZNUab0UYTCYDOP20LylqYaKeaTyAFdsKm");

  appendComplaints();
 });

function appendComplaints() {
  var listContainer = $('#complaint-list');

  var Complaint = Parse.Object.extend("Complaint");
  var query = new Parse.Query(Complaint);
  query.find({
    success: function(results) {
      for (var i=0; i < results.length; i++) {
        var object = results[i];
        var objectId = ''+object.id;
      
        var strDate = '' + object.createdAt;
        var arrDate = strDate.split(' ');
        var month = arrDate[1];
        var date = arrDate[2];
        var year = arrDate[3];
    		var hour = arrDate[4];
        
        var subject;
    		if (object.get('subject').length > 35){
    			subject = object.get('subject').substring(0,35) + '...'; 
    		}else{
    			subject = object.get('subject');
    		}
    		var description;
    		if (object.get('description').length > 60){
    			description = object.get('description').substring(0,60) + '...'; 
    		}else{
    			description = object.get('description');
    		}
		
        // create complaint DOM 
        listContainer.prepend(
          '<div class="complaint">' +
            '<div class = "complaint-left">' +
              '<a href="view.html" data-id="' +objectId+ '">' + subject + '</a>' +
              '<p>' + description + '</p>' +
            '</div>' +
            '<div class = "complaint-right">' +
              '<p>' + month + ' ' + date + ', ' + year +
              '<br><span class="status">' + object.get('status') + '</span>' +
              '<br>' + object.get('label') + '</p>' +
            '</div>' +
          '</div>'
        ); 
        
        // add complaint-id to the complain's view URL
        $('a[data-id="' +objectId+ '"]').on('click', function() {
          location.href = this.href + '?id=' + $(this).attr('data-id');
          return false;
        });
      }
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });

  $("#filtersubmit").on('click',function(){
    var p=true;
    var i=true;
    var r=true;
    if(document.getElementById("pending").checked){
      p=false;
    }
    if(document.getElementById("inprogress").checked){
      i=false;
    }
    if(document.getElementById("resolved").checked){
      r=false;
    }
    if(p){
      var pendArr = $(".status");
      for( var i =0; i<pendArr.length; i++){
        console.log($(pendArr[i]).text());
        if($(pendArr[i]).text()==="Pending"){
          $(pendArr[i]).closest(".complaint").hide();

        }
      }
    }
    if(i){
      var pendArr = $(".status");
      for( var i =0; i<pendArr.length; i++){
        console.log($(pendArr[i]).text());
        if($(pendArr[i]).text()==="In Progress"){
          $(pendArr[i]).closest(".complaint").hide();

        }
      }
    }
    if(r){
      var pendArr = $(".status");
      for( var i =0; i<pendArr.length; i++){
        console.log($(pendArr[i]).text());
        if($(pendArr[i]).text()==="Resolved"){
          $(pendArr[i]).closest(".complaint").hide();

        }
      }
    }
    if(!p){
      var pendArr = $(".status");
      for( var i =0; i<pendArr.length; i++){
        console.log($(pendArr[i]).text());
        if($(pendArr[i]).text()==="Pending"){
          $(pendArr[i]).closest(".complaint").show();

        }
      }
    }
    if(!i){
      var pendArr = $(".status");
      for( var i =0; i<pendArr.length; i++){
        console.log($(pendArr[i]).text());
        if($(pendArr[i]).text()==="In Progress"){
          $(pendArr[i]).closest(".complaint").show();

        }
      }
    }
    if(!r){
      var pendArr = $(".status");
      for( var i =0; i<pendArr.length; i++){
        console.log($(pendArr[i]).text());
        if($(pendArr[i]).text()==="Resolved"){
          $(pendArr[i]).closest(".complaint").show();

        }
      }
    }

  });



}

