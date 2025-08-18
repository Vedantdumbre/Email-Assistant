console.log("hello! bro");

function createAIButton() {
  const button = document.createElement('div');
  button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
  button.style.marginRight = '8px';
  button.innerHTML = 'AI Reply';
  button.setAttribute('role', 'button');
  button.setAttribute('data-tooltip', 'Generate AI Reply');
  return button;
}

function getEmailContent() {
  const selectors = [
    '.h7',
    '.a3s.aiL',
    '.gmail_quote',
    '[role="presentation"]'
  ];
  for (const selector of selectors) {
    const content = document.querySelector(selector);
    if (content) {
      return content.innerText.trim(); 
      // 🔥 FIX #1: use innerText instead of innerHTML
      // Gmail adds tons of HTML markup. innerText ensures only raw readable text is sent to API.
    }
  }
  return ''; // 🔥 FIX #2: return must be OUTSIDE loop, else it was exiting after first selector
}

function findComposeToolbar() {
  const selectors = [
    '.btC',
    '.aDh',
    '[role="toolbar"]',
    '.gU.Up'
  ];
  for (const selector of selectors) {
    const toolbar = document.querySelector(selector);
    if (toolbar) {
      return toolbar;
    }
  }
  return null; // 🔥 FIX #3: same issue as above; return null must be outside loop
}

function injectButton() {
  const existingButton = document.querySelector('.ai-reply-button');
  if (existingButton) existingButton.remove();

  const toolBar = findComposeToolbar();
  if (!toolBar) {
    console.log("Toolbar not found");
    return;
  }
  console.log("Toolbar found");

  const button = createAIButton();
  button.classList.add('ai-reply-button');

  button.addEventListener('click', async () => {
    try {
      button.innerHTML = 'Generating...';
      button.setAttribute('disabled', true); 
      // 🔥 FIX #4: Gmail "div" doesn’t support `.disabled`. Need to manually set attribute.

      const emailContent = getEmailContent();
      const response = await fetch('http://localhost:8080/api/email/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          emailContent: emailContent,
          tone: "Professional" // tone must be changed later with dropdown
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }
      const generateReply = await response.text();

      // 🔥 FIX #5: Gmail compose box selector was wrong
      // 🔥 FIXED compose box selector
const composeBox = document.querySelector('div[role="textbox"][contenteditable="true"]');

// Gmail compose body is always an editable div with role="textbox"
if (composeBox) {
  composeBox.focus();
  document.execCommand('insertHTML', false, generateReply);
} else {
  console.error("Compose box not found");
}

    } catch (error) {
      console.error(error);
      alert("Failed to generate reply");
    } finally {
      button.innerHTML = 'AI Reply';
      button.removeAttribute('disabled'); 
      // 🔥 FIX #6: undo disabled properly
    }
  });

  toolBar.insertBefore(button, toolBar.firstChild);
}

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    const addedNodes = Array.from(mutation.addedNodes);
    const hasComposeElements = addedNodes.some(node =>
      node.nodeType === Node.ELEMENT_NODE &&
      (node.matches('.aDh, .btC, [role="dialog"]') || node.querySelector('.aDh, .btC, [role="dialog"]'))
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
