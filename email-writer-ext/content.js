console.log("hello! bro");

function injectButton(){

}

const observer = new MutationObserver((mutations) => {
    for(const mutation of mutations) {
  const addedNodes = Array.from(mutation.addedNodes);
  const hasComposeElements = addedNodes.some(node =>
    node.nodeType === Node.ELEMENT_NODE &&
    (node.matches('.aDh, .bTC, [role="dialog"]') || node.querySelector('.aDh, .bTC, [role="dialog"]'))
    );
    }
    if (hasComposeElements) {
        console.log("Compose Window Detected");
        setTimeout(injectButton, 500);
    }
});

observer.observe(document.body, {
    childList: true, subtree: true
});