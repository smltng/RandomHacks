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
        
        var strDate = '' + object.createdAt;
        var arrDate = strDate.split(' ');
        var month = arrDate[1];
        var date = arrDate[2];
        var year = arrDate[3];

        // create complaint DOM 
        listContainer.append(
          '<div class="complaint">' +
            '<div class = "complaint-left">' +
              '<a href="view.html" data-id="' +object.id+ '">' + object.get('subject') + '</a>' +
              '<p>' + object.get('description') + '</p>' +
            '</div>' +
            '<div class = "complaint-right">' +
              '<p>Submitted on: ' + month + ' ' + date + ', ' + year +
              '<br>Status: ' + object.get('status') + '</p>' +
            '</div>' +
          '</div>'
        ); 
        
        // add complaint-id to the complain's view URL
        $('a[data-id="' +object.id+ '"]').on('click', function() {
          location.href = this.href + '?id=' + object.id;
          return false;
        });
      }
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
}
