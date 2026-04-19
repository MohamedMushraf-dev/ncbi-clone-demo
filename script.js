const homeForm = document.getElementById('searchForm');
if (homeForm) {
  homeForm.addEventListener('submit', function (e) {
    const homeInput = document.getElementById('searchInput') || document.getElementById('term');
    const q = homeInput ? homeInput.value.trim() : '';
    if (!q) {
      e.preventDefault();
    }
  });
}

const resultForm = document.getElementById('resultSearchForm');
if (resultForm) {
  const params = new URLSearchParams(window.location.search);
  const question = (params.get('q') || '').trim();
  const resultInput = document.getElementById('resultSearchInput') || document.querySelector('#resultSearchForm #term');

  if (resultInput) {
    resultInput.value = question;
  }

  const ref2Query = document.getElementById('ref2-query');
  const ref2Title = document.getElementById('ref2-title');
  const ref2Answer = document.getElementById('ref2-answer');
  const ref2Date = document.getElementById('ref2-date');

  if (ref2Date) {
    ref2Date.textContent = new Date().getFullYear();
  }

  if (!question) {
    if (ref2Query) ref2Query.textContent = '(no query provided)';
    if (ref2Title) ref2Title.textContent = 'No question submitted.';
    if (ref2Answer) ref2Answer.textContent = 'Type a question on the homepage and click Search.';
  } else {
    if (ref2Query) ref2Query.textContent = question;
    if (ref2Title) ref2Title.textContent = 'Loading answer from OpenAI...';
    if (ref2Answer) ref2Answer.textContent = 'Loading...';

    fetchAnswer(question)
      .then(function (answer) {
        if (ref2Title) ref2Title.textContent = 'AI-generated response for: ' + question;
        if (ref2Answer) ref2Answer.textContent = answer;
      })
      .catch(function (err) {
        if (ref2Title) ref2Title.textContent = 'Error fetching answer.';
        if (ref2Answer) ref2Answer.textContent = String(err && err.message ? err.message : err);
      });
  }
}

function fetchAnswer(question) {
  return fetch('/api/ask?q=' + encodeURIComponent(question)).then(function (res) {
    return res.json().then(function (data) {
      if (!res.ok) {
        throw new Error(data.error + (data.detail ? ' — ' + data.detail : ''));
      }
      return data.answer;
    });
  });
}
