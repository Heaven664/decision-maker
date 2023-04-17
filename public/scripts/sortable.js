$(() => {
  //Implement drag and drop to sort options
  $('.options-table tbody').sortable({
    connectWith: "tbody",
  });

  //Once the voter submits the form collect their name and rankings
  $('.voter-name-form').on('submit', (event) => {
    event.preventDefault();

    //grab the data that we want to send back to the server
    //store option_id in an array to see ranking order
    const sortedIds = $('.options-table tbody').sortable('toArray', {attribute: 'data-position'});
    //grab poll id to be used in the post request url
    const id = $('#body').data().id;
    //grab the voter name for the post request
    const voter = $('#vote').val();
    console.log(voter)

    //create html for submission box
    const $submissionBox = $(`
    <div id="submission-box">
      <h1>Thank You!</h1>
      <i class="fa-solid fa-check-to-slot"></i>
      <p>Your submission has been received</p>
      <div id="button-box">
        <a href="/"><button>Home</button></a>
        <a href="/polls/new"><button>New Poll</button></a>
      </div>
    </div>`)

    //send the rankings and votername back to server
    $.ajax({
      type: 'POST',
      url: `/polls/${id}`,
      data: {
        sortedIds: sortedIds,
        voter_name: voter
      }
    }).then(() => {
      $('#title-top').empty();
      $('#instructions').empty();
      $('.sortable-options').remove(); //clear the poll info to simulate a refresh
      $('.voter-name-form').empty();
      // add in a new html box saying thanks for submitting click here to go to the home page
      $('.poll-info').append($submissionBox);
    })
  })

});
