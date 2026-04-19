// =============================================================
//  SECURE VERSION — no API key in the browser.
//  The frontend calls /api/ask which lives on the Vercel server.
//  The server reads OPENAI_API_KEY from its environment variables
//  (set in Vercel dashboard) and forwards the request to OpenAI.
// =============================================================

// ----- Homepage: forward search to result.html -----
const homeForm = document.getElementById("searchForm");
if (homeForm) {
  homeForm.addEventListener("submit", function (e) {
    const q = document.getElementById("searchInput").value.trim();
    if (!q) {
      e.preventDefault();
    }
  });
}

// ----- Result page: read ?q=, fill input, call /api/ask -----
const resultInput = document.getElementById("resultSearchInput");
if (resultInput) {
  const params = new URLSearchParams(window.location.search);
  const question = (params.get("q") || "").trim();
  resultInput.value = question;

  const ref2Query  = document.getElementById("ref2-query");
  const ref2Title  = document.getElementById("ref2-title");
  const ref2Answer = document.getElementById("ref2-answer");
  const ref2Date   = document.getElementById("ref2-date");

  if (ref2Date) {
    ref2Date.textContent = new Date().getFullYear();
  }

  if (!question) {
    if (ref2Query)  ref2Query.textContent  = "(no query provided)";
    if (ref2Title)  ref2Title.textContent  = "No question submitted.";
    if (ref2Answer) ref2Answer.textContent = "Type a question on the homepage and click Search.";
  } else {
    if (ref2Query)  ref2Query.textContent  = question;
    if (ref2Title)  ref2Title.textContent  = "Loading answer from OpenAI…";
    if (ref2Answer) ref2Answer.textContent = "Loading…";

    fetchAnswer(question)
      .then(function (answer) {
        if (ref2Title)  ref2Title.textContent  = "AI-generated response for: " + question;
        if (ref2Answer) ref2Answer.textContent = answer;
      })
      .catch(function (err) {
        if (ref2Title)  ref2Title.textContent  = "Error fetching answer.";
        if (ref2Answer) ref2Answer.textContent = String(err && err.message ? err.message : err);
      });
  }
}

function fetchAnswer(question) {
  return fetch("/api/ask?q=" + encodeURIComponent(question))
    .then(function (res) {
      return res.json().then(function (data) {
        if (!res.ok) {
          throw new Error(data.error + (data.detail ? " — " + data.detail : ""));
        }
        return data.answer;
      });
    });
}
