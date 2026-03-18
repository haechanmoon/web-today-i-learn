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


// 1. 필요한 요소들을 HTML에서 미리 찾아둡니다.
const modal = document.querySelector("#image-modal");
const modalImg = document.querySelector("#modal-img");
const captionText = document.querySelector("#caption");
const closeBtn = document.querySelector(".close-button");

// 2. 갤러리 안에 있는 모든 이미지 요소들을 가져옵니다.
const galleryImages = document.querySelectorAll(".gallery-grid img");

// 3. 각 사진마다 "클릭했을 때" 실행할 동작을 알려줍니다.
// 마치 Controller에서 URL 매핑하듯, 클릭이라는 요청(Request)에 대한 처리(Handler)를 정의하는 느낌입니다.
galleryImages.forEach(function(img) {
    img.addEventListener("click", function() {
        // [클릭 시 실행될 로직]

        // A. 숨겨져 있던 모달 창을 보여줍니다 (CSS를 display: block으로 변경)
        modal.style.display = "block";

        // B. 클릭한 '작은 사진'의 이미지 주소(src)를 가져와서,
        //    '큰 창에 있는 이미지 태그'의 주소로 덮어씁니다.
        modalImg.src = this.src;

        // C. 클릭한 사진의 설명(alt 값)을 가져와서 캡션 자리에 넣습니다.
        captionText.innerHTML = this.alt;
    });
});

// 4. 'X' 버튼을 클릭하면 창을 닫는 로직입니다.
closeBtn.addEventListener("click", function() {
    // [X 클릭 시 실행될 로직]

    // 모달 창을 다시 숨깁니다 (CSS를 display: none으로 변경)
    modal.style.display = "none";
});

// 5. 센스 있게: 'X' 버튼 말고 검은색 배경을 클릭해도 창이 닫히게 합니다.
modal.addEventListener("click", function(event) {
    // 클릭한 대상이 사진 자체가 아니라 배경(modal 창 자체)일 때만 닫습니다.
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
