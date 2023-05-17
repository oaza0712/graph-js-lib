import {KidChart} from "./KidChart.js" ;

class InputTable{

    addCard(tableId, dataCardsId) {

        let dataCard = document.getElementById("dataCards");
      
        let card = document.createElement('div');
        card.className = "card";
        //card.id="card"+dataCardsId;
      
      
        let header = document.createElement('div');
        header.className = "header";
        let inputCard1 = document.createElement('input');
        inputCard1.className = "inputCard1"
      
        let chatContainer = document.createElement('div');
        chatContainer.className = 'chat-container';
      
        let chatUtilities = document.createElement('div');
        chatUtilities.className = 'chat-utilities';
      
        let utilityContainer = document.createElement('div');
        utilityContainer.className = 'utility-container';
      
        let utilityGroup = document.createElement('ul');
        utilityGroup.className = 'utility-group';
      
        let emojiSelectorCreate = document.createElement('li');
        emojiSelectorCreate.className = 'emoji-selector';
        emojiSelectorCreate.id = 'emojiSelector';
      
        let inputContainer = document.createElement('div');
        inputContainer.className = 'input-container';
      
        let emojiSearchCreate = document.createElement('input');
        emojiSearchCreate.id = 'emojiSearch';
        emojiSearchCreate.setAttribute("type", "text");
        emojiSearchCreate.setAttribute("placeholder", "Search...");
      
      
        let emojiListCreate = document.createElement('ul');
        emojiListCreate.className = "emoji-list";
        emojiListCreate.id = 'emojiList';
      
        let emojiSelectorIconCreate = document.createElement('li');
        emojiSelectorIconCreate.id = "emojiSelectorIcon";
      
        let img = document.createElement('img');
        img.setAttribute('src', '/face-smile-regular.f92a0962.svg');
      
        emojiSelectorIconCreate.appendChild(img);
      
        inputContainer.appendChild(emojiSearchCreate);
      
        emojiSelectorCreate.appendChild(inputContainer);
        emojiSelectorCreate.appendChild(emojiListCreate);
      
        utilityGroup.appendChild(emojiSelectorCreate);
        utilityGroup.appendChild(emojiSelectorIconCreate);
      
        utilityContainer.appendChild(utilityGroup);
        chatUtilities.appendChild(utilityContainer);
        chatContainer.appendChild(chatUtilities);
      
        header.appendChild(chatContainer);
      
        //ADDING COLORPICKER
        let colorPicker = document.createElement('div');
        colorPicker.className='picker'
        colorPicker.id=dataCardsId;
      
        header.appendChild(colorPicker);
      
        //CHECKING IF POP UP IS IN VIEWPORT
        var isOutOfViewport = function (elem) {
      
          var bounding = elem.getBoundingClientRect();
      
          var out = {};
          out.top = bounding.top < 0;
          out.left = bounding.left < 0;
          out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
          out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth);
          out.any = out.top || out.left || out.bottom || out.right;
          out.all = out.top && out.left && out.bottom && out.right;
      
          return out;
      
        };
      
        emojiSelectorIconCreate.addEventListener('click', () => {
          emojiSelectorCreate.classList.toggle('active');
          var isOut = isOutOfViewport(emojiSelectorCreate);
          if (isOut.any) {
            emojiSelectorCreate.style.bottom = '-710%'
          }
        });
      
        //LOADING EMOJIS
        let emojiCategories = [];
        function setEmojiCategories(wishedCategories) {
          emojiCategories = wishedCategories;
        }
      
        let EmojisPerCategory;
        function setEmojisPerCategory(num) {
          EmojisPerCategory = num;
        }
      
        setEmojisPerCategory(10);
        setEmojiCategories(['food-drink']);
      
        fetch('https://emoji-api.com/emojis?access_key=329dfe7d47ca9bf032e6959bd2692f5624520d19').then(res => res.json()).then(data => loadEmoji(data, emojiCategories, EmojisPerCategory));
      
        function loadEmoji(data, emojiCategories, EmojisPerCategory) {
          let counter = 0;
          let previousCategory;
          let currentCategory;
          let first = true;
      
          let emojiCodePoints = new Set()
      
          data.forEach(emoji => {
            if (!emojiCodePoints.has(emoji.codePoint)) {
              if (first) {
                previousCategory = emoji.group;
                first = false;
              }
              let li = document.createElement('li');
              li.setAttribute('emoji-name', emoji.slug)
              li.textContent = emoji.character;
              let currentCategory = emoji.group;
              if (previousCategory == currentCategory) {
                counter++;
              } else {
                counter = 1;
              }
              if (emojiCategories.includes(emoji.group) && counter <= EmojisPerCategory) {
                li.addEventListener('click', () => {
                  emojiSelectorIconCreate.style.display = "none";
                  let emojiInputExists = utilityGroup.getElementsByTagName('p').length;
      
                  //DISABLE INPUTING MULTIPLE EMOJIS IN ONE CARD
                  if (emojiInputExists) {
                    utilityGroup.getElementsByTagName('p')[0].remove();
                  }
      
                  let emojiInput = document.createElement('p');
                  emojiInput.textContent = emoji.character;
                  emojiInput.className = "emoji-input";
      
                  emojiSelectorCreate.classList.toggle('active');
      
                  emojiInput.addEventListener('click', () => {
                    emojiSelectorCreate.classList.toggle('active');
                    var isOut = isOutOfViewport(emojiSelectorCreate);
                    if (isOut.any) {
                      emojiSelectorCreate.style.bottom = '-710%'
                    }
                  });
      
                  utilityGroup.appendChild(emojiInput);
      
                });
                emojiListCreate.appendChild(li);
      
                previousCategory = currentCategory;
      
              }
              emojiCodePoints.add(emoji.codePoint)
            }
          });
        }
      
        //SEARCHING EMOJIS
        emojiSearchCreate.addEventListener('keyup', e => {
          let value = e.target.value;
          let emojis = document.querySelectorAll('#emojiList li');
          emojis.forEach(emoji => {
            if (emoji.getAttribute('emoji-name').toLowerCase().includes(value)) {
              emoji.style.display = 'flex';
            } else {
              emoji.style.display = 'none';
            }
          })
        })
      
      
        //MAKING CARDS FOR NUMBER AND TEXT INPUT
        let container = document.createElement('div');
        container.className = "container";
        let inputCard2 = document.createElement('input');
        inputCard2.className = "inputCard2"
        inputCard2.setAttribute("placeHolder", "Input name");
        container.appendChild(inputCard2);
      
        let container2 = document.createElement('div');
        container2.className = "container2";
        let inputCard3 = document.createElement('input');
        inputCard3.className = "inputCard3"
        inputCard3.setAttribute("placeHolder", "Input number");
        container2.appendChild(inputCard3);
      
        //ADDING DELETE CARD BUTOTN
        let deleteButton = document.createElement('button');
        deleteButton.className = "deleteButton";
      
        header.style.position = "relative";
        deleteButton.style.position = "absolute"
        deleteButton.style.top = "5px"
        deleteButton.style.left = "5px"
        
        header.appendChild(deleteButton);
      
        card.appendChild(header);
        card.appendChild(container);
        card.appendChild(container2);
        
        deleteButton.addEventListener('click', e => {
          card.remove();
        })
      
        dataCard.appendChild(card);
        let id = new String("#" + dataCardsId.toString()); 
        console.log("id:"+id);
        $('#'+dataCardsId).colorPick({
              'initialColor' : '#8e44ad',
              'palette': ["#1abc9c", "#16a085", "#2ecc71", "#27ae60", "#3498db", "#2980b9", "#9b59b6", "#8e44ad", "#34495e", "#2c3e50", "#f1c40f", "#f39c12", "#e67e22", "#d35400", "#e74c3c", "#c0392b", "#ecf0f1"],
              'onColorSelected': function() {
                  console.log("The user has selected the color: " + this.color)
                  this.element.css({'backgroundColor': this.color, 'color': this.color});
              }
          });
    }

	constructor(tableId, buttonId, dataCardsId){
    	this.tableId=tableId;
      	this.buttonId=buttonId;
        this.dataCardsId=dataCardsId;
        let tableElement = document.getElementById(tableId);
        let tableButtons = document.getElementById(buttonId);
      
        let addButton = document.createElement('button');
        addButton.id = "add";
        addButton.className = "button-85";
        addButton.setAttribute('role', "button");
        addButton.innerHTML = "+";
      
        let createButton = document.createElement('button');
        createButton.id = "get";
        createButton.className = "button-85";
        createButton.setAttribute('role', "button");
        createButton.innerHTML = "Create line Pictogram";
      
        let dataCard = document.createElement('div');
        dataCard.className = 'dataCards';
        dataCard.id = 'dataCards';
      
        let row = document.createElement('div');
        row.className = 'row';
        dataCard.appendChild(row);
      
        tableElement.appendChild(dataCard);
      
        addButton.addEventListener('click', (event) => { 
            this.addCard(tableId,dataCardsId).bind(this);
          dataCardsId++;
         });
      
        tableButtons.appendChild(addButton);
        tableButtons.appendChild(createButton);
      
      
    };

     getData() {
        let table = document.getElementById('dataCards');
      
      
        let unicode = table.getElementsByClassName('emoji-input');
        let unicodeArray = [];
        for (let i = 0; i < unicode.length; i++) {
          if (unicode[i].textContent.trim != "") {
            unicodeArray[i] = unicode[i].textContent
          }
        }
      
        let name = table.getElementsByClassName('inputCard2');
        let nameArray = [];
        for (let i = 0; i < name.length; i++) {
          if (name[i].value.length != 0) {
            nameArray[i] = name[i].value
      
          }
        }
      
        let number = table.getElementsByClassName('inputCard3');
        let numberArray = [];
        for (let i = 0; i < number.length; i++) {
          if (number[i].value.length != 0) {
      
            numberArray[i] = number[i].value
          }
        }
        let color = table.getElementsByClassName('picker');
        let colorArray = [];
        let backgroundColorArray = [];
      
      
        for (let i = 0; i < color.length; i++) {
         // if (color[i].value.length != 0) {
            colorArray[i] = color[i].style.color.replace(')', ', 0.75)').replace('rgb', 'rgba');
            backgroundColorArray[i] = color[i].style.color.replace(')', ', 0.65)').replace('rgb', 'rgba');
      
         // }
        }
        return {
          labels: nameArray,
          values: numberArray,
          unicode: unicodeArray,
          backgroundColor: backgroundColorArray,
          color: colorArray
        }
      
      }
       
      createGraphCard(canvasId) {

        let body = document.getElementById('body');
        let chartCard = document.createElement('div');
        chartCard.className = "chartCard";
      
        let chartName = document.createElement('div');
      
        chartName.innerHTML = canvasId.replace("[0-9]", "");
        let chartBox = document.createElement('div');
        chartBox.className = "chartBox";
      
        let canvas = document.createElement('canvas');
        canvas.id = canvasId;
      
        let maxButton = document.createElement('button');
        maxButton.className = "button-85";
        maxButton.id = "maxButton"
        maxButton.innerHTML = "Show MAX value";
      
        chartBox.appendChild(chartName);
        chartBox.appendChild(canvas);
        chartBox.appendChild(maxButton);
      
        chartCard.appendChild(chartBox);
      
        body.appendChild(chartCard);
      
      }
            
       collectButton() {
        const button = document.getElementById("get");
        button.addEventListener('click', (event) => {
          temp =  this.getData().bind(this);
          let Bar2 = {
            type: "bar",
            labels: temp.labels,
            values: temp.values,
            unicode: temp.unicode,
            color: temp.color
          };
      
          createGraphCard("barPictogram" + canvasId.toString())
          const barPictogramReturn = KidChart(barPictogram, Bar2, "barPictogram" + canvasId.toString());
          canvasId++;
      
          //createGraphCard('barTransition')
          //KidChart(barTransition, Bar2, 'barTransition');
      
          //createGraphCard('barChart')
          //KidChart(barChart, Bar2, 'barChart');
      
          document.getElementById("maxButton").addEventListener('click', () => {
            barPictogramReturn.options.scales.y.grid.color = (ctx) => {
      
              let max = barPictogramReturn.data.datasets[0].data[0];
              for (let i = 0; i < barPictogramReturn.data.datasets[0].data.length; i++) {
                if (max < barPictogramReturn.data.datasets[0].data[i]) {
                  max = barPictogramReturn.data.datasets[0].data[i];
                }
              }
      
              if (ctx.tick.value == max) {
                return "red"
              } else {
      
                return 'grey'
              }
            };
            
            barPictogramReturn.update();
          })
        });
      
      }
      


}

let table = new InputTable('table', 'tableButtons', 0)
table.collectButton();

//DEFINIRANJE TIPOVA DIJAGRAMA

let piePictogram = "piePictogram";
let pieTransition = "pieTransition";
let pieChart = "pieChart";

let barPictogram = "barPictogram";
let barTransition = "barTransition";
let barChart = "barChart";

let linePictogram = "linePictogram";
let lineTransition = "lineTransition";
let lineChart = "lineChart";

let Bar = {
  type: "bar",
  labels: ["Apples", "Oranges", "Bananas", "Strawberrys"],
  values: [1, 12.86, 3, 4],
  unicode: [
    "\uD83C\uDF4F",
    "\uD83C\uDF4A",
    "\uD83C\uDF4C",
    "\uD83C\uDF53",
  ],
};

let Pie = {
  type: "pie",
  labels: ["Apples", "Oranges", "Bananas", "Strawberrys"],
  values: [1, 22, 3.78, 3.5],
  unicode: [
    "\uD83C\uDF4F",
    "\uD83C\uDF4A",
    "\uD83C\uDF4C",
    "\uD83C\uDF53",
  ],
};

let Line = {
  type: "line",
  labels: ["first day", "second day", "third day", "fourth day"],
  values: [1, 2.8, 5, 7],
  labelDataset: [
    "pickedApples",
  ],
  unicode: [
    "\uD83C\uDF4F",
    "\uD83C\uDF4A",
    "\uD83C\uDF4C",
    "\uD83C\uDF53",
  ],
};
