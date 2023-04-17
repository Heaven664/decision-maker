$(() => {
  /**
 * Escapes unsafe characters
 * @param {string} str - any sequence of characters
 * @returns same string
 */
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  /**
   *
   * @param {object} option
   * @returns jquery object with html structure
   */
  const createOption = (option) => {
    const $option = $(`
    <div class="option-instance">
      <div class="option-info">
        <div class="option-title-info">
          <h3>${escape(option.title)}</h3>
        </div>
        <div class="option-description-info">
          ${option.description ? `<p>${escape(option.description)}</p>` : ''}
        </div>
      </div>
      <button class="delete-option" id=${escape(option.id)}>Delete</button>
    </div>
    `);
    return $option;
  };

  // Sent ajax request on adding new option and add to DOM
  $('.new-option').on('submit', function (event) {
    event.preventDefault();
    const data = $(this).serialize();

    $.post('/options', data)
      .then(response => createOption(response))
      .then(element => $('.option-container').prepend(element))
      .then(() => {
        $('#option-title-input').val('');
        $('#option-description-input').val('');
      });
  });

  // Send ajax request on deleting an option and remove from DOM
  $(".option-container").on("click", ".delete-option", function () {
    const options_id = $(this).attr('id');
    $.post(`/options/delete/${options_id}`)
      .then(() => $(this).parent().remove())
  });

  // Send ajax request on completing a poll and change DOM content to the success message
  $('#complete-poll').on('submit', (event) => {
    event.preventDefault();
    const id = $('#pollId').val();

    $.post(`/options/${id}`)
      .then((email) => {
        const $main = $('main');
        const successMessage = `
        <div class="new-option">
        <header style="text-align: center">
          <p>Links successfully sent to <b>${email}</b></p>
        </header>
        <footer style="display:flex; justify-content: space-evenly; margin-bottom: 0;">
        <a href="/"><button>Homepage</button></a>
        <a href="/polls/new"><button>New Poll</button></a>
        </footer>`;
        $main.empty();
        $main.append(successMessage);
      });
  });
});
