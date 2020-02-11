import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import $ from "jquery";
import { Tamagotchi } from "./tamagotchi";

const urlHappy =
  "https://api.giphy.com/v1/gifs/random?api_key=NugGuaZWltD1aGOEFjEYel1ihO71FVuP&tag=cat&rating=G";
const urlBathroom =
  "https://api.giphy.com/v1/gifs/l3JDJ8hPoiNbAt6Uw?api_key=NugGuaZWltD1aGOEFjEYel1ihO71FVuP";
const urlFeed =
  "https://api.giphy.com/v1/gifs/9fuvOqZ8tbZOU?api_key=NugGuaZWltD1aGOEFjEYel1ihO71FVuP";
const urlMed =
  "https://api.giphy.com/v1/gifs/LPlwUTDBHZNutqFRzF?api_key=NugGuaZWltD1aGOEFjEYel1ihO71FVuP";

function setBackground(imageUrl) {
  $(`#gif`).css("background-image", "url(" + imageUrl + ")");
}

function updateStats(pet) {
  $(".stats").show();

  $("#begin").hide();
  $(".gameplay-btns").show();
  $("#pet-img").show();
  $("#egg-bg").show();
  $("#dead").hide();

  $("#health").text(`Health: ${pet.health}`);
  $("#potty").text(`Potty: ${pet.potty}`);
  $("#hunger").text(`Hunger: ${pet.hunger}`);
  $("#age").text(`Age: ${pet.getAge()}`);
  $("#happy").text(`Happy: ${pet.happy}`);
  if ($("#pet-img").hasClass("gravestone")) {
    $("#pet-img").removeClass();
    $("#pet-img").addClass("pet-1");
  } else if ($("#pet-img").hasClass("pet-1")) {
    $("#pet-img").removeClass();
    $("#pet-img").addClass("pet-2");
  } else if ($("#pet-img").hasClass("pet-2")) {
    $("#pet-img").removeClass();
    $("#pet-img").addClass("pet-1");
  }
}

function endGame(pet, interval) {
  $(".gameplay-btns").hide();
  $("#pet-img").removeClass();
  $("#pet-img").addClass("gravestone");
  $("#begin").show();
  $("#pet-name").hide();
  $(".stats").hide();
  $("#dead").show();
  $("#dead").text(`${pet.name} Died!`);
  clearTimeout(interval);
}

function gifHide() {
  setTimeout(() => {
    $("#gif-row").slideUp();
    $(".btn").prop("disabled", false);
  }, 3000);
}

function update(pet) {
  let interval = setInterval(() => {
    if (pet.isAlive) {
      updateStats(pet);
    } else {
      endGame(pet, interval);
    }
  }, 500);
}

function engine(pet) {
  pet.decreaseHappy();
  pet.makeHungry();
  pet.pottyIncrease();
  pet.increaseAge();
  update(pet);
}

$(document).ready(function() {
  let pet;
  $("#egg-bg").hide();
  $("#gif-row").hide();

  $("#begin").submit(function(event) {
    event.preventDefault();
    pet = new Tamagotchi($("#name").val());
    engine(pet);
    $("#pet-name").show();
    $("#pet-name").text(pet.name);
  });

  $("#med-btn").click(function(event) {
    event.preventDefault();
    pet.giveMedicine();
    fetch(urlMed)
      .then(function(response) {
        return response.json();
      })
      .then(function(jsonifiedResponse) {
        let imageUrl = jsonifiedResponse.data.images.downsized_large.url;
        setBackground(imageUrl);
        $("#gif-row").slideDown();
        $(".btn").prop("disabled", true);
        gifHide();
      });
  });

  $("#bathroom-btn").click(function(event) {
    event.preventDefault();
    pet.useToilet();
    fetch(urlBathroom)
      .then(function(response) {
        return response.json();
      })
      .then(function(jsonifiedResponse) {
        let imageUrl = jsonifiedResponse.data.images.downsized_large.url;
        setBackground(imageUrl);
        $("#gif-row").slideDown();
        $(".btn").prop("disabled", true);
        gifHide();
      });
  });

  $("#feed-btn").click(function(event) {
    event.preventDefault();
    pet.giveFood();
    fetch(urlFeed)
      .then(function(response) {
        return response.json();
      })
      .then(function(jsonifiedResponse) {
        let imageUrl = jsonifiedResponse.data.images.downsized_large.url;
        setBackground(imageUrl);
        $("#gif-row").slideDown();
        $(".btn").prop("disabled", true);
        gifHide();
      });
  });

  $("#happy-btn").click(function(event) {
    event.preventDefault();
    pet.increaseHappy();

    fetch(urlHappy)
      .then(function(response) {
        return response.json();
      })
      .then(function(jsonifiedResponse) {
        let imageUrl = jsonifiedResponse.data.image_url;
        setBackground(imageUrl);
        $("#gif-row").slideDown();
        $(".btn").prop("disabled", true);
        gifHide();
      });
  });
});
