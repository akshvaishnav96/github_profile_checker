let btn = document.getElementById("submit");

let input = document.getElementById("inputdata");
let carddiv = document.getElementById("carddiv");

btn.addEventListener("click", (e) => {
    e.preventDefault();
  inputval = input.value;

  const xhr = new XMLHttpRequest();
  const url = `https://api.github.com/users/${inputval}`;
  xhr.open("get", url);
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let data = JSON.parse(this.responseText);

      data.name ? data.name : (data.name = data.login);
      let date = new Date(data.created_at);
      date = date.toDateString("en-US");

      let cdiv = document.createElement("div");
    
      cdiv.innerHTML = `<div class="card m-auto my-3" style="width: 18rem">
      <img src="${data.avatar_url}" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">${data.name}</h5>
        <h6 class="card-title">From : ${date}</h6>
        
        <a href="${data.html_url} " target="_blank" class="btn btn-primary">Check Github Profile</a>
      </div>
      <h3 class="text-center">User Repositories : ${data.public_repos}</h3>
      
      <h6 class="text-center my-2">Total Followers : ${data.followers}</h6>
      <h6 class="text-center my-2">Total Following : ${data.following}</h6>
      <button class='btn btn-dark ' id='showbtn'>Show Repositories data
          </button>
      </div>

      <div class="accordion container my-2" id="accordionExample">

      </div>`;

      carddiv.appendChild(cdiv);

      let show = document.getElementById("showbtn");

    
      show.addEventListener("click", () => {
        let accoumadtion = document.getElementById("accordionExample");

        const xhr2 = new XMLHttpRequest();
        const url = `https://api.github.com/users/${inputval}/repos`;
        xhr2.open("get", url);
        xhr2.onreadystatechange = function () {
          if (this.readyState === 4) {
            let data = JSON.parse(this.responseText);
            
            data.map((e,i)=>{
                let date = new Date(e.created_at);
                date = date.toDateString("en-US");
                e.description ? e.description : e.description = "no description mention on the repository"
              accoumadtion.innerHTML += ` 


                <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                 ${i+1}.  Repository Name : ${e.name} <br>Created On : ${date}
                  </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <strong>${e.description}</strong> 
                    </div>
                    <a href='${e.html_url}'>  <button class="btn btn-primary my-3" type="button">
                           Go to ${e.name} Repo
                    </button></a>
                </div>
              </div>
              `;
            })

          
          }
        };

       
        xhr2.send()
      
      });

    }
};
xhr.send();
carddiv.innerHTML =''
});



