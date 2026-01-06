export function renderLoading(
  isLoading,
  button,
  buttonText = "Save",
  loadingText = "Saving..."
) {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}

export function handleSubmit(request, evt, loadingText = "Saving...") {
  evt.preventDefault();

  // The button is always available inside `event` as `submitter`
  const submitButton = evt.submitter;
  // Fix the initial button text
  const initialText = submitButton.textContent;
  // Change the button text before requesting
  renderLoading(true, submitButton, initialText, loadingText);
  // Call the request function to be able to use the promise chain
  request()
    .then(() => {
      // Any form should be reset after a successful response
      // evt.target is the form in any submit handler
      evt.target.reset();
    })
    // We need to catch possible errors
    // console.error is used to handle errors if you don't have any other ways for that
    .catch(console.error)
    // And in finally we need to stop loading
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}

export function setButtonText(
  button,
  isLoading,
  defaultText = "Save",
  loadingText = "Saving..."
) {
  renderLoading(isLoading, button, defaultText, loadingText);
}
