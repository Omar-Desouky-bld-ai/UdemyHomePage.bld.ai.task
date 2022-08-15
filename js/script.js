const API_URL = "http://localhost:3000/courses";
const SEARCH_API = "http://localhost:3000/courses?q=";

let coursesContainer = document.querySelector("#load-courses");

let searchButton = document.querySelector("nav .container form button");

let searchText = document.querySelector("nav .container form input");
console.log(searchText.value.toUpperCase());
getCourses(API_URL);

async function getCourses(url) {
  const response = await fetch(url);
  const responseData = await response.json();
  showCourses(responseData);
}

function showCourses(courses) {
  coursesContainer.innerHTML = ""; //clear courses

  courses.forEach((course) => {
    let courseImage = course.image;
    let courseTitle = course.title;
    let courseRating = course.rating;
    let courseInstructors = course.instructors;
    let coursePrice = course.price;
    let allInstructors = "";
    courseInstructors.forEach((person) => {
      allInstructors += person.name + ",";
    });

    let stars = "";
    let tempRating = String(courseRating);
    let rate = `${tempRating[0]}${tempRating[1]}${tempRating[2]}${tempRating[3]}`;

    while (courseRating >= 1) {
      stars += `<i class="fa-solid fa-star"></i>`;
      courseRating--;
    }
    if (courseRating >= 0.5) {
      stars += `<i class="fa-solid fa-star-half-stroke"></i>`;
    }

    coursesContainer.innerHTML += `
    <div class="box">
      <div class="pic"><img src="${courseImage}"/></div>
      <h4>${courseTitle}</h4>
      <span>${allInstructors}</span>
      <div class="rank">
          <span>${rate}</span>
          ${stars}
      </div>
      <p>E$${coursePrice}</p>
    </div>
    `;
  });
}

searchButton.addEventListener("click", function (obj) {
  obj.preventDefault();
  let filter = searchText.value.toUpperCase();
  let items = document.querySelectorAll(".box");
  let itemsTitle = document.querySelectorAll(".box h4");
  for (let x = 0; x < items.length; x++) {
    if (itemsTitle[x].innerHTML.toUpperCase().indexOf(filter) == -1) {
      items[x].style.display = "none";
    } else {
      items[x].style.display = "";
    }
  }
});
