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
    		var time = arrDate[4];
        var arrhour = time.split(':');
        var hour = arrhour[0] + ':' + arrhour[1];

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
          '<div class="complaint row">' +
            '<div class="complaint-left col-sm-9">' +
              '<button id=' +objectId+ ' type="button" class="votes btn btn-success glyphicon glyphicon-thumbs-up">' +object.get('vote')+ '</button>' +
              '<a href="view.html" data-id="' +objectId+ '">' + subject + '</a>' +
              '<p class="complaint-desc">' + description + '</p>' +
            '</div>' +
            '<div class = "complaint-right col-sm-3">' +
              '<p>' + month + ' ' + date + ', at ' + hour +
              '<br><em><span class="status">' + object.get('status') + '</span></em>' +
              '<br><em><span class="currentCat">' + object.get('label') + '</span></p>' +
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
    var e = document.getElementById("filter-category");
    var strCat = e.options[e.selectedIndex].value;

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
      var catArr = $(".currentCat");
      for( var i =0; i<pendArr.length; i++){
        // console.log($(pendArr[i]).text());
        if($(pendArr[i]).text()==="Pending" && $(catArr[i]).text()!=strCat){
          $(pendArr[i]).closest(".complaint").hide();

        }
      }
    }
    if(i){
      var pendArr = $(".status");
      var catArr = $(".currentCat");
      for( var i =0; i<pendArr.length; i++){
        // console.log($(catArr[i]).text());
        if($(pendArr[i]).text()==="In Progress" && $(catArr[i]).text()!=strCat){
          // console.log("STRINGS");
          // console.log($(catArr[i]).text());
          // console.log(strCat);
          $(pendArr[i]).closest(".complaint").hide();
        }
      }
    }
    if(r){
      var pendArr = $(".status");
      var catArr = $(".currentCat");
      for( var i =0; i<pendArr.length; i++){
        // console.log($(pendArr[i]).text());
        if($(pendArr[i]).text()==="Resolved" && $((catArr[i]).text()!=strCat)){
          $(pendArr[i]).closest(".complaint").hide();

        }
      }
    }
    if(!p){
      var pendArr = $(".status");
      var catArr = $(".currentCat");
      for( var i =0; i<pendArr.length; i++){
        // console.log($(pendArr[i]).text());
        if($(pendArr[i]).text()==="Pending"){
          if($(catArr[i]).text()===strCat||strCat==="Select"){
            $(pendArr[i]).closest(".complaint").show();
          }else{
            $(pendArr[i]).closest(".complaint").hide();
          }
        }else if($(pendArr[i]).text()==="Pending"){
          $(pendArr[i]).closest(".complaint").show();
        }
      }
    }
    if(!i){
      var pendArr = $(".status");
      var catArr = $(".currentCat");
      for( var i =0; i<pendArr.length; i++){
        // console.log($(pendArr[i]).text());
        if($(pendArr[i]).text()==="In Progress"){
          if($(catArr[i]).text()===strCat||strCat==="Select"){
            $(pendArr[i]).closest(".complaint").show();
          }else{
            $(pendArr[i]).closest(".complaint").hide();
          }
        }else if($(pendArr[i]).text()==="In Progress"){
          $(pendArr[i]).closest(".complaint").show();
        }
      }
    }
    if(!r){
      var pendArr = $(".status");
      for( var i =0; i<pendArr.length; i++){
        console.log($(pendArr[i]).text());
        if($(pendArr[i]).text()==="Resolved"){
          if($(catArr[i]).text()===strCat||strCat==="Select"){
            $(pendArr[i]).closest(".complaint").show();
          }else{
            $(pendArr[i]).closest(".complaint").hide();
          }
        }else if($(pendArr[i]).text()==="Resolved"){
          $(pendArr[i]).closest(".complaint").show();
        }
      }
    }

  });

  $("#reset").on("click",function(){
    
  window.open ('index.html','_self',false)
  });


}
