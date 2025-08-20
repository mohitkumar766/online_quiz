const container = document.querySelector(".container");
const questionbox = document.querySelector(".question");
const choicesbox = document.querySelector(".choices");
const nextbtn = document.querySelector(".nextbutton");
const scorecard = document.querySelector(".scorecard");
const alert = document.querySelector(".alert");
const startbtn = document.querySelector(".startbtn");
const timer = document.querySelector(".timer");
const quiz = [
  {
    question: " Q:1 What does HTML stand for?",
    choices: [
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
      "Hyper Text Markup Language",
      "Hyperlinking Text Markup Language",
    ],
    answar: "Hyper Text Markup Language",
  },
  {
    question: "Q:2Which HTML tag is used to define an internal style sheet?",
    choices: ["<script>", "<style>", "<css>", "<link>"],
    answar: "<style>",
  },
  {
    question: "Q:3What does CSS stand for?",
    choices: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Colorful Style Sheets",
    ],
    answar: "Cascading Style Sheets",
  },
  {
    question: "Q:5Which property is used to change the background color in CSS?",
    choices: ["color", "background-color", "bgcolor", "background"],
    answar: "background-color",
  },
  {
    question: "Q:6Inside which HTML element do we put the JavaScript?",
    choices: ["<script>", "<js>", "<scripting>", "<javascript>"],
    answar: "<script>",
  },
  {
    question: "Q:7 Which symbol is used for comments in JavaScript?",
    choices: ["<!-- -->", "//", "/* */", "#"],
    answar: "//",
  },
  {
    question: "Q:8 Which HTML attribute is used to define inline styles?",
    choices: ["class", "style", "font", "styles"],
    answar: "style",
  },
  {
    question: "Q:9 Which tag is used to create a hyperlink in HTML?",
    choices: ["<a>", "<link>", "<href>", "<url>"],
    answar: "<a>",
  },
  {
    question: "Q:10 Which CSS property controls the text size?",
    choices : ["font-style", "text-size", "font-size", "text-style"],
    answar: "font-size",
  },
  {
    question: "Q:11 How do you write 'Hello World' in an alert box in JavaScript?",
    choices: [
      "msg('Hello World');",
      "alertBox('Hello World');",
      "alert('Hello World');",
      "msgBox('Hello World');",
    ],
    answar: "Qalert('Hello World');",
  },
  {
    question: "Q:12 Which input type defines a checkbox?",
    choices: ["type='checkbox'", "type='check'", "type='box'", "type='radio'"],
    answar: "type='checkbox'",
  },
  {
    question: "Q:13 How can you make a numbered list in HTML?",
    choices: ["<ul>", "<ol>", "<list>", "<dl>"],
    answar: "<ol>",
  },
  {
    question: "Q:14 Which CSS property is used to make text bold?",
    choices: ["font-weight", "font-style", "text-style", "weight"],
    answar: "font-weight",
  },
  {
    question: "Q:15 How do you create a function in JavaScript?",
    choices: [
      "function = myFunction()",
      "function myFunction()",
      "create myFunction()",
      "def myFunction()",
    ],
    answar: "function myFunction()",
  },
  {
    question: "Q:16 What does the 'id' attribute specify in HTML?",
    choices: [
      "A style",
      "A JavaScript function",
      "A unique identifier",
      "An element type",
    ],
    answar: "A unique identifier",
  },
  {
    question: "Q:17 Which HTML tag is used to define a table row?",
    choices: ["<table>", "<tr>", "<td>", "<th>"],
    answar: "<tr>",
  },
  {
    question: "Q:18 Which CSS property is used to change the font?",
    choices: ["font-family", "font-style", "text-style", "font-weight"],
    answar: "font-family",
  },
  {
    question:
      "Q:19 How do you call a function named 'myFunction' in JavaScript?",
    choices: [
      "call myFunction()",
      "myFunction()",
      "call function myFunction()",
      "execute.myFunction()",
    ],
    answar: "myFunction()",
  },
  {
    question: "Q:20 Which tag is used to display an image in HTML?",
    choices: ["<img>", "<image>", "<src>", "<picture>"],
    answar: "<img>",
  },
  {
    question: "Q:21 How do you apply a class style in CSS?",
    choices: [".classname", "#classname", "classname", "*classname"],
    answar: ".classname",
  },
];
let currques = 0;
let score = 0;
let quizover = false;
let timeleft = 10;
let timerid=null;
// function to show question
const showQuestion = () => {
  const questiondetails = quiz[currques];
  questionbox.textContent = questiondetails.question;
  choicesbox.textContent = "";
  for (let i = 0; i < questiondetails.choices.length; i++) {
    const currentChoice = questiondetails.choices[i];
    const choicediv = document.createElement("div");
    choicediv.textContent = currentChoice;
    choicediv.classList.add("choice");
    choicesbox.appendChild(choicediv);
    choicediv.addEventListener("click", () => {
      if (choicediv.classList.contains("selected")) {
        choicediv.classList.remove("selected");
      } else {
        choicediv.classList.add("selected");
      }
    });
  }
if(currques<quiz.length){
  Starttimer();
}
}



// function to check answar
const checkans = () => {
  const selectedchoice = document.querySelector(".choice.selected");
  if (selectedchoice.textContent === quiz[currques].answar) {
    // alert("right");
    displayalert("Right Answar");
    score++;
  } else {
    // alert("wrong");
    displayalert(`Wrong Answar! ${quiz[currques].answar} is the correct Ans`);
  }
  timeleft=10;
  currques++;
  if (currques < quiz.length) {
    showQuestion();
  } else {
    showscore();
    stoptimer();
    // quizover = true;
   

  }
};



// function to show score
const showscore = () => {
  questionbox.textContent = "";
  choicesbox.textContent = "";
  scorecard.textContent = `your score is ${score} out of ${quiz.length}!`;
  displayalert("You have completed this Quiz!");
  nextbtn.textContent = "Play Again";
  quizover=true;
   timer.style.display="none";
};


// function to display alertmsg
const displayalert = (msg) => {
  alert.style.display = "block";
  alert.textContent = msg;
  setTimeout(() => {
    alert.style.display = "none";
  }, 1500);
};


// function to display settimer
const Starttimer = () => {
  clearInterval(timerid);
  timer.textContent=timeleft;
  const countdown = () => {
    timeleft--;
    timer.textContent = timeleft;
    if(timeleft===0){
      const confrmuser=confirm("Time UP!!! Do you want to play again");
      if(confrmuser){
        timeleft=10;
        startqui();
      }
      else{
        startbtn.style.display="block";
        container.style.display="none";
        return;
      }
    }
  };

   timerid=setInterval(countdown, 1000);
};


// function to display stoptimer
const stoptimer=()=>{
clearInterval(timerid);
}


// function to display start quiz
const startqui=()=>{
  timeleft=10;
  timer.style.display="flex";
showQuestion();
}


// add addEventListener to start button
startbtn.addEventListener("click", () => {
  startbtn.style.display = "none";
  container.style.display = "block";
  // showQuestion();
  startqui();
});


nextbtn.addEventListener("click", () => {
  const selectedchoice = document.querySelector(".choice.selected");
  if (!selectedchoice && nextbtn.textContent === "NEXT") {
    displayalert("select your ans ");
    return;
  }
  if (quizover === true) {
    nextbtn.textContent = "Next";
    scorecard.textContent = "";
    currques = 0;

    quizover = false;
    score = 0;
        startqui();
  } else {
    checkans();
  }
});
