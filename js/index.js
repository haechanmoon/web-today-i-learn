const tilForm = document.querySelector("#til-form");
const tilList = document.querySelector("#til-list");

tilForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // 1. 각 입력 요소의 값 가져오기
    const date = document.querySelector("#til-date").value;
    const title = document.querySelector("#til-title").value;
    const content = document.querySelector("#til-content").value;

    // 2. 새 항목을 위한 HTML 구조 만들기 (Template Literal 활용)
    const listItem = document.createElement("li");
    listItem.classList.add("til-item"); // 스타일링을 위한 클래스 추가

    listItem.innerHTML = `
    <div class="til-card">
      <div class="til-header">
        <span class="date">${date}</span>
        <h3>${title}</h3>
      </div>
      <p class="content">${content.replace(/\n/g, '<br>')}</p>
    </div>
  `;

    // 3. 목록의 맨 앞에 추가하기 (최신 글이 위로 오도록)
    tilList.prepend(listItem);

    // 4. 입력 폼 초기화
    tilForm.reset();
});
