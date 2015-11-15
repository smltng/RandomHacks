/**
 * File   : submitcomplaint.js
 * Author : Danny
 */

$(document).ready(function() {
  Parse.initialize("z9ajnPiKmHIXc05vn7bojsGlH1gRVBIElbF0XcgU", "s8EsAA7ZNUab0UYTCYDOP20LylqYaKeaTyAFdsKm");

  var btnSubmit = $('#submit');
  btnSubmit.on('click', submitComplaint);

});

function submitComplaint() {
  var subject = $('#subject').val();
  var category = $('#category option:selected').text();
  var desc = $('#description').val();
  var isAnonymous = $('#anon').is(':checked');
  
  var Complaint = Parse.Object.extend('Complaint');
  var complaintObj = new Complaint();

  complaintObj.set('subject', subject);
  complaintObj.set('category', getCategoryPointer(category));
  complaintObj.set('description', desc);
  complaintObj.set('isAnonymous', isAnonymous);
  complaintObj.set('assignedId', null);
  complaintObj.set('vote', 0);
  complaintObj.set('status', 'Pending');
  complaintObj.set('image', null);

  var complainer = new Parse.User();
  complainer.id = 'blablablablas';
  complaintObj.set('complainerId', complainer);

  complaintObj.save(null, {
    success: function(complaintObj) {
      // Execute any logic that should take place after the object is saved.
      // alert('New object created with objectId: ' + complaintObj.id);
    },
    error: function(complaintObj, error) {
      // Execute any logic that should take place if the save fails.
      // error is a Parse.Error with an error code and message.
      // alert('Failed to create new object, with error code: ' + error.message);
    }
  });
  window.open ('index.html','_self',false)

}

function getCategoryPointer(category) {
  var Label = Parse.Object.extend('Label');
  var labelObj = new Label();

  switch(category) {
    case 'Dining':
      labelObj.id = 'j654dXD9Nc';
      break;
    case 'Elections':
      labelObj.id = 'hDHvkaw6xB';
      break;
    case 'Academic Policy':
      labelObj.id = 'Xn0ikT9D17';
      break;
    case 'City/Local Affairs':
      labelObj.id = 'PEG5B5XzDz';
      break;
    case 'Health and Wellness':
      labelObj.id = 'fvCdz1fQjO';
      break;
    case 'Student Assembly Infrastructure Fund':
      labelObj.id = 'GJG2Uy4JHp';
      break;
    case 'Residential Life':
      labelObj.id = 'Ieas6Z2YDo';
      break;
    case 'Technology':
      labelObj.id = '61fvjnn4hQ';
      break;
    case 'Financial Aid':
      labelObj.id = '69vriaX5YZ';
      break;
    case 'Appropriations':
      labelObj.id = 'RtTfLWgPn7';
      break;
    case 'Communications and Outreach':
      labelObj.id = 'FETAALWs4x';
      break;
    case 'Diversity':
      labelObj.id = 'F8fGV4f9tp';
      break;
    case 'Environmental Policy and Learning':
      labelObj.id = 'LoJXrimUBh';
      break;
    case 'Other':
      labelObj.id = 'UAyVCl2mvY';
      break;
  }
  return labelObj;
}