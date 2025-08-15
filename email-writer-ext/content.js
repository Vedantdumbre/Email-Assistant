console.log("hello! bro");

function createAIbutton() {

}
function findComposeToolbar() {

}

function injectButton(){
    const existingButton = document.querySelector('.ai-reply-button');
    if( existingButton ) existingButton.remove();

    const toolBar = findComposeToolbar();
    if(!toolBar) {
        console.log("Toolbar not found");
        return;
    }
    console.log("Toolbar found");
    const button = createAIbutton();
    button.classList.add('ai-reply-button');

    button.addEventListener('click', async () => {

    });
    toolBar.insertBefore(button, toolBar.firstChild);
}

const observer = new MutationObserver((mutations) => {
    for(const mutation of mutations) {
  const addedNodes = Array.from(mutation.addedNodes);
  const hasComposeElements = addedNodes.some(node =>
    node.nodeType === Node.ELEMENT_NODE &&
    (node.matches('.aDh, .bTC, [role="dialog"]') || node.querySelector('.aDh, .bTC, [role="dialog"]'))
    );

    if (hasComposeElements) {
        console.log("Compose Window Detected"); 
        setTimeout(injectButton, 500);
        }
    }
});

observer.observe(document.body, {
    childList: true, 
    subtree: true
});